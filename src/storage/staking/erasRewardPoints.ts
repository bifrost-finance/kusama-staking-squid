import { UnknownVersionError } from '../../common/errors'
import { StakingErasRewardPointsStorage } from '../../types/generated/storage'
import { BlockContext as StorageContext } from '../../types/generated/support'

interface StorageData {
  total: number
  individual: [Uint8Array, number][]
}

async function getStorageData(ctx: StorageContext, era: number): Promise<StorageData | undefined> {
    const storage = new StakingErasRewardPointsStorage(ctx)
    if (!storage.isExists) return undefined

    if (storage.isV1050) {
      return await storage.getAsV1050(era)
    } else {
        throw new UnknownVersionError(storage.constructor.name)
    }
}

interface ErasRewardPoints {
  total: number
  individual: [Uint8Array, number][]
}

export async function getErasRewardPoints(ctx: StorageContext, era: number): Promise<ErasRewardPoints | undefined> {
    return await getStorageData(ctx, era)
}
