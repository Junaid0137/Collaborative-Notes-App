'use client';
import Error from 'next/error';
import React from 'react'
import { LiveblocksProvider } from '@liveblocks/react/suspense'
function LiveBlocksProviders({ children }: { children: React.ReactNode }) {
    if (!process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY) {
        throw new Error("public key not set")
    }
    return (
        <LiveblocksProvider
            throttle={16}
            authEndpoint={'/auth-endpoint'}
        >
            {children}
        </LiveblocksProvider>
    )
}

export default LiveBlocksProviders
