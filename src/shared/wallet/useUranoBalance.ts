'use client';

import { useCallback, useEffect, useState } from 'react';
import { Contract, JsonRpcProvider, formatUnits } from 'ethers';
import { ERC20_ABI, ROUTER_ABI, TOKEN_ADDRESS, TOKEN_DECIMALS, USDC_ADDRESS, USDC_DECIMALS, V2_ROUTER_ADDRESS } from '@/shared/constants';

const ARBITRUM_RPC = 'https://arb1.arbitrum.io/rpc';

export function useUranoBalance(address: string | null): { balanceInUsdc: number; loading: boolean; refetch: () => void } {
  const [balanceInUsdc, setBalanceInUsdc] = useState(0);
  const [loading, setLoading] = useState(false);
  const [trigger, setTrigger] = useState(0);

  const refetch = useCallback(() => setTrigger((t) => t + 1), []);

  useEffect(() => {
    if (!address) {
      setBalanceInUsdc(0);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    void (async () => {
      try {
        const provider = new JsonRpcProvider(ARBITRUM_RPC);
        const token = new Contract(TOKEN_ADDRESS, ERC20_ABI, provider);
        const raw = await (token.balanceOf as (addr: string) => Promise<bigint>)(address);

        if (raw === 0n) {
          if (!cancelled) setBalanceInUsdc(0);
          return;
        }

        // Convert URANO balance to USDC value via router
        const router = new Contract(V2_ROUTER_ADDRESS, ROUTER_ABI, provider);
        const path = [TOKEN_ADDRESS, USDC_ADDRESS];
        const amounts = await (router.getAmountsOut as (amountIn: bigint, path: string[]) => Promise<bigint[]>)(raw, path);
        const usdcValue = parseFloat(formatUnits(amounts[1]!, USDC_DECIMALS));

        if (!cancelled) setBalanceInUsdc(usdcValue);
      } catch {
        if (!cancelled) setBalanceInUsdc(0);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [address, trigger]);

  return { balanceInUsdc, loading, refetch };
}
