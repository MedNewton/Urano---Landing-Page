export type ReferralSwap = Readonly<{
  tx_hash: string;
  amount_in: string;
  amount_out: string;
  block_number: number;
  created_at: string;
}>;

export type ReferralNode = Readonly<{
  wallet: string;
  depth: number;
  swaps: ReferralSwap[];
  total_swaps: number;
  total_bought: number;
  referrals: ReferralNode[];
}>;
