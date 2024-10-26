import { useMemo } from "react";
import { createPublicClient, createWalletClient, http } from "viem";

export function useViem() {

    const rpc = process.env.REACT_APP_RPCURL
    const chain = process.env.REACT_APP_CHAINID
    
    const publicClient = useMemo(() => {
        return createPublicClient({
            chain: chain,
            transport: http(rpc),
            batch: {multicall: true}
        })
    }, [chain, rpc])

    const walletClient = useMemo(() => {
        return createWalletClient({
            chain: chain,
            transport: http(rpc)
        })
    }, [chain, rpc])

    return {publicClient, walletClient}
}