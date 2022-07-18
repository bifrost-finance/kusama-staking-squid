import { UnknownVersionError } from '../../common/errors'
import { StakingErasValidatorRewardStorage } from '../../types/generated/storage'
import { EraIndex, BalanceOf } from '../../types/generated/v1050'
import { BlockContext as StorageContext } from '../../types/generated/support'

async function getStorageData(ctx: StorageContext, era: EraIndex): Promise<BalanceOf | undefined> {
    const storage = new StakingErasValidatorRewardStorage(ctx)
    if (!storage.isExists) {
        return undefined
    }

    if (storage.isV1050) {
        const balance = await storage.getAsV1050(era)
        console.log(`valid era validator reward storage ${storage}, era: ${era}, balance: ${balance}`)
        return balance
    } else {
        throw new UnknownVersionError(storage.constructor.name)
    }
}

export async function getErasValidatorReward(ctx: StorageContext, era: EraIndex): Promise<BalanceOf | undefined> {
    return await getStorageData(ctx, era)
}
