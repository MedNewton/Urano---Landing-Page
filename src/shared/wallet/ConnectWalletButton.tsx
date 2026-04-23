'use client';

import React from 'react';
import { Button, CircularProgress, useTheme, type Theme } from '@mui/material';
import { useWalletConnect } from './useWalletConnect';

interface ConnectWalletButtonProps {
  showError: (title: string, message: string) => void;
}

function truncateAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({ showError }) => {
  const theme = useTheme<Theme>();
  const { address, isConnecting, connect, isWalletAvailable } = useWalletConnect();

  const handleClick = () => {
    if (!isWalletAvailable) {
      showError(
        'No Web3 Wallet Detected',
        'Please install MetaMask or another Web3 wallet to connect.',
      );
      return;
    }
    void connect();
  };

  if (address) {
    return (
      <Button
        variant="outlined"
        onClick={handleClick}
        sx={{
          borderImage: `${theme.palette.uranoGradient} 1`,
          background: 'transparent',
          color: theme.palette.text.primary,
          borderRadius: 2,
          textTransform: 'none',
          fontWeight: 500,
        }}
      >
        {truncateAddress(address)}
      </Button>
    );
  }

  return (
    <Button
      variant="contained"
      onClick={handleClick}
      disabled={isConnecting}
      sx={{
        background: theme.palette.uranoGradient,
        color: '#000',
        borderRadius: 2,
        textTransform: 'none',
        fontWeight: 500,
        '&:hover': {
          background: theme.palette.uranoGradient,
          opacity: 0.9,
        },
      }}
    >
      {isConnecting ? <CircularProgress size={20} color="inherit" /> : 'Connect Wallet'}
    </Button>
  );
};

export default ConnectWalletButton;
