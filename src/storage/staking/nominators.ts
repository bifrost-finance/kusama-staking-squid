import { decodeId, encodeId } from '../../common/tools'
import { UnknownVersionError } from '../../common/errors'
import { StakingNominatorsStorage } from '../../types/generated/storage'
import { BlockContext as StorageContext } from '../../types/generated/support'
import { AccountId, EraIndex } from '../../types/generated/v1020'

interface StorageData {
  targets: AccountId[]
  submittedIn: EraIndex
  suppressed: boolean
}

async function getStorageData(ctx: StorageContext, account: Uint8Array): Promise<StorageData | undefined> {
    const storage = new StakingNominatorsStorage(ctx)
    if (!storage.isExists) return undefined

    if (storage.isV1020) {
      const nomination =  await storage.getAsV1020(account)
      if (!nomination) return undefined
      return {
        targets: nomination.targets,
        submittedIn: nomination.submittedIn,
        suppressed: nomination.suppressed,
      }
    } else {
        throw new UnknownVersionError(storage.constructor.name)
    }
}

interface Nominations {
  targets: AccountId[]
  submittedIn: EraIndex
  suppressed: boolean
}

export async function getNominators(ctx: StorageContext, account: string): Promise<Nominations | undefined> {
    const u8 = decodeId(account)
    if (!u8) return undefined

    return await getStorageData(ctx, u8)
}
