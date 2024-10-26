
// import useSWR from 'swr/immutable'
// import axios from "axios";

import { formatEther, parseEther, parseUnits } from "viem";
import { useAccount, useBlockNumber, useReadContracts, useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import { queryClient } from "../App";
import { readContract } from "@wagmi/core";

import { useMemo, useState, useEffect, useCallback } from "react";
import { Alchemy, Network } from 'alchemy-sdk'

import abiERC20 from '../abis/abiERC20.json'
// import abiClaimContract from '../abis/abiClaimContract.json'
import abiNFTContract from '../abis/abiNFTContract.json'

import { wagmiConfig, defaultChain } from "../wagmi/config"
import config from '../config/var.config';

function getContractResult(readContractData, defaultValue) {
    return readContractData?.status === 'success' ? (readContractData.result) : (defaultValue)
}

export function useNFT() {
    const { address } = useAccount()
    const {data: blockNumber, queryKey:blockNumberQueryKey} = useBlockNumber({chainId: defaultChain.id, watch: true})
    const { data:hash, error: isNftTransactionError, isPending: isNftTransactionPending, writeContract } = useWriteContract();
    const { isLoading: isNftTransactionConfirming, isSuccess: isNftTransactionConfirmed } = useWaitForTransactionReceipt({hash});

    const [isNftTransactionLoading, setIsNftTransactionLoading] = useState(false)
    const [nftId, setNftId] = useState(0)
    const [isNftOwner, setIsNftOwner] = useState(false)
    const [nftUri, setNftUri] = useState('')
    const [nftImageUrl, setNftImageUrl] = useState('')
    const [tierOfNft, setTierOfNft] = useState(0)

    const alchemySettings = useMemo(() => {
        return {
            apiKey: config.alchemyAPIKey, // Replace with your Alchemy API Key.
            network: Network.ARB_SEPOLIA, // Replace with your network.
        }
    },[]);

    const nftContract = useMemo(() => {
        return { address: config.nftContractAddress, abi: abiNFTContract }
      }, [])

    const alchemy = useMemo(() => {
        return new Alchemy(alchemySettings)
    }, [alchemySettings])

    const { data: nftContractData, queryKey } = useReadContracts({
        wagmiConfig,
        contracts: [
            {
                ...nftContract,
                functionName: 'getCost'
            }, {
                ...nftContract,
                functionName: 'getMaxTier',
            }, {
                ...nftContract,
                functionName: 'currencyToken',
            }, {
                ...nftContract,
                functionName: 'getTier',
                args: [0]
            }, {
                ...nftContract,
                functionName: 'getTier',
                args: [1]
            }, {
                ...nftContract,
                functionName: 'getTier',
                args: [2]
            }, {
                ...nftContract,
                functionName: 'getTier',
                args: [3]
            }, 
        ],
    })

    const {nftCost, maxTier, currencyToken, tier1, tier2, tier3, tier4} = useMemo(() => ({
        nftCost: formatEther(getContractResult(nftContractData?.[0], 0)),
        maxTier: getContractResult(nftContractData?.[1], 0),
        currencyToken: getContractResult(nftContractData?.[2], ''),
        tier1: getContractResult(nftContractData?.[3], null),
        tier2: getContractResult(nftContractData?.[4], null),
        tier3: getContractResult(nftContractData?.[5], null),
        tier4: getContractResult(nftContractData?.[6], null),
    }), [nftContractData])

    const getTier = useCallback(async (tier) => {
        try {
            const _tierData = await readContract(wagmiConfig, {
                ...nftContract,
                functionName: 'getTier',
                args: [tier]
            })
            return _tierData
        } catch (e) {
            console.error(e)
            return null
        }
    }, [nftContract])

    const getOwnerOf = useCallback(async (tokenId) => {
        try {
            const owneraddress = await readContract(wagmiConfig, {
                ...nftContract,
                functionName: 'ownerOf',
                args: [tokenId]
            })
            return owneraddress
        } catch (e) {
            console.error(e)
            return null
        }
    }, [nftContract])

    const approveNFTUpgrade = async (address, token, amount, decimals) => {
        
        try {
            setIsNftTransactionLoading(true)
            writeContract({
                account: address,
                abi: abiERC20,
                address: token,
                functionName: 'approve',
                args: [config.nftContractAddress, parseUnits(amount, decimals)]
            })
            setIsNftTransactionLoading(false)

            return true
        } catch (e) {
            console.error(e)
            return false
        }
    }

    const mintNFT = async (address, cost) => {
        try {
            setIsNftTransactionLoading(true)
            writeContract({
                account: address,
                abi: abiNFTContract,
                address: config.nftContractAddress,
                functionName: 'mint',
                value: parseEther(cost.toString())
            })
            setIsNftTransactionLoading(false)

            return true
        } catch (e) {
            console.error(e)
            return false
        }
    }

    const upgradeNFT = async (address, tokenId) => {
        try {
            setIsNftTransactionLoading(true)
            writeContract({
                account: address,
                abi: abiNFTContract,
                address: config.nftContractAddress,
                functionName: 'upgrade',
                args:[tokenId]
            })
            setIsNftTransactionLoading(false)

            return true
        } catch (e) {
            console.error(e)
            return false
        }
    }

    useEffect(() => {
        if (!address) return;
        alchemy.nft.getNftsForOwner(address).then((nftsForOwner) => {
            if (nftsForOwner?.totalCount > 0) {
                for (const nft of nftsForOwner.ownedNfts) {
                    if (nft.contract.address.toLowerCase() === config.nftContractAddress.toLowerCase()) {
                        setNftId(Number(nft.tokenId))
                        setNftUri(nft.tokenUri)
                        setNftImageUrl(nft.image.originalUrl)
                        return;
                    }
                }
            }
            setNftId(0)
            setNftUri('')
            setNftImageUrl('')
        });
    }, [address, alchemy, blockNumber])
    
    useEffect(() => {
        if (Number(nftId) === 0) return setTierOfNft(0)
        if (tier1 && nftId <= Number(tier1.maxSupply)) setTierOfNft(1)
        else if (tier2 && nftId <= (Number(tier1.maxSupply) + Number(tier2.maxSupply))) setTierOfNft(2)
        else if (tier3 && nftId <= (Number(tier1.maxSupply) + Number(tier2.maxSupply) + Number(tier3.maxSupply))) setTierOfNft(3)
        else if (tier4 && nftId <= (Number(tier1.maxSupply) + Number(tier2.maxSupply) + Number(tier3.maxSupply) + Number(tier4.maxSupply))) setTierOfNft(4)
        else setTierOfNft(0)
    }, [nftId, tier1, tier2, tier3, tier4])

    useEffect(() => {
        if (nftId === 0 || !address) return setIsNftOwner(false)
        
        getOwnerOf(nftId).then((_owner) => {
            if (_owner && _owner.toLowerCase() === address.toLowerCase()) setIsNftOwner(true)
            else setIsNftOwner(false)
        }).catch(() => setIsNftOwner(false))

    }, [address, getOwnerOf, nftId, blockNumber])

    useEffect(() => {
        queryClient.invalidateQueries({ queryKey })
        queryClient.invalidateQueries({ queryKey: blockNumberQueryKey })
    }, [blockNumber, queryKey, blockNumberQueryKey])

    return {
        isNftTransactionError,
        isNftTransactionPending,
        isNftTransactionConfirming,
        isNftTransactionConfirmed,
        isNftTransactionLoading,
        nftContract,
        nftCost, maxTier, currencyToken,
        nftId, nftUri, nftImageUrl,
        tier1, tier2, tier3, tier4,
        tierOfNft,
        isNftOwner,
        getTier,
        getOwnerOf,
        mintNFT,
        upgradeNFT,
        approveNFTUpgrade
    }
}