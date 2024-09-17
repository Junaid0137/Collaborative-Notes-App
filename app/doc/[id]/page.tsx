'use client';
import Document from '@/components/Document'
import React from 'react'

function Documentpage({ params: { id } }: { params: { id: string } }) {
    return (
        <div className='text-black flex flex-col flex-1 min-h-screen' >
            <Document id={id} />
        </div>
    )
}

export default Documentpage
