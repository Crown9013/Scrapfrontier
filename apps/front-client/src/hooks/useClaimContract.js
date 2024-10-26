
import { getContract, formatEther, parseEther, zeroAddress } from "viem";
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import { readContract, simulateContract } from "@wagmi/core";

import React, { useMemo, useState } from "react";
import { useViem } from "./useViem";

import abiERC20 from '../abis/abiERC20.json'
import abiClaimContract from '../abis/abiClaimContract.json'

import { wagmiConfig } from "../wagmi/config"

import toast from 'react-hot-toast';

export const claimContractAddress = process.env.REACT_APP_CLAIM_CONTRACT_ADDR

export function useClaimContract() {
    const { publicClient, walletClient } = useViem();
    const { data:hash, error: isClaimTransactionError, isPending: isClaimTransactionPending, writeContract } = useWriteContract();
    const { isLoading: isClaimTransactionConfirming, isSuccess: isClaimTransactionConfirmed } = useWaitForTransactionReceipt({hash});

    const [isClaimTransactionLoading, setIsClaimTransactionLoading] = useState(false)

    const claimContract = useMemo(()=>{
        return getContract({
            address: claimContractAddress,
            abi: abiClaimContract,
            client: {
                public: publicClient,
                wallet: walletClient
            }
        })
    }, [publicClient, walletClient])

    const getClaimTokenBalance = React.useCallback(async (address) => {
        const tokenAddress = await claimContract.read.token()

        try {
            const tokenBalance = await readContract(wagmiConfig, {
                abi: abiERC20,
                address: tokenAddress,
                functionName: 'balanceOf',
                args: [address],
            })
            return formatEther(tokenBalance);
        } catch (e) {
            console.error(e)
            return 0
        }

    }, [claimContract])

    const getClaimTokenAllowance = React.useCallback(async (address) => {
        const tokenAddress = await claimContract.read.token()

        try {
            const res = await readContract(wagmiConfig, {
                abi: abiERC20,
                address: tokenAddress,
                functionName: 'allowance',
                args: [address, claimContractAddress],
            })
            return formatEther(res);
        } catch (e) {
            console.error(e)
            return 0
        }
    }, [claimContract])

    const getClaimableTokenAmount = React.useCallback(async (address) => {
        try {
            const res = await readContract(wagmiConfig, {
                abi: abiClaimContract,
                address: claimContractAddress,
                functionName: 'tokenBalances',
                args: [address],
            })
            return formatEther(res);
        } catch (e) {
            console.error(e)
            return 0;
        }
    }, [])

    const handleClaimToken = async (address, amount) => {
        
        try {
            setIsClaimTransactionLoading(true)
            writeContract({
                account: address,
                address: claimContractAddress,
                abi: abiClaimContract,
                functionName: 'claimTokens',
                args: [parseEther(amount.toString())],
            })
            setIsClaimTransactionLoading(false);

            return true;
        } catch (e) {
            console.error(e)
            return false;
        }
    }

    const handleApprove = async (address, amount) => {
        const tokenAddress = await claimContract.read.token()

        try {
            const {request} = await simulateContract(wagmiConfig, {
                address: tokenAddress,
                abi: abiERC20,
                functionName: 'approve',
                args: [claimContractAddress, parseEther(amount)]
            })

            await writeContract(wagmiConfig, request);

            return true;
        } catch (e) {
            console.error(e)
            return false;
        }
    }

    const handleClaimApprove = async (address, amount, callback) => {
        const tokenAddr = await claimContract.read.token()

        if(tokenAddr === zeroAddress) {
          toast.error('Incorrect Token Address')
          return false;
        }

        setIsClaimTransactionLoading(true)
        writeContract({
          account: address,
          address: tokenAddr,
          abi: abiERC20,
          functionName: 'approve',
          args: [claimContractAddress, parseEther(amount)]
        })
        setIsClaimTransactionLoading(false);

        return true
    }

    return {
        isClaimTransactionError,
        isClaimTransactionPending,
        isClaimTransactionConfirming,
        isClaimTransactionConfirmed,
        isClaimTransactionLoading,
        claimContract,
        getClaimTokenBalance,
        getClaimableTokenAmount,
        getClaimTokenAllowance,
        handleClaimToken,
        handleApprove,
        handleClaimApprove
    }
}