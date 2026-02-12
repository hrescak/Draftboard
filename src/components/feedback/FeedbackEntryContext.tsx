"use client";

import { createContext, useContext, type ReactNode } from "react";

interface FeedbackEntryContextValue {
  openFeedback: (input?: { attachmentUrl?: string }) => void;
}

const FeedbackEntryContext = createContext<FeedbackEntryContextValue | null>(
  null
);

interface FeedbackEntryProviderProps {
  value: FeedbackEntryContextValue | null;
  children: ReactNode;
}

export function FeedbackEntryProvider({
  value,
  children,
}: FeedbackEntryProviderProps) {
  return (
    <FeedbackEntryContext.Provider value={value}>
      {children}
    </FeedbackEntryContext.Provider>
  );
}

export function useFeedbackEntry() {
  return useContext(FeedbackEntryContext);
}
