'use client';

import React from 'react';
import {
  Box,
  Button,
  CircularProgress,
  InputBase,
  Link,
  MenuItem,
  Select,
  Stack,
  Typography,
  useTheme,
  type Theme,
} from '@mui/material';
import { useWalletConnect } from './useWalletConnect';
import { useSwap, type InputToken } from './useSwap';

const SLIPPAGE_OPTIONS = [0.5, 1, 2];
const TOKEN_OPTIONS: InputToken[] = ['USDC', 'ETH'];

interface SwapWidgetProps {
  showError: (title: string, message: string) => void;
  onSwapSuccess?: () => void;
}

const SwapWidget: React.FC<SwapWidgetProps> = ({ showError, onSwapSuccess }) => {
  const theme = useTheme<Theme>();
  const { address, isWalletAvailable, connect, isConnecting } = useWalletConnect();
  const {
    inputToken,
    setInputToken,
    inputAmount,
    setInputAmount,
    slippage,
    setSlippage,
    estimatedOutput,
    status,
    txHash,
    error,
    isCorrectChain,
    balance,
    canSwap,
    swapError,
    switchChain,
    executeSwap,
    reset,
  } = useSwap(address, onSwapSuccess);

  const handleConnectClick = () => {
    if (!isWalletAvailable) {
      showError(
        'No Web3 Wallet Detected',
        'Please install MetaMask or another Web3 wallet to connect.',
      );
      return;
    }
    void connect();
  };

  const formatOutput = (val: string) => {
    const num = parseFloat(val);
    if (isNaN(num)) return '';
    if (num > 1_000_000) return num.toLocaleString(undefined, { maximumFractionDigits: 0 });
    if (num > 1) return num.toLocaleString(undefined, { maximumFractionDigits: 4 });
    return val.slice(0, 12);
  };

  const formatBalance = (val: string) => {
    const num = parseFloat(val);
    if (isNaN(num)) return '0';
    if (inputToken === 'ETH') return num.toFixed(4);
    return num.toFixed(2);
  };

  const handleMax = () => {
    if (!balance) return;
    const num = parseFloat(balance);
    if (isNaN(num) || num <= 0) return;
    if (inputToken === 'ETH') {
      const maxEth = Math.max(0, num - 0.002);
      setInputAmount(maxEth > 0 ? maxEth.toFixed(6) : '');
    } else {
      setInputAmount(num.toFixed(2));
    }
  };

  const inputSx = {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 2,
    border: `1px solid ${theme.palette.cardBorder1.main}`,
    px: 2,
    py: 1.5,
    color: theme.palette.text.primary,
    fontSize: '1.1rem',
    fontFamily: 'Host Grotesk',
    '& input::placeholder': {
      color: theme.palette.text.secondary,
      opacity: 1,
    },
  };

  const smallSelectSx = {
    color: theme.palette.text.primary,
    fontSize: '0.8rem',
    height: 28,
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.cardBorder1.main,
    },
    '& .MuiSelect-icon': {
      color: theme.palette.text.secondary,
    },
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 480,
        mx: 'auto',
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.cardBorder1.main}`,
        borderRadius: 3,
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography sx={{ fontWeight: 600, fontSize: '1rem', color: theme.palette.text.primary }}>
          Swap
        </Typography>
        <Stack direction="row" alignItems="center" gap={1}>
          <Typography sx={{ fontSize: '0.75rem', color: theme.palette.text.secondary }}>
            Slippage
          </Typography>
          <Select
            value={slippage}
            onChange={(e) => setSlippage(Number(e.target.value))}
            size="small"
            sx={smallSelectSx}
          >
            {SLIPPAGE_OPTIONS.map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}%
              </MenuItem>
            ))}
          </Select>
        </Stack>
      </Stack>

      {/* You pay */}
      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={0.5}>
          <Typography sx={{ fontSize: '0.8rem', color: theme.palette.text.secondary }}>
            You pay
          </Typography>
          {address && balance && (
            <Stack direction="row" alignItems="center" gap={0.5}>
              <Typography sx={{ fontSize: '0.75rem', color: theme.palette.text.secondary }}>
                Balance: {formatBalance(balance)}
              </Typography>
              <Typography
                onClick={handleMax}
                sx={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: theme.palette.uranoGreen1.main,
                  cursor: 'pointer',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                MAX
              </Typography>
            </Stack>
          )}
        </Stack>
        <Stack direction="row" alignItems="center" sx={inputSx}>
          <InputBase
            placeholder="0.0"
            value={inputAmount}
            onChange={(e) => {
              const val = e.target.value;
              if (val === '' || /^\d*\.?\d*$/.test(val)) {
                setInputAmount(val);
              }
            }}
            sx={{
              flex: 1,
              color: theme.palette.text.primary,
              fontSize: '1.1rem',
              '& input': { padding: 0 },
            }}
          />
          <Select
            value={inputToken}
            onChange={(e) => {
              setInputToken(e.target.value as InputToken);
              setInputAmount('');
            }}
            size="small"
            sx={{
              ...smallSelectSx,
              fontWeight: 600,
              fontSize: '0.9rem',
              ml: 1,
              '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
            }}
          >
            {TOKEN_OPTIONS.map((t) => (
              <MenuItem key={t} value={t}>{t}</MenuItem>
            ))}
          </Select>
        </Stack>
      </Box>

      {/* You receive */}
      <Box>
        <Typography sx={{ fontSize: '0.8rem', color: theme.palette.text.secondary, mb: 0.5 }}>
          You receive (estimated)
        </Typography>
        <Stack direction="row" alignItems="center" sx={{ ...inputSx, opacity: 0.7 }}>
          <Typography
            sx={{
              flex: 1,
              fontSize: '1.1rem',
              color: estimatedOutput ? theme.palette.text.primary : theme.palette.text.secondary,
            }}
          >
            {status === 'quoting' ? '...' : estimatedOutput ? formatOutput(estimatedOutput) : '0.0'}
          </Typography>
          <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: theme.palette.text.secondary, ml: 1 }}>
            URANO
          </Typography>
        </Stack>
      </Box>

      {/* Action button */}
      {!address ? (
        <Button
          variant="contained"
          onClick={handleConnectClick}
          disabled={isConnecting}
          fullWidth
          sx={{
            background: theme.palette.uranoGradient,
            color: '#000',
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            py: 1.5,
            fontSize: '1rem',
            '&:hover': { background: theme.palette.uranoGradient, opacity: 0.9 },
          }}
        >
          {isConnecting ? <CircularProgress size={22} color="inherit" /> : 'Connect Wallet'}
        </Button>
      ) : !isCorrectChain ? (
        <Button
          variant="contained"
          onClick={() => void switchChain()}
          fullWidth
          sx={{
            background: theme.palette.uranoGradient,
            color: '#000',
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            py: 1.5,
            fontSize: '1rem',
            '&:hover': { background: theme.palette.uranoGradient, opacity: 0.9 },
          }}
        >
          Switch to Arbitrum
        </Button>
      ) : status === 'success' ? (
        <Stack gap={1.5}>
          <Typography sx={{ color: theme.palette.uranoGreen2.main, fontSize: '0.9rem', textAlign: 'center' }}>
            Swap successful!
          </Typography>
          {txHash && (
            <Link
              href={`https://arbiscan.io/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                fontSize: '0.8rem',
                color: theme.palette.uranoGreen1.main,
                textAlign: 'center',
                wordBreak: 'break-all',
              }}
            >
              View on Arbiscan: {txHash.slice(0, 10)}...{txHash.slice(-8)}
            </Link>
          )}
          <Button
            variant="outlined"
            onClick={reset}
            fullWidth
            sx={{
              borderColor: theme.palette.cardBorder1.main,
              color: theme.palette.text.primary,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 500,
              py: 1,
            }}
          >
            New Swap
          </Button>
        </Stack>
      ) : (
        <Button
          variant="contained"
          onClick={() => void executeSwap()}
          disabled={!canSwap}
          fullWidth
          sx={{
            background: canSwap ? theme.palette.uranoGradient : undefined,
            backgroundColor: !canSwap ? 'rgba(255,255,255,0.08)' : undefined,
            color: canSwap ? '#000' : theme.palette.text.secondary,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            py: 1.5,
            fontSize: '1rem',
            '&:hover': canSwap ? { background: theme.palette.uranoGradient, opacity: 0.9 } : {},
            '&.Mui-disabled': {
              color: theme.palette.text.secondary,
              backgroundColor: 'rgba(255,255,255,0.08)',
            },
          }}
        >
          {status === 'approving' || status === 'confirming' || status === 'pending' ? (
            <Stack direction="row" alignItems="center" gap={1}>
              <CircularProgress size={20} color="inherit" />
              <span>{status === 'approving' ? 'Approve USDC...' : status === 'confirming' ? 'Confirm in wallet...' : 'Swapping...'}</span>
            </Stack>
          ) : (
            'Swap'
          )}
        </Button>
      )}

      {/* Error / validation message */}
      {(error && status === 'error') || swapError ? (
        <Typography sx={{ color: theme.palette.error.main, fontSize: '0.8rem', textAlign: 'center' }}>
          {status === 'error' && error ? error : swapError}
        </Typography>
      ) : null}
    </Box>
  );
};

export default SwapWidget;
