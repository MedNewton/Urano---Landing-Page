import { getContract } from "thirdweb";
import { client, chain } from "@/lib/thirdweb";
import { env } from "@/env";

const erc20Abi = [
  {
    type: "function",
    name: "allowance",
    stateMutability: "view",
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
    ],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "approve",
    stateMutability: "nonpayable",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ type: "bool" }],
  },
  {
    type: "function",
    name: "balanceOf",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "decimals",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint8" }],
  },
] as const;

const v2RouterAbi = [
  {
    type: "function",
    name: "getAmountsOut",
    stateMutability: "view",
    inputs: [
      { name: "amountIn", type: "uint256" },
      { name: "path", type: "address[]" },
    ],
    outputs: [{ name: "amounts", type: "uint256[]" }],
  },
  {
    type: "function",
    name: "swapExactTokensForTokens",
    stateMutability: "nonpayable",
    inputs: [
      { name: "amountIn", type: "uint256" },
      { name: "amountOutMin", type: "uint256" },
      { name: "path", type: "address[]" },
      { name: "to", type: "address" },
      { name: "deadline", type: "uint256" },
    ],
    outputs: [{ name: "amounts", type: "uint256[]" }],
  },
  {
    type: "function",
    name: "swapExactETHForTokens",
    stateMutability: "payable",
    inputs: [
      { name: "amountOutMin", type: "uint256" },
      { name: "path", type: "address[]" },
      { name: "to", type: "address" },
      { name: "deadline", type: "uint256" },
    ],
    outputs: [{ name: "amounts", type: "uint256[]" }],
  },
] as const;

export const usdcContract = getContract({
  client,
  chain,
  address: env.NEXT_PUBLIC_USDC_ADDRESS,
  abi: erc20Abi,
});

export const uranoContract = getContract({
  client,
  chain,
  address: env.NEXT_PUBLIC_URANO_ADDRESS,
  abi: erc20Abi,
});

export const v2RouterContract = getContract({
  client,
  chain,
  address: env.NEXT_PUBLIC_UNISWAP_V2_ROUTER,
  abi: v2RouterAbi,
});

export const USDC_DECIMALS = 6;
export const URANO_DECIMALS = 18;
export const ETH_DECIMALS = 18;

export function usdcPath(): readonly `0x${string}`[] {
  const usdc = env.NEXT_PUBLIC_USDC_ADDRESS as `0x${string}`;
  const urano = env.NEXT_PUBLIC_URANO_ADDRESS as `0x${string}`;
  const weth = env.NEXT_PUBLIC_WETH_ADDRESS as `0x${string}`;
  return env.NEXT_PUBLIC_URANO_USDC_DIRECT_PAIR
    ? [usdc, urano]
    : [usdc, weth, urano];
}

export function ethPath(): readonly `0x${string}`[] {
  const usdc = env.NEXT_PUBLIC_USDC_ADDRESS as `0x${string}`;
  const urano = env.NEXT_PUBLIC_URANO_ADDRESS as `0x${string}`;
  const weth = env.NEXT_PUBLIC_WETH_ADDRESS as `0x${string}`;
  return env.NEXT_PUBLIC_URANO_WETH_DIRECT_PAIR
    ? [weth, urano]
    : [weth, usdc, urano];
}

// ETH gas buffer kept out of the swap amount (0.0005 ETH in wei).
export const ETH_GAS_BUFFER_WEI = 500_000_000_000_000n;
