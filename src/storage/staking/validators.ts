import { decodeId, encodeId } from '../../common/tools'
import { UnknownVersionError } from '../../common/errors'
import { StakingValidatorsStorage } from '../../types/generated/storage'
import { BlockContext as StorageContext } from '../../types/generated/support'

interface StorageData {
    commission: number
}

async function getStorageData(ctx: StorageContext, account: Uint8Array): Promise<StorageData | undefined> {
    const storage = new StakingValidatorsStorage(ctx)
    if (!storage.isExists) return undefined

    if (storage.isV1020) {
      const { commission } =  await storage.getAsV1020(account)
      return {
        commission
      }
    } else if (storage.isV2028) {
      const { commission, blocked } =  await storage.getAsV2028(account)
      return {
        commission
      }
    } else {
        throw new UnknownVersionError(storage.constructor.name)
    }
}

interface Validators {
    commission: number
}

export async function getValidators(ctx: StorageContext, account: string): Promise<Validators | undefined> {
    const u8 = decodeId(account)
    if (!u8) return undefined

    const data = await getStorageData(ctx, u8)
    if (!data) return undefined

    return {
      commission: data.commission
    }
}
