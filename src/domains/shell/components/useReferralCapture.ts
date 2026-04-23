'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export function useReferralCapture(): void {
  const searchParams = useSearchParams();

  useEffect(() => {
    const ref = searchParams.get('ref');
    if (!ref) return;

    localStorage.setItem('ref_code', ref);

    const scrollToPurchase = () => {
      const target = document.getElementById('purchase-urano');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const timer = window.setTimeout(scrollToPurchase, 300);
    return () => window.clearTimeout(timer);
  }, [searchParams]);
}
