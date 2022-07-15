/* eslint-disable sonarjs/no-duplicate-string */
import { ProcessorConfig } from './types/custom/processorConfig'

const config: ProcessorConfig = {
    chainName: 'kusama',
    prefix: 'kusama',
    dataSource: {
        archive: 'https://kusama.archive.subsquid.io/graphql',
        chain: 'wss://kusama-rpc.polkadot.io', // 'wss://kusama.api.onfinality.io/public-ws'
    },
    typesBundle: 'kusama',
    batchSize: 100,
    blockRange: {
        from: 13200000,
    },
}

export default config
