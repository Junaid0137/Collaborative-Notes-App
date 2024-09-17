'use client';
import React, { useEffect, useState } from 'react'
import NewDocButton from './NewDocButton'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { MenuIcon } from 'lucide-react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useUser } from '@clerk/nextjs'
import { collectionGroup, DocumentData, query, where } from 'firebase/firestore'
import { db } from '@/firebase'
import SidebarOptions from './SidebarOptions';

interface RoomDocument extends DocumentData {
    createdAt: string,
    role: 'owner' | 'editor',
    roomId: string,
    userId: string,
}

function Sidebar() {
    const { user } = useUser();
    const [groupedData, setGroupedData] = useState<{
        owner: RoomDocument[];
        editor: RoomDocument[];
    }>({
        owner: [],
        editor: [],
    });
    const [data] = useCollection(
        user && (
            query(collectionGroup(db, 'rooms'), where('userId', '==', user.emailAddresses[0].toString()))
        )
    );
    useEffect(() => {
        if (!data) return;
        const grouped = data.docs.reduce<{
            owner: RoomDocument[];
            editor: RoomDocument[];
        }>(
            (acc, curr) => {
                const roomData = curr.data() as RoomDocument;
                if (roomData.role === 'owner') {
                    acc.owner.push(roomData);
                }
                else {
                    acc.editor.push(roomData);
                }
                return acc;
            },
            {
                owner: [],
                editor: [],
            }
        )
        setGroupedData(grouped);
    }, [data])
    const menuOptions = (
        <>
            <NewDocButton />

            {groupedData.owner.length === 0 ? (
                <h1>No Documents Found</h1>
            ) : (
                <>
                    <h2 className='mx-auto mt-2 justify-center'>
                        My Documents
                    </h2>
                    {groupedData.owner.map((doc) => (
                        <SidebarOptions key={doc.roomId} id={doc.roomId} href={`/doc/${doc.roomId}`} />
                    ))}
                </>
            )}

            {groupedData.editor.length === 0 ? (
                <h1>No Shared Documents Found</h1>
            ) : (
                <>
                    <h2 className=''>
                        My Shared Documents
                    </h2>
                    {groupedData.editor.map((doc) => (
                        // <p key={doc.id} >{doc.roomId}</p>
                        <SidebarOptions key={doc.roomId} id={doc.roomId} href={`/doc/${doc.roomId}`} />
                    ))}
                </>
            )}

        </>
    )
    return (
        <div className='p-2 md:p-5 bg-gray-200 relative'>
            <div className='md:hidden'>
                <Sheet>
                    <SheetTrigger>
                        <MenuIcon size={40} className='p-2 hover:opacity-30 rounded-lg text-black' />
                    </SheetTrigger>
                    <SheetContent side='left'>
                        <SheetHeader>
                            <SheetTitle>Menu</SheetTitle>
                            <div>{menuOptions}</div>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>
            <div className='hidden md:inline'>
                {menuOptions}
            </div>
        </div>
    )
}

export default Sidebar
