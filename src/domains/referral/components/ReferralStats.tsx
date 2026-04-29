"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Collapse,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";


import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import XIcon from "@mui/icons-material/X";
import TelegramIcon from "@mui/icons-material/Telegram";

import theme from "@/theme/theme";
import { useWalletConnect } from "@/shared/wallet";
import type { ReferralNode, ReferralSwap } from "../types";

const DEPTH_LABELS = ["You", "1st", "2nd", "3rd", "4th", "5th", "6th"];
const DEPTH_COLORS = [
  "#6DE7C2",
  "#5ED4B5",
  "#4FBFA8",
  "#40AA9B",
  "#31968E",
  "#228181",
  "#1A6D6D",
];

function truncate(addr: string): string {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

function formatAmount(value: string | number, decimals = 4): string {
  const n = typeof value === "string" ? parseFloat(value) : value;
  if (!isFinite(n)) return "0";
  if (n === 0) return "0";
  if (n > 1_000_000) return n.toLocaleString(undefined, { maximumFractionDigits: 0 });
  return n.toLocaleString(undefined, { maximumFractionDigits: decimals });
}

function countDescendants(node: ReferralNode): number {
  return node.referrals.reduce((acc, child) => acc + 1 + countDescendants(child), 0);
}

function sumDescendantBought(node: ReferralNode): number {
  return node.referrals.reduce(
    (acc, child) => acc + child.total_bought + sumDescendantBought(child),
    0,
  );
}

interface LevelStats {
  level: number;
  label: string;
  wallets: number;
  swaps: number;
  bought: number;
}

function collectLevelStats(node: ReferralNode): LevelStats[] {
  const map = new Map<number, { wallets: number; swaps: number; bought: number }>();

  function walk(n: ReferralNode) {
    const prev = map.get(n.depth) ?? { wallets: 0, swaps: 0, bought: 0 };
    map.set(n.depth, {
      wallets: prev.wallets + 1,
      swaps: prev.swaps + n.total_swaps,
      bought: prev.bought + n.total_bought,
    });
    for (const child of n.referrals) walk(child);
  }

  walk(node);

  return Array.from(map.entries())
    .sort(([a], [b]) => a - b)
    .map(([level, data]) => ({
      level,
      label: DEPTH_LABELS[level] ?? `L${level}`,
      ...data,
    }));
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    void navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };
  return (
    <Tooltip title={copied ? "Copied" : "Copy"} placement="top">
      <IconButton size="small" onClick={copy} sx={{ color: "rgba(255,255,255,0.55)", "&:hover": { color: "#6DE7C2" } }}>
        {copied ? <CheckRoundedIcon sx={{ fontSize: 16 }} /> : <ContentCopyRoundedIcon sx={{ fontSize: 16 }} />}
      </IconButton>
    </Tooltip>
  );
}

function SwapList({ swaps }: { swaps: ReferralSwap[] }) {
  if (swaps.length === 0) {
    return (
      <Typography sx={{ fontSize: 12.5, color: "rgba(255,255,255,0.45)", fontStyle: "italic" }}>
        No swaps yet
      </Typography>
    );
  }
  return (
    <Stack gap={0.5}>
      {swaps.map((s) => (
        <Stack
          key={s.tx_hash}
          direction="row"
          alignItems="center"
          gap={1.5}
          sx={{
            px: 1.25,
            py: 0.75,
            borderRadius: 1,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <Typography sx={{ fontSize: 12, fontFamily: "monospace", color: "rgba(255,255,255,0.6)", minWidth: 120 }}>
            {s.tx_hash.slice(0, 10)}…{s.tx_hash.slice(-6)}
          </Typography>
          <Typography sx={{ fontSize: 12.5, color: "#6DE7C2", fontWeight: 500 }}>
            +{formatAmount(s.amount_out)} URANO
          </Typography>
          <Typography sx={{ fontSize: 11.5, color: "rgba(255,255,255,0.4)", ml: "auto" }}>
            {new Date(s.created_at).toLocaleString()}
          </Typography>
          <Tooltip title="View on Arbiscan" placement="top">
            <IconButton
              size="small"
              component="a"
              href={`https://arbiscan.io/tx/${s.tx_hash}`}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: "rgba(255,255,255,0.4)", "&:hover": { color: "#6DE7C2" } }}
            >
              <OpenInNewRoundedIcon sx={{ fontSize: 14 }} />
            </IconButton>
          </Tooltip>
        </Stack>
      ))}
    </Stack>
  );
}

function TreeNode({ node, isRoot = false }: { node: ReferralNode; isRoot?: boolean }) {
  const [open, setOpen] = useState(isRoot || node.depth <= 1);
  const hasChildren = node.referrals.length > 0;
  const descendants = countDescendants(node);
  const downstreamBought = sumDescendantBought(node);

  return (
    <Box
      sx={{
        position: "relative",
        pl: isRoot ? 0 : { xs: 2, md: 3 },
        "&::before": isRoot
          ? undefined
          : {
              content: '""',
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "2px",
              borderRadius: 1,
              background: `linear-gradient(180deg, ${DEPTH_COLORS[node.depth] ?? DEPTH_COLORS[6]}88 0%, ${DEPTH_COLORS[node.depth] ?? DEPTH_COLORS[6]}15 100%)`,
            },
      }}
    >
      <Box
        sx={{
          p: { xs: 1.5, md: 2 },
          borderRadius: 2,
          background: isRoot
            ? "radial-gradient(120% 120% at 0% 0%, rgba(109,231,194,0.12) 0%, rgba(21,21,21,0.95) 60%)"
            : "rgba(255,255,255,0.03)",
          border: isRoot
            ? "1px solid rgba(109,231,194,0.35)"
            : "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Stack direction={{ xs: "column", md: "row" }} alignItems={{ xs: "flex-start", md: "center" }} gap={1.5}>
          <Stack direction="row" alignItems="center" gap={0.5}>
            {hasChildren ? (
              <IconButton size="small" onClick={() => setOpen((v) => !v)} sx={{ color: "#6DE7C2" }}>
                {open ? (
                  <ExpandMoreRoundedIcon sx={{ fontSize: 18 }} />
                ) : (
                  <ChevronRightRoundedIcon sx={{ fontSize: 18 }} />
                )}
              </IconButton>
            ) : (
              <Box sx={{ width: 28 }} />
            )}
            <Chip
              size="small"
              label={DEPTH_LABELS[node.depth] ?? `L${node.depth}`}
              sx={{
                height: 20,
                fontSize: 11,
                fontWeight: 600,
                background: isRoot ? theme.palette.uranoGradient : "rgba(109,231,194,0.15)",
                color: isRoot ? "#000" : "#6DE7C2",
                border: isRoot ? "none" : "1px solid rgba(109,231,194,0.3)",
              }}
            />
          </Stack>

          <Stack direction="row" alignItems="center" gap={0.5} sx={{ minWidth: 0 }}>
            <Typography sx={{ fontFamily: "monospace", fontSize: { xs: 12.5, md: 13.5 }, color: "#fff" }}>
              {truncate(node.wallet)}
            </Typography>
            <CopyButton value={node.wallet} />
            <Tooltip title="View on Arbiscan" placement="top">
              <IconButton
                size="small"
                component="a"
                href={`https://arbiscan.io/address/${node.wallet}`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "rgba(255,255,255,0.4)", "&:hover": { color: "#6DE7C2" } }}
              >
                <OpenInNewRoundedIcon sx={{ fontSize: 14 }} />
              </IconButton>
            </Tooltip>
          </Stack>

          <Stack direction="row" gap={1} flexWrap="wrap" sx={{ ml: { md: "auto" } }}>
            <Chip
              size="small"
              label={`${node.total_swaps} swap${node.total_swaps === 1 ? "" : "s"}`}
              sx={{ height: 22, fontSize: 11.5, background: "rgba(255,255,255,0.06)", color: "#fff" }}
            />
            <Chip
              size="small"
              label={`${formatAmount(node.total_bought)} URANO`}
              sx={{ height: 22, fontSize: 11.5, background: "rgba(109,231,194,0.1)", color: "#6DE7C2" }}
            />
            {hasChildren && (
              <Chip
                size="small"
                label={`${descendants} downline · ${formatAmount(downstreamBought)} URANO`}
                sx={{
                  height: 22,
                  fontSize: 11.5,
                  background: "rgba(255,255,255,0.06)",
                  color: "rgba(255,255,255,0.7)",
                }}
              />
            )}
          </Stack>
        </Stack>

        <Collapse in={open && node.swaps.length > 0} unmountOnExit>
          <Box sx={{ mt: 1.25 }}>
            <SwapList swaps={node.swaps} />
          </Box>
        </Collapse>
      </Box>

      <Collapse in={open && hasChildren} unmountOnExit>
        <Stack gap={1.25} sx={{ mt: 1.25 }}>
          {node.referrals.map((child) => (
            <TreeNode key={child.wallet} node={child} />
          ))}
        </Stack>
      </Collapse>
    </Box>
  );
}

function ReferralLinkCard({ address }: { address: string }) {
  const [copied, setCopied] = useState(false);

  const referralUrl =
    typeof window === "undefined"
      ? `/?ref=${address.toLowerCase()}`
      : `${window.location.origin}/?ref=${address.toLowerCase()}`;

  const shareMessage =
    "Join me on Urano Ecosystem — on-chain tokenization powered by Arbitrum.";

  const handleCopy = () => {
    void navigator.clipboard.writeText(referralUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const xUrl = `https://x.com/intent/post?text=${encodeURIComponent(`${shareMessage} ${referralUrl}`)}`;
  const tgUrl = "https://t.me/UranoEcosystem";

  return (
    <Box
      sx={{
        mb: 3,
        p: 2,
        borderRadius: 2,
        background:
          "radial-gradient(120% 120% at 0% 0%, rgba(109,231,194,0.06) 0%, rgba(21,21,21,0.95) 55%)",
        border: "1px solid rgba(109,231,194,0.2)",
      }}
    >
      <Stack direction="row" alignItems="center" gap={1} mb={1.25}>
        <ShareRoundedIcon sx={{ fontSize: 18, color: "#6DE7C2" }} />
        <Typography sx={{ fontSize: 13.5, fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>
          Your referral link
        </Typography>
      </Stack>

      <Stack direction="row" alignItems="center" gap={1}>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: 1.5,
            py: 1,
            borderRadius: 1.5,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            overflow: "hidden",
          }}
        >
          <Typography
            sx={{
              flex: 1,
              fontFamily: "monospace",
              fontSize: { xs: 12, md: 13 },
              color: "#6DE7C2",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {referralUrl}
          </Typography>
        </Box>

        <Tooltip title={copied ? "Copied!" : "Copy link"} placement="top">
          <Button
            size="small"
            onClick={handleCopy}
            startIcon={
              copied ? (
                <CheckRoundedIcon sx={{ fontSize: 16 }} />
              ) : (
                <ContentCopyRoundedIcon sx={{ fontSize: 16 }} />
              )
            }
            sx={{
              background: theme.palette.uranoGradient,
              color: "#000",
              fontWeight: 600,
              textTransform: "none",
              borderRadius: 1.5,
              px: 2,
              minWidth: 90,
              "&:hover": { background: theme.palette.uranoGradient, opacity: 0.92 },
            }}
          >
            {copied ? "Copied!" : "Copy"}
          </Button>
        </Tooltip>

        <Tooltip title="Share on X" placement="top">
          <IconButton
            size="small"
            component="a"
            href={xUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(255,255,255,0.12)",
              "&:hover": { borderColor: "rgba(109,231,194,0.55)", color: "#6DE7C2" },
            }}
          >
            <XIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Share on Telegram" placement="top">
          <IconButton
            size="small"
            component="a"
            href={tgUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(255,255,255,0.12)",
              "&:hover": { borderColor: "rgba(109,231,194,0.55)", color: "#6DE7C2" },
            }}
          >
            <TelegramIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
      </Stack>
    </Box>
  );
}

export default function ReferralStats() {
  const { address, connect, isConnecting, isWalletAvailable } = useWalletConnect();
  const [tree, setTree] = useState<ReferralNode | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [walletError, setWalletError] = useState<string | null>(null);

  const fetchTree = useCallback(async (wallet: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/referral-tree?wallet=${encodeURIComponent(wallet)}`,
      );
      if (!res.ok) throw new Error(`Failed to load referral tree (${res.status})`);
      const data = (await res.json()) as ReferralNode;
      setTree(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
      setTree(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (address) void fetchTree(address);
    else setTree(null);
  }, [address, fetchTree]);

  const summary = useMemo(() => {
    if (!tree) return null;
    const totalDownline = countDescendants(tree);
    const downstreamBought = sumDescendantBought(tree);
    const levels = collectLevelStats(tree);
    return {
      totalDownline,
      downstreamBought,
      selfBought: tree.total_bought,
      selfSwaps: tree.total_swaps,
      levels,
    };
  }, [tree]);

  return (
    <Box
      sx={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 3,
        p: { xs: 2.5, md: 3.5 },
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems={{ xs: "flex-start", md: "center" }}
        justifyContent="space-between"
        gap={2}
        mb={3}
      >
        <Stack gap={0.5}>
          <Typography
            className="conthrax"
            sx={{
              fontSize: { xs: 20, md: 26 },
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              background: theme.palette.uranoGradient,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Referral Tree
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: 13.5 }}>
            Purchases attributed to your wallet and its downline, up to the 6th level.
          </Typography>
        </Stack>

        {address && (
          <Button
            variant="outlined"
            size="small"
            onClick={() => void fetchTree(address)}
            disabled={loading}
            sx={{
              color: "#6DE7C2",
              borderColor: "rgba(109,231,194,0.4)",
              textTransform: "none",
              "&:hover": { borderColor: "#6DE7C2", background: "rgba(109,231,194,0.06)" },
            }}
          >
            {loading ? <CircularProgress size={16} sx={{ color: "#6DE7C2" }} /> : "Refresh"}
          </Button>
        )}
      </Stack>

      {address && <ReferralLinkCard address={address} />}

      {!address && (
        <Stack alignItems="center" gap={2} py={4}>
          <AccountBalanceWalletRoundedIcon sx={{ fontSize: 48, color: "rgba(109,231,194,0.4)" }} />
          <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: 14.5, textAlign: "center" }}>
            Connect your wallet to see your referral tree.
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              if (!isWalletAvailable) {
                setWalletError("Please install MetaMask or another Web3 wallet to connect.");
                return;
              }
              setWalletError(null);
              void connect();
            }}
            disabled={isConnecting}
            startIcon={
              isConnecting ? (
                <CircularProgress size={18} sx={{ color: "#000" }} />
              ) : (
                <AccountBalanceWalletRoundedIcon sx={{ fontSize: 20 }} />
              )
            }
            sx={{
              background: theme.palette.uranoGradient,
              color: "#000",
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              px: 4,
              py: 1.25,
              fontSize: 15,
              "&:hover": {
                background: theme.palette.uranoGradient,
                opacity: 0.9,
              },
            }}
          >
            {isConnecting ? "Connecting..." : "Connect Wallet"}
          </Button>
          {walletError && (
            <Alert
              severity="warning"
              sx={{
                background: "rgba(255,180,50,0.08)",
                border: "1px solid rgba(255,180,50,0.2)",
              }}
            >
              {walletError}
            </Alert>
          )}
        </Stack>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {summary && (
        <>
          {/* Global stats */}
          <Stack direction={{ xs: "column", sm: "row" }} gap={1.5} mb={2}>
            {[
              { label: "Your swaps", value: `${summary.selfSwaps}` },
              { label: "Your $URANO", value: formatAmount(summary.selfBought) },
              { label: "Downline wallets", value: `${summary.totalDownline}` },
              { label: "Downline $URANO", value: formatAmount(summary.downstreamBought) },
            ].map((s) => (
              <Box
                key={s.label}
                sx={{
                  flex: 1,
                  px: 2,
                  py: 1.5,
                  borderRadius: 2,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 11.5,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  {s.label}
                </Typography>
                <Typography sx={{ fontSize: { xs: 18, md: 22 }, fontWeight: 700, color: "#fff" }}>
                  {s.value}
                </Typography>
              </Box>
            ))}
          </Stack>

          {/* Per-level breakdown */}
          {summary.levels.length > 1 && (
            <Box
              sx={{
                mb: 3,
                px: 2,
                py: 1.5,
                borderRadius: 2,
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <Typography
                sx={{
                  fontSize: 11.5,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.5)",
                  mb: 1,
                }}
              >
                Per-level breakdown
              </Typography>
              <Stack gap={0.75}>
                {summary.levels.map((lvl) => (
                  <Stack
                    key={lvl.level}
                    direction="row"
                    alignItems="center"
                    gap={1.5}
                    sx={{ py: 0.5 }}
                  >
                    <Chip
                      size="small"
                      label={lvl.label}
                      sx={{
                        height: 20,
                        fontSize: 11,
                        fontWeight: 600,
                        minWidth: 40,
                        background: `${DEPTH_COLORS[lvl.level] ?? DEPTH_COLORS[6]}22`,
                        color: DEPTH_COLORS[lvl.level] ?? DEPTH_COLORS[6],
                        border: `1px solid ${DEPTH_COLORS[lvl.level] ?? DEPTH_COLORS[6]}55`,
                      }}
                    />
                    <Typography sx={{ fontSize: 12.5, color: "rgba(255,255,255,0.7)", minWidth: 80 }}>
                      {lvl.wallets} wallet{lvl.wallets !== 1 ? "s" : ""}
                    </Typography>
                    <Typography sx={{ fontSize: 12.5, color: "rgba(255,255,255,0.5)", minWidth: 70 }}>
                      {lvl.swaps} swap{lvl.swaps !== 1 ? "s" : ""}
                    </Typography>
                    <Typography sx={{ fontSize: 12.5, color: "#6DE7C2", fontWeight: 500 }}>
                      {formatAmount(lvl.bought)} URANO
                    </Typography>
                    {/* Visual bar */}
                    {summary.downstreamBought + summary.selfBought > 0 && (
                      <Box sx={{ flex: 1, ml: 1 }}>
                        <Box
                          sx={{
                            height: 4,
                            borderRadius: 2,
                            background: `${DEPTH_COLORS[lvl.level] ?? DEPTH_COLORS[6]}55`,
                            width: `${Math.max(2, (lvl.bought / (summary.downstreamBought + summary.selfBought)) * 100)}%`,
                            transition: "width 0.3s ease",
                          }}
                        />
                      </Box>
                    )}
                  </Stack>
                ))}
              </Stack>
            </Box>
          )}
        </>
      )}

      {tree && <TreeNode node={tree} isRoot />}

      {address &&
        tree?.referrals.length === 0 &&
        tree?.swaps.length === 0 &&
        !loading && (
          <Typography sx={{ mt: 2, color: "rgba(255,255,255,0.5)", textAlign: "center" }}>
            No activity yet. Share your referral link from the Purchase Urano section to start
            building your downline.
          </Typography>
        )}
    </Box>
  );
}
