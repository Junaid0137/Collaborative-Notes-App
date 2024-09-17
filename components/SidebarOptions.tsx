'use client';
import { db } from '@/firebase'
import { doc } from 'firebase/firestore';
import Link from 'next/link';
import React from 'react'
import { useDocumentData } from 'react-firebase-hooks/firestore'

function SidebarOptions({ href, id }: { href: string, id: string }) {
    const [data] = useDocumentData(doc(db, 'documents', id));
    // const pathName = usePathname();
    // const isActive = href.includes(pathName) && pathName !== '/';

    if (!data) return null;
    return (
        <div className='bg-white items-center justify-center p-3 my-2 rounded-md border border-black' >
            <Link href={href}>
                <p className='truncate text-black text-center'>{data?.title}</p>
            </Link>
        </div>
    )
}

export default SidebarOptions

// className={`border p-2 rounded-md ${isActive ? "bg-gray-300 font-bold border-black" : "border-gray-400"
// }`}