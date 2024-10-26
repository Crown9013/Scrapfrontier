import { getBalance, readContract } from "@wagmi/core";

import { wagmiConfig } from "../wagmi/config";

import abiERC20 from "../abis/abiERC20.json";
import { useCallback } from "react";

export function useBalance() {
  const getEthBalance = async (address) => {
    try {
      const balance = await getBalance(wagmiConfig, {
        address: address,
      });
      return balance;
    } catch (e) {
      console.error(e);
      return 0;
    }
  };

  const getTokenBalance = useCallback(async (tokenAddress, address) => {
    try {
      const tokenBalance = await readContract(wagmiConfig, {
        abi: abiERC20,
        address: tokenAddress,
        functionName: "balanceOf",
        args: [address],
      });
      return tokenBalance;
    } catch (e) {
      console.error(e);
      return 0;
    }
  }, []);

  const getTokenSymbol = useCallback(async (tokenAddress) => {
    try {
      const tokenSymbol = await readContract(wagmiConfig, {
        abi: abiERC20,
        address: tokenAddress,
        functionName: "symbol",
      });
      return tokenSymbol;
    } catch (e) {
      console.error(e);
      return "";
    }
  }, []);

  const getTokenDecimals = useCallback(async (tokenAddress) => {
    try {
      const tokenDecimals = await readContract(wagmiConfig, {
        abi: abiERC20,
        address: tokenAddress,
        functionName: "decimals",
      });
      return tokenDecimals;
    } catch (e) {
      console.error(e);
      return 18;
    }
  }, []);

  const getTokenAllowance = useCallback(async (tokenAddress, owner, spender) => {
    try {
      const tokenAllowance = await readContract(wagmiConfig, {
        abi: abiERC20,
        address: tokenAddress,
        functionName: "allowance",
        args: [owner, spender],
      });

      return tokenAllowance;
    } catch (e) {
      console.error(e);
      return 0;
    }
  }, []);

  return {
    getEthBalance,
    getTokenBalance,
    getTokenSymbol,
    getTokenDecimals,
    getTokenAllowance,
  };
}
