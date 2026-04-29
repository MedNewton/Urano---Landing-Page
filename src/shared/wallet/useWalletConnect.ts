'use client';

import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { BrowserProvider, type Eip1193Provider } from 'ethers';


declare global {
  interface Window {
    ethereum?: Eip1193Provider;
  }
}

type EthEvents = {
  on?: (event: string, handler: (...args: unknown[]) => void) => void;
  removeListener?: (event: string, handler: (...args: unknown[]) => void) => void;
};

interface WalletContextValue {
  address: string | null;
  isConnecting: boolean;
  connect: () => Promise<void>;
  isWalletAvailable: boolean;
}

const WalletContext = React.createContext<WalletContextValue | null>(null);

function useWalletState(): WalletContextValue {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isWalletAvailable, setIsWalletAvailable] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const restoreSession = () => {
      const stored = localStorage.getItem('wallet_address');
      // Optimistically restore — keeps the UI connected across refreshes
      if (stored) setAddress(stored);
      if (!window.ethereum) return;

      const provider = new BrowserProvider(window.ethereum);
      provider.send('eth_accounts', []).then((accounts) => {
        if (cancelled) return;
        const accs = accounts as string[];
        if (accs.length > 0 && accs[0]) {
          setAddress(accs[0]);
          localStorage.setItem('wallet_address', accs[0]);
        } else if (stored) {
          // Permissions revoked — clear stored session
          setAddress(null);
          localStorage.removeItem('wallet_address');
        }
      }).catch(() => {
        // Swallow — keep optimistic value
      });
    };

    const detect = () => {
      if (typeof window === 'undefined') return false;
      const has = !!window.ethereum;
      setIsWalletAvailable(has);
      return has;
    };

    if (detect()) {
      restoreSession();
      return () => { cancelled = true; };
    }

    // Poll briefly in case window.ethereum is injected after mount (common with some wallets)
    const interval = window.setInterval(() => {
      if (detect()) {
        window.clearInterval(interval);
        restoreSession();
      }
    }, 200);
    const timeout = window.setTimeout(() => window.clearInterval(interval), 4000);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (!isWalletAvailable || !window.ethereum) return;
    const eth = window.ethereum as unknown as EthEvents;

    const handleAccountsChanged = (accounts: unknown) => {
      const accs = accounts as string[];
      if (accs.length === 0) {
        setAddress(null);
        localStorage.removeItem('wallet_address');
      } else if (accs[0]) {
        setAddress(accs[0]);
        localStorage.setItem('wallet_address', accs[0]);
      }
    };

    eth.on?.('accountsChanged', handleAccountsChanged);
    return () => { eth.removeListener?.('accountsChanged', handleAccountsChanged); };
  }, [isWalletAvailable]);

  const trackReferral = useCallback((wallet: string) => {
    const ref = localStorage.getItem('ref_code');
    if (!ref) return;
    void fetch(`/api/track-wallet`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ wallet, ref }),
    }).catch(() => {
      // fire-and-forget
    });
  }, []);

  // Track referral whenever we have both a wallet and a ref_code
  useEffect(() => {
    if (address) trackReferral(address);
  }, [address, trackReferral]);

  const connect = useCallback(async () => {
    try {
      setIsConnecting(true);

      const provider = new BrowserProvider(window.ethereum!);
      const accounts = (await provider.send('eth_requestAccounts', [])) as string[];
      const walletAddress = accounts[0];
      if (!walletAddress) throw new Error('No accounts returned');

      localStorage.setItem('wallet_address', walletAddress);
      setAddress(walletAddress);
    } catch (error) {
      console.error('Wallet connection failed:', error);
    } finally {
      setIsConnecting(false);
    }
  }, []);

  return { address, isConnecting, connect, isWalletAvailable };
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const value = useWalletState();
  return React.createElement(WalletContext.Provider, { value }, children);
}

export function useWalletConnect(): WalletContextValue {
  const ctx = React.useContext(WalletContext);
  if (!ctx) {
    throw new Error('useWalletConnect must be used within <WalletProvider>');
  }
  return ctx;
}
