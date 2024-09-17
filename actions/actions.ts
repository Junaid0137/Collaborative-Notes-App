'use server';

import { adminDB } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";

export async function createNewDoc() {
    auth().protect();
    const { sessionClaims } = await auth();

    const docCollectionRef = adminDB.collection('documents');
    const docRef = await docCollectionRef.add({
        title: 'New Doc'
    });

    await adminDB.collection('users').doc(sessionClaims?.email).collection('rooms').doc(docRef.id).set({
        userId: sessionClaims?.email,
        role: 'owner',
        createdAt: new Date(),
        roomId: docRef.id,
    })

    return { docId: docRef.id }
}

export async function deleteDoc(roomId: string) {
    auth().protect();
    console.log('deleteDOc', roomId);
    try {
        //deleting the doc ref itself
        await adminDB.collection('documents').doc(roomId).delete()
        const query = await adminDB.collectionGroup('rooms').where('roomId', '==', roomId).get();
        const batch = adminDB.batch()

        //deleting the room ref in the user's collection for every user in the room
        query.docs.forEach((doc) => {
            batch.delete(doc.ref)
        })

        //deleting the room for liveblocks
        await liveblocks.deleteRoom(roomId);

        return { success: true }
    } catch (error) {
        console.log(error)
        return { success: falses }
    }
}

export async function inviteUserToDoc(roomId: string, email: string) {
    auth().protect();
    console.log('inviteto', roomId, email);
    try {
        await adminDB.collection('users').doc(email).collection('rooms').doc(roomId).set({
            userId: email,
            role: 'editor',
            createdAt: new Date(),
            roomId: roomId,
        })
        return { success: true }
    } catch (error) {
        console.log(error);
        return { success: false }
    }
}

export async function removeUserFromDoc(roomId: string, userId: string) {
    auth().protect()
    try {
        await adminDB.collection('users').doc(userId).collection('rooms').doc(roomId).delete();
        return { success: true }
    } catch (error) {
        console.log(error);
        return { success: false }
    }

}
