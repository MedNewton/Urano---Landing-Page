'use client';
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */

import * as React from 'react';
import { Suspense } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider, CssBaseline } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import theme from '@/theme/theme';
import { WalletProvider } from '@/shared/wallet';
import { useReferralCapture } from '@/domains/shell/components/useReferralCapture';

function ReferralCapture() {
  useReferralCapture();
  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={theme as Theme}>
        <CssBaseline />
        <WalletProvider>
          <Suspense fallback={null}>
            <ReferralCapture />
          </Suspense>
          {children}
        </WalletProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
