"use client";

import { useState, useCallback } from "react";

export interface UseErrorModalReturn {
  errorModalOpen: boolean;
  errorModalTitle: string;
  errorModalMessage: string;
  showError: (title: string, message: string) => void;
  closeError: () => void;
}

export function useErrorModal(): UseErrorModalReturn {
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorModalTitle, setErrorModalTitle] = useState("");
  const [errorModalMessage, setErrorModalMessage] = useState("");

  const showError = useCallback((title: string, message: string) => {
    setErrorModalTitle(title);
    setErrorModalMessage(message);
    setErrorModalOpen(true);
  }, []);

  const closeError = useCallback(() => {
    setErrorModalOpen(false);
  }, []);

  return { errorModalOpen, errorModalTitle, errorModalMessage, showError, closeError };
}
