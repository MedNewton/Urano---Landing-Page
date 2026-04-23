'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { BrowserProvider, Contract, parseUnits, parseEther, formatUnits, formatEther, MaxUint256 } from 'ethers';
import {
  CHAIN_ID,
  CHAIN_ID_HEX,
  WETH_ADDRESS,
  USDC_ADDRESS,
  USDC_DECIMALS,
  V2_ROUTER_ADDRESS,
  TOKEN_ADDRESS,
  TOKEN_DECIMALS,
  ROUTER_ABI,
  ERC20_ABI,
} from '@/shared/constants';

export type InputToken = 'USDC' | 'ETH';
type SwapStatus = 'idle' | 'quoting' | 'approving' | 'confirming' | 'pending' | 'success' | 'error';

type EthEvents = {
  on?: (event: string, handler: () => void) => void;
  removeListener?: (event: string, handler: () => void) => void;
};

interface SwapState {
  estimatedOutput: string;
  status: SwapStatus;
  txHash: string | null;
  error: string | null;
  isCorrectChain: boolean;
  balance: string;
}

export function useSwap(walletAddress: string | null, onSwapSuccess?: () => void) {
  const [inputToken, setInputToken] = useState<InputToken>('USDC');
  const [inputAmount, setInputAmount] = useState('');
  const [slippage, setSlippage] = useState(0.5);
  const [state, setState] = useState<SwapState>({
    estimatedOutput: '',
    status: 'idle',
    txHash: null,
    error: null,
    isCorrectChain: true,
    balance: '',
  });

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isETH = inputToken === 'ETH';

  const fetchBalance = useCallback(async () => {
    if (!window.ethereum || !walletAddress) {
      setState((s) => ({ ...s, balance: '' }));
      return;
    }
    try {
      const provider = new BrowserProvider(window.ethereum);
      if (isETH) {
        const bal = await provider.getBalance(walletAddress);
        setState((s) => ({ ...s, balance: formatEther(bal) }));
      } else {
        const usdc = new Contract(USDC_ADDRESS, ERC20_ABI, provider);
        const bal = await (usdc.balanceOf as (addr: string) => Promise<bigint>)(walletAddress);
        setState((s) => ({ ...s, balance: formatUnits(bal, USDC_DECIMALS) }));
      }
    } catch {
      setState((s) => ({ ...s, balance: '' }));
    }
  }, [walletAddress, isETH]);

  const checkChain = useCallback(async () => {
    if (!window.ethereum) return;
    try {
      const provider = new BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();
      setState((s) => ({ ...s, isCorrectChain: Number(network.chainId) === CHAIN_ID }));
    } catch {
      setState((s) => ({ ...s, isCorrectChain: false }));
    }
  }, []);

  useEffect(() => {
    if (walletAddress) {
      void checkChain();
      void fetchBalance();
    } else {
      setState((s) => ({ ...s, balance: '' }));
    }
  }, [walletAddress, checkChain, fetchBalance]);

  useEffect(() => {
    if (!window.ethereum) return;
    const eth = window.ethereum as unknown as EthEvents;
    const handleChainChanged = () => {
      void checkChain();
      void fetchBalance();
    };
    eth.on?.('chainChanged', handleChainChanged);
    return () => { eth.removeListener?.('chainChanged', handleChainChanged); };
  }, [checkChain, fetchBalance]);

  // Re-fetch balance when token changes
  useEffect(() => {
    if (walletAddress) void fetchBalance();
  }, [inputToken, walletAddress, fetchBalance]);

  // Quoting
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    const amt = parseFloat(inputAmount);
    if (!inputAmount || isNaN(amt) || amt <= 0) {
      setState((s) => ({ ...s, estimatedOutput: '', status: 'idle', error: null }));
      return;
    }

    setState((s) => ({ ...s, status: 'quoting' }));

    debounceRef.current = setTimeout(() => void (async () => {
      try {
        if (!window.ethereum) throw new Error('No wallet');
        const provider = new BrowserProvider(window.ethereum);
        const router = new Contract(V2_ROUTER_ADDRESS, ROUTER_ABI, provider);

        const path = isETH
          ? [WETH_ADDRESS, USDC_ADDRESS, TOKEN_ADDRESS]
          : [USDC_ADDRESS, TOKEN_ADDRESS];
        const amountIn = isETH
          ? parseEther(inputAmount)
          : parseUnits(inputAmount, USDC_DECIMALS);

        const amounts = await (router.getAmountsOut as (amountIn: bigint, path: string[]) => Promise<bigint[]>)(amountIn, path);
        const estimated = formatUnits(amounts[path.length - 1]!, TOKEN_DECIMALS);
        setState((s) => ({ ...s, estimatedOutput: estimated, status: 'idle', error: null }));
      } catch {
        setState((s) => ({ ...s, estimatedOutput: '', status: 'idle', error: 'Failed to fetch quote' }));
      }
    })(), 500);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [inputAmount, isETH]);

  const switchChain = useCallback(async () => {
    if (!window.ethereum) return;
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: CHAIN_ID_HEX }],
      });
      setState((s) => ({ ...s, isCorrectChain: true }));
    } catch {
      setState((s) => ({ ...s, error: 'Failed to switch network' }));
    }
  }, []);

  const executeSwap = useCallback(async () => {
    if (!window.ethereum || !walletAddress || !inputAmount) return;

    setState((s) => ({ ...s, status: isETH ? 'confirming' : 'approving', error: null, txHash: null }));

    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const owner = await signer.getAddress();

      const path = isETH
        ? [WETH_ADDRESS, USDC_ADDRESS, TOKEN_ADDRESS]
        : [USDC_ADDRESS, TOKEN_ADDRESS];
      const amountIn = isETH
        ? parseEther(inputAmount)
        : parseUnits(inputAmount, USDC_DECIMALS);

      // Approve USDC if needed
      if (!isETH) {
        const usdc = new Contract(USDC_ADDRESS, ERC20_ABI, signer);
        const allowance = await (usdc.allowance as (owner: string, spender: string) => Promise<bigint>)(owner, V2_ROUTER_ADDRESS);
        if (allowance < amountIn) {
          const approveTx = await (usdc.approve as (spender: string, amount: bigint) => Promise<{ wait: () => Promise<void> }>)(V2_ROUTER_ADDRESS, MaxUint256);
          await approveTx.wait();
        }
        setState((s) => ({ ...s, status: 'confirming' }));
      }

      const router = new Contract(V2_ROUTER_ADDRESS, ROUTER_ABI, signer);
      const amounts = await (router.getAmountsOut as (amountIn: bigint, path: string[]) => Promise<bigint[]>)(amountIn, path);
      const slippageBips = Math.round(slippage * 100);
      const amountOutMin = (amounts[path.length - 1]! * BigInt(10000 - slippageBips)) / BigInt(10000);

      const deadline = Math.floor(Date.now() / 1000) + 60 * 20;

      setState((s) => ({ ...s, status: 'pending' }));

      type TxResponse = { wait: () => Promise<{ hash: string }> };
      let tx: TxResponse;
      if (isETH) {
        tx = await (router.swapExactETHForTokens as (
          amountOutMin: bigint, path: string[], to: string, deadline: number, overrides: { value: bigint }
        ) => Promise<TxResponse>)(
          amountOutMin, path, owner, deadline, { value: amountIn },
        );
      } else {
        tx = await (router.swapExactTokensForTokens as (
          amountIn: bigint, amountOutMin: bigint, path: string[], to: string, deadline: number
        ) => Promise<TxResponse>)(
          amountIn, amountOutMin, path, owner, deadline,
        );
      }

      const receipt = await tx.wait();
      setState((s) => ({ ...s, status: 'success', txHash: receipt.hash }));
      void fetchBalance();
      onSwapSuccess?.();
    } catch (err: unknown) {
      let message = 'Swap failed';
      if (err && typeof err === 'object' && 'code' in err) {
        const code = (err as { code: string | number }).code;
        if (code === 'ACTION_REJECTED' || code === 4001) {
          message = 'Transaction cancelled';
        } else if (code === 'INSUFFICIENT_FUNDS') {
          message = `Not enough ${isETH ? 'ETH' : 'USDC'} in your wallet`;
        }
      }
      if (err instanceof Error && err.message.includes('INSUFFICIENT_OUTPUT_AMOUNT')) {
        message = 'Price moved too much. Try increasing slippage.';
      }
      setState((s) => ({ ...s, status: 'error', error: message }));
    }
  }, [walletAddress, inputAmount, slippage, isETH, fetchBalance, onSwapSuccess]);

  const reset = useCallback(() => {
    setInputAmount('');
    setState((s) => ({ ...s, estimatedOutput: '', status: 'idle', txHash: null, error: null }));
    void fetchBalance();
  }, [fetchBalance]);

  // Pre-swap validation
  const amt = parseFloat(inputAmount);
  const bal = parseFloat(state.balance);
  const hasAmount = !!inputAmount && !isNaN(amt) && amt > 0;
  const hasQuote = !!state.estimatedOutput && parseFloat(state.estimatedOutput) > 0;
  const hasSufficientBalance = !isNaN(bal) && bal > 0 && amt <= bal;
  const isBusy = state.status === 'quoting' || state.status === 'approving' || state.status === 'confirming' || state.status === 'pending';

  let swapError: string | null = null;
  if (hasAmount && !isNaN(bal) && !hasSufficientBalance) {
    swapError = `Insufficient ${inputToken} balance`;
  } else if (hasAmount && !isBusy && !hasQuote && state.status !== 'success' && !state.error) {
    swapError = 'No liquidity available';
  }

  const canSwap = !!walletAddress && state.isCorrectChain && hasAmount && hasQuote && hasSufficientBalance && !isBusy;

  return {
    inputToken,
    setInputToken,
    inputAmount,
    setInputAmount,
    slippage,
    setSlippage,
    ...state,
    canSwap,
    swapError,
    switchChain,
    executeSwap,
    reset,
  };
}
