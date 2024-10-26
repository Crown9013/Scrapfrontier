import { http, createConfig } from 'wagmi'
import { arbitrumSepolia } from 'wagmi/chains'

export const defaultChain = arbitrumSepolia

export const wagmiConfig = createConfig({
    chains: [defaultChain],
    transports: {
        [defaultChain.id]: http(),
    },
})