export const TOKEN_ADDRESS = "0x5AF01e4d2bEFf2b01A8F3992e875EDd8d67469D2";
export const ARBITRUM_CHAIN = "arbitrum";
export const UNISWAP_SWAP_URL = `https://app.uniswap.org/swap?outputCurrency=${TOKEN_ADDRESS}&chain=${ARBITRUM_CHAIN}`;

export const CHAIN_ID = 42161;
export const CHAIN_ID_HEX = "0xa4b1";
export const WETH_ADDRESS = "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1";
export const USDC_ADDRESS = "0xaf88d065e77c8cC2239327C5EDb3A432268e5831";
export const USDC_DECIMALS = 6;
export const V2_ROUTER_ADDRESS = "0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24";
export const TOKEN_DECIMALS = 18;

export const ROUTER_ABI = [
  "function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)",
  "function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)",
  "function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts)",
];

export const ERC20_ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function balanceOf(address account) external view returns (uint256)",
];
