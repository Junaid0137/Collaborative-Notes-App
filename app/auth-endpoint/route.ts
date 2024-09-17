import { adminDB } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    auth().protect();
    const { sessionClaims } = await auth();
    const { room } = await req.json();

    const sessioin = liveblocks.prepareSession(sessionClaims?.email, {
        userInfo: {
            name: sessionClaims?.fullName,
            email: sessionClaims?.email,
            avatar: sessionClaims?.image
        }
    })

    const usersInRoom = await adminDB.collectionGroup('rooms').where('userId', '==', sessionClaims?.email).get();

    const userInRoom = await usersInRoom.docs.find((doc) => doc.id === room);

    if (userInRoom?.exists) {
        sessioin.allow(room, sessioin.FULL_ACCESS);
        const { body, status } = await sessioin.authorize();
        return new Response(body, { status })
    } else {
        return NextResponse.json(
            { message: 'not in this room' },
            { status: 403 }
        )
    }
}