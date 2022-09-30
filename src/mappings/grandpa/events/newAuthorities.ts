import assert from 'assert'
import { isStorageCorrupted, decodeId, encodeId, createApi } from '../../../common/tools'
import { Era, EraNomination, EraStaker, StakingRole } from '../../../model'
import storage from '../../../storage'
import { EventHandlerContext } from '../../types/contexts'
import { createPrevStorageContext } from '../../util/actions'
import { getOrCreateStakers } from '../../util/entities'
import { MoreThanOrEqual } from "typeorm"

interface PairData {
    validator: string
    nominator: string
    vote: bigint
}

export async function handleNewAuthorities(ctx: EventHandlerContext) {
    const activeEraData = await storage.staking.getActiveEra(ctx)
    const currentEraData = await storage.staking.getCurrentEra(ctx)
    //prefered to use ActiveEra because CurrentEra can return next planed era
    const storageEraData = activeEraData || currentEraData

    if (!storageEraData || storageEraData?.index == null) {
        return ctx.log.warn(`Unknown era`)
    }

    if ((await ctx.store.countBy(Era, { id: storageEraData.index.toString() })) > 0) {
        return ctx.log.warn(`Era ${storageEraData.index} has been already proceed`)
    }

    const era = new Era({
        id: (storageEraData.index-1).toString(),
        index: storageEraData.index-1,
        startedAt: ctx.block.height,
        timestamp: new Date(activeEraData?.timestamp || ctx.block.timestamp),
    })

    ctx.log.info(`Handling new authorities event last era ${era} index ${era.index}`)

    const stakingData = await getStakingData(ctx, era)
    if (!stakingData) return
    const { validators, nominators, nominations } = stakingData

    era.validatorsCount = validators.length
    era.nominatorsCount = nominators.length
    era.total = validators.reduce((total, validator) => (total += BigInt(validator.totalBonded)), 0n)
    await ctx.store.save(era)

    await ctx.store.save(validators)
    await ctx.store.save(nominators)
    await ctx.store.save(nominations)
}

// eslint-disable-next-line sonarjs/cognitive-complexity
async function getStakingData(ctx: EventHandlerContext, era: Era) {
    const validators: Map<string, EraStaker> = new Map()

    const prevCtx = createPrevStorageContext(ctx)

    // const validatorIds = await storage.session.getValidators(prevCtx)
    // if (!validatorIds) {
    //     return ctx.log.warn(`Validators for era ${era} not found`)
    // }

    const api = await createApi()
    const apiCtx = await api.at(ctx.block.hash)
    const keys = await apiCtx.query.staking.validators.keys()
    if (!keys) {
        return ctx.log.warn(`Validators for era ${era} not found`)
    }
    const validatorIds = keys.map(({ args: [validatorId] }) => validatorId.toString());

    const validatorsData = await storage.staking.getEraStakersData(
        prevCtx,
        validatorIds.map((id) => [id, era.index] as [string, number])
    )
    if (!validatorsData) {
        return ctx.log.warn(`Missing info for validators in era ${era}`)
    }

    const validatorStakers = new Map((await getOrCreateStakers(ctx, 'Stash', validatorIds)).map((s) => [s.id, s]))
    const nominatorIds: string[] = []
    const nominationsData: PairData[] = []

    const totalErasValidatorReward = await storage.staking.getErasValidatorReward(ctx, era.index)
    if (!totalErasValidatorReward) {
        return ctx.log.info(`Missing total eras validator reward for validator ${totalErasValidatorReward} in era ${era}`)
    }

    const erasRewardPoints = await storage.staking.getErasRewardPoints(ctx, era.index)
    if (!erasRewardPoints) {
        return ctx.log.info(`Missing eras reward points for validator in era ${era}`)
    }

    const nominatorStakes: Map<string, {totalVotes: bigint, totalValidators: number}> = new Map() // nominator id => { total votes, total validators }

    for (let i = 0; i < validatorIds.length; i++) {
        const validatorId = validatorIds[i]
        const validatorData = validatorsData[i]
        if (!validatorData) {
            ctx.log.warn(`Missing info for validator ${validatorId} in era ${era}`)
            continue
        }

        const staker = validatorStakers.get(validatorId)
        if (!staker && isStorageCorrupted(ctx)) {
            ctx.log.warn(`Missing info for staker ${validatorId} in era ${era}`)
            continue
        }
        assert(staker != null)

        const validatorInfo = await storage.staking.getValidators(prevCtx, validatorId)
        if (!validatorInfo) {
            ctx.log.info(`Missing validators info for validator ${validatorId} in era ${era}`)
            continue
        }

        let totalReward: bigint = BigInt(0)
        erasRewardPoints.individual.forEach((points, point) => {
            if (points.length === 2) {
                if (encodeId(points[0]) === validatorId && erasRewardPoints.total != 0) {
                    totalReward = BigInt(Math.floor(points[1]/erasRewardPoints.total*Number(totalErasValidatorReward!)))
                }
            }
        })

        validators.set(
            validatorId,
            new EraStaker({
                id: `${era.index}-${validatorId}`,
                era,
                staker,
                totalBonded: validatorData.total,
                selfBonded: validatorData.own,
                totalReward: totalReward,
                totalSlash: staker.totalSlash,
                role: StakingRole.Validator,
                commission: validatorInfo.commission,
            })
        )

        for (const nomination of validatorData.nominators) {
            nominatorIds.push(nomination.id)
            nominationsData.push({
                nominator: nomination.id,
                validator: validatorId,
                vote: nomination.vote,
            })

            let stakeData = nominatorStakes.has(nomination.id)? nominatorStakes.get(nomination.id)! : {totalVotes: BigInt(0), totalValidators: 0}
            stakeData.totalVotes += BigInt(nomination.vote)
            nominatorStakes.set(nomination.id, stakeData)
        }
    }

    const validatorNominators: Map<string, Array<string>> = new Map() // validator id => []string

    for (const nominatorId of nominatorStakes.keys()) {
        const nominators = await storage.staking.getNominators(prevCtx, nominatorId)
        if (!nominators) {
            ctx.log.info(`Missing nominators info for nominator ${nominatorId} in era ${era}`)
            continue
        }

        for (let v of nominators.targets) {
            const validatorID = encodeId(v)
            let nominators = validatorNominators.has(validatorID)? validatorNominators.get(validatorID)! : []
            nominators.push(nominatorId)
            validatorNominators.set(validatorID, nominators)
        }
        
        let stakeData = nominatorStakes.get(nominatorId)
        if (!stakeData) {
            continue
        }
        stakeData.totalValidators = nominators.targets.length
        nominatorStakes.set(nominatorId, stakeData)
    }

    for (let i = 0; i < validatorIds.length; i++) {
        const validatorId = validatorIds[i]
        const nominators = validatorNominators.get(validatorId) || []
        let effectiveNuminatorStake = BigInt(0)
        for (const nominator of nominators) {
            const stakeData = nominatorStakes.get(nominator)
            if (!stakeData) {
                continue
            }
            if (stakeData.totalValidators !== 0) {
                effectiveNuminatorStake += stakeData.totalVotes/BigInt(stakeData.totalValidators)
            }
        }
        let eraStaker = validators.get(validatorId)
        if (!eraStaker) {
            continue
        }
        eraStaker.effectiveNominatorStake = effectiveNuminatorStake
        // calc scores

        // 84 era
        {
            const validatorsFromDB = await ctx.store.findBy(EraStaker, { stakerId: validatorId, role: StakingRole.Validator,  era: MoreThanOrEqual(era.index-83)})
            const erasFromDB = await ctx.store.findBy(Era, { index: MoreThanOrEqual(era.index-83)})
            let totalRewards = BigInt(0)
            let validatorCnt = validatorsFromDB.length
            let eraCnt = erasFromDB.length
            let slashCnt = 0
            let rewardCnt = 0
            for (const validator of validatorsFromDB) {
                if (validator.totalReward !== 0n) {
                    totalRewards += validator.totalReward
                    rewardCnt++
                }
                slashCnt += Number(validator.totalSlash)
            }
            if (eraStaker.totalReward !== 0n) {
                totalRewards += eraStaker.totalReward
                rewardCnt++
            }
            let rewardScore = 0;
            if (rewardCnt !== 0) {
                rewardScore = Number(totalRewards)/rewardCnt
            }
            ctx.log.info(`84 era validatorCnt ${validatorCnt} eraCnt: ${eraCnt}, rewardCnt: ${rewardCnt}`)
            eraStaker.rewardScore = rewardScore / 1000000000000 * (1-eraStaker.commission!/1000000000)
            // ctx.log.info(`Validator ${validatorId} total rewards: ${totalRewards}, era total reward: ${eraStaker.totalReward}, reward score: ${eraStaker.rewardScore}`)
            const nominatorScore = 5000 / (Number(eraStaker.effectiveNominatorStake)/1000000000000 + 5000)
            eraStaker.nominatorScore = nominatorScore

            if (eraCnt !== 0) {
                eraStaker.stableScore = validatorCnt/eraCnt-slashCnt
            } else {
                eraStaker.stableScore = 0
            }

            eraStaker.totalScore = eraStaker.rewardScore * eraStaker.nominatorScore
        }

        // 28 era
        {
            const validatorsFromDB = await ctx.store.findBy(EraStaker, { stakerId: validatorId, role: StakingRole.Validator,  era: MoreThanOrEqual(era.index-27)})
            const erasFromDB = await ctx.store.findBy(Era, { index: MoreThanOrEqual(era.index-27)})
            let totalRewards = BigInt(0)
            let validatorCnt = validatorsFromDB.length
            let eraCnt = erasFromDB.length
            let slashCnt = 0
            let rewardCnt = 0
            for (const validator of validatorsFromDB) {
                if (validator.totalReward !== 0n) {
                    totalRewards += validator.totalReward
                    rewardCnt++
                }
                slashCnt += Number(validator.totalSlash)
            }
            if (eraStaker.totalReward !== 0n) {
                totalRewards += eraStaker.totalReward
                rewardCnt++
            }
            let rewardScore = 0;
            if (rewardCnt !== 0) {
                rewardScore = Number(totalRewards)/rewardCnt
            }
            ctx.log.info(`28 era validatorCnt ${validatorCnt} eraCnt: ${eraCnt}, rewardCnt: ${rewardCnt}`)
            eraStaker.rewardScore28 = rewardScore / 1000000000000 * (1-eraStaker.commission!/1000000000)
            // ctx.log.info(`Validator ${validatorId} total rewards: ${totalRewards}, era total reward: ${eraStaker.totalReward}, reward score: ${eraStaker.rewardScore}`)
            const nominatorScore = 5000 / (Number(eraStaker.effectiveNominatorStake)/1000000000000 + 5000)
            eraStaker.nominatorScore28 = nominatorScore

            if (eraCnt !== 0) {
                eraStaker.stableScore28 = validatorCnt/eraCnt-slashCnt
            } else {
                eraStaker.stableScore28 = 0
            }

            eraStaker.totalScore28 = eraStaker.rewardScore28 * eraStaker.nominatorScore28
        }

        // 12 era
        {
            const validatorsFromDB = await ctx.store.findBy(EraStaker, { stakerId: validatorId, role: StakingRole.Validator,  era: MoreThanOrEqual(era.index-11)})
            const erasFromDB = await ctx.store.findBy(Era, { index: MoreThanOrEqual(era.index-11)})
            let totalRewards = BigInt(0)
            let validatorCnt = validatorsFromDB.length
            let eraCnt = erasFromDB.length
            let slashCnt = 0
            let rewardCnt = 0
            for (const validator of validatorsFromDB) {
                if (validator.totalReward !== 0n) {
                    totalRewards += validator.totalReward
                    rewardCnt++
                }
                slashCnt += Number(validator.totalSlash)
            }
            if (eraStaker.totalReward !== 0n) {
                totalRewards += eraStaker.totalReward
                rewardCnt++
            }
            let rewardScore = 0;
            if (rewardCnt !== 0) {
                rewardScore = Number(totalRewards)/rewardCnt
            }
            ctx.log.info(`12 era validatorCnt ${validatorCnt} eraCnt: ${eraCnt}, rewardCnt: ${rewardCnt}`)
            eraStaker.rewardScore12 = rewardScore / 1000000000000 * (1-eraStaker.commission!/1000000000)
            // ctx.log.info(`Validator ${validatorId} total rewards: ${totalRewards}, era total reward: ${eraStaker.totalReward}, reward score: ${eraStaker.rewardScore}`)
            const nominatorScore = 5000 / (Number(eraStaker.effectiveNominatorStake)/1000000000000 + 5000)
            eraStaker.nominatorScore12 = nominatorScore

            if (eraCnt !== 0) {
                eraStaker.stableScore12 = validatorCnt/eraCnt-slashCnt
            } else {
                eraStaker.stableScore12 = 0
            }

            eraStaker.totalScore12 = eraStaker.rewardScore12 * eraStaker.nominatorScore12
        }

        validators.set(validatorId, eraStaker)
    }

    const nominatorStakers = new Map((await getOrCreateStakers(ctx, 'Stash', nominatorIds)).map((s) => [s.id, s]))
    const nominators: Map<string, EraStaker> = new Map()

    for (const nominatorId of nominatorIds) {
        const staker = nominatorStakers.get(nominatorId)
        if (!staker && isStorageCorrupted(ctx)) {
            ctx.log.warn(`Missing info for staker ${nominatorId} in era ${era}`)
            continue
        }
        assert(staker != null)

        nominators.set(
            nominatorId,
            new EraStaker({
                id: `${era.index}-${nominatorId}`,
                era,
                staker,
                role: StakingRole.Nominator,
                selfBonded: staker.activeBond,
                totalBonded: staker.activeBond,
                totalReward: staker.totalReward,
                totalSlash: staker.totalSlash,
            })
        )
    }

    const nominations: Map<string, EraNomination> = new Map()

    for (const nominationData of nominationsData) {
        const validator = validators.get(nominationData.validator)
        const nominator = nominators.get(nominationData.nominator)
        if ((!validator || !nominator) && isStorageCorrupted(ctx)) {
            ctx.log.warn(`Missing info for stakers`)
            continue
        }
        assert(validator != null && nominator != null)

        const id = `${validator.id}-${nominator.id}`
        nominations.set(
            id,
            new EraNomination({
                id,
                era,
                validator,
                nominator,
                vote: nominationData.vote,
            })
        )
    }

    return {
        nominators: [...nominators.values()],
        validators: [...validators.values()],
        nominations: [...nominations.values()],
    }
}
