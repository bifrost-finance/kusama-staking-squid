import * as ss58 from '@subsquid/ss58'
import config from '../config'
import { decodeHex, isHex } from '@subsquid/util-internal-hex'
import { CommonHandlerContext } from '@subsquid/substrate-processor'
import { ApiPromise, WsProvider } from '@polkadot/api';

export function encodeId(id: Uint8Array) {
    return ss58.codec(config.prefix).encode(id)
}

export function decodeId(id: string) {
    return ss58.codec(config.prefix).decode(id)
}

export interface ItemBase {
    id: string
    timestamp: Date | null | undefined
    blockNumber: bigint | null | undefined
    extrinsicHash: string | null | undefined
}

export function isAdressSS58(address: Uint8Array) {
    switch (address.length) {
        case 1:
        case 2:
        case 4:
        case 8:
        case 32:
        case 33:
            return true
        default:
            return false
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getOriginAccountId(origin: any) {
    if (!origin) return undefined
    switch (origin.__kind) {
        case 'system':
            // eslint-disable-next-line sonarjs/no-nested-switch, sonarjs/no-small-switch
            switch (origin.value.__kind) {
                case 'Signed':
                    if (!isHex(origin.value.value)) {
                        return undefined
                    }
                    return encodeId(decodeHex(origin.value.value))
                default:
                    return undefined
            }
        default:
            return undefined
    }
}

export function saturatingSumBigInt(
    a: bigint,
    b: bigint,
    { max, min }: { max: null | bigint; min: bigint } = { max: null, min: 0n }
): bigint {
    const sum = BigInt(a) + BigInt(b)
    if (sum < min) {
        return min
    } else if (max && sum > max) {
        return max
    } else {
        return sum
    }
}

export function isStorageCorrupted(ctx: CommonHandlerContext<unknown>) {
    return ctx.block.height >= 1375087 && ctx.block.height <= 1600000
}

export async function createApi(): Promise<ApiPromise> {
    const provider = new WsProvider(config.dataSource.chain);
    const api = await ApiPromise.create({ provider, types: {} });
    await api.isReady;
    console.log(`Connected to substrate node: ${config.dataSource.chain}`);
    return api;
}
