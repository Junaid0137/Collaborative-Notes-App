'use client';
import { db } from '@/firebase';
import { useUser } from '@clerk/nextjs'
import { collectionGroup, query, where } from 'firebase/firestore';
import { usePathname } from 'next/navigation';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore';

function useOwner() {
    const { user } = useUser();
    // const { room } = useRoom();
    const [isOwner, setIsOwner] = useState(false);
    const path = usePathname();
    const roomId = path.split('/').pop();
    const [usersInRoom] = useCollection(user && query(collectionGroup(db, 'rooms'), where('roomId', '==', roomId)))
    useEffect(() => {
        if (usersInRoom?.docs && usersInRoom.docs.length > 0) {
            const owners = usersInRoom.docs.filter(
                (doc) => doc.data().role === 'owner'
            )

            if (owners.some(
                (owner) => owner.data().userId === user?.emailAddresses[0].toString()
            )) {
                setIsOwner(true);
            }
        }
    }, [usersInRoom, user])
    return isOwner;
}

export default useOwner
