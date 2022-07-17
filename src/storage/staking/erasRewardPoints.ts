import { UnknownVersionError } from '../../common/errors'
import { StakingErasRewardPointsStorage } from '../../types/generated/storage'
import { RewardPoint, AccountId, EraIndex } from '../../types/generated/v1050'
import { BlockContext as StorageContext } from '../../types/generated/support'

interface StorageData {
  total: RewardPoint
  individual: [AccountId, RewardPoint][]
}

async function getStorageData(ctx: StorageContext, era: EraIndex): Promise<StorageData | undefined> {
    const storage = new StakingErasRewardPointsStorage(ctx)
    if (!storage.isExists) return undefined

    if (storage.isV1050) {
      return await storage.getAsV1050(era)
    } else {
        throw new UnknownVersionError(storage.constructor.name)
    }
}

interface ErasRewardPoints {
  total: RewardPoint
  individual: [AccountId, RewardPoint][]
}

export async function getErasRewardPoints(ctx: StorageContext, era: EraIndex): Promise<ErasRewardPoints | undefined> {
    return await getStorageData(ctx, era)
}
