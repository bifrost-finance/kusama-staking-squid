import { UnknownVersionError } from '../../common/errors'
import { StakingErasValidatorRewardStorage } from '../../types/generated/storage'
import { BlockContext as StorageContext } from '../../types/generated/support'

async function getStorageData(ctx: StorageContext, era: number): Promise<bigint | undefined> {
    const storage = new StakingErasValidatorRewardStorage(ctx)
    if (!storage.isExists) {
        return undefined
    }

    if (storage.isV1050) {
        return await storage.getAsV1050(era)
    } else {
        throw new UnknownVersionError(storage.constructor.name)
    }
}

export async function getErasValidatorReward(ctx: StorageContext, era: number): Promise<bigint | undefined> {
    return await getStorageData(ctx, era)
}
