'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider as JotaiProvider } from 'jotai';
import React from 'react';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
});
export const Providers = ({ children }: { children: React.ReactNode }) => (
    <JotaiProvider>
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </JotaiProvider>
);
