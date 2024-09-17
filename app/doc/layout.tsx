import LiveBlocksProviders from '@/components/LiveBlocksProviders'
import React from 'react'

function PageLayout({ children }: { children: React.ReactNode }) {
    return (
        <LiveBlocksProviders>
            {children}
        </LiveBlocksProviders>
    )
}

export default PageLayout
