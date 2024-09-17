'use client';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/nextjs';
import React from 'react'
import BreadCrumbs from './BreadCrumbs';

function Header() {
    const { user } = useUser();
    return (
        <div className='flex items-center justify-between p-5 shadow-2xl' >
            {user && (
                <h1 className='text-2xl font-bold' >{user?.firstName}{`'s`} space</h1>
            )}

            {/*BredCrumbs*/}
            <BreadCrumbs />
            <div>
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </div>
    )
}

export default Header
