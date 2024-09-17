'use client';
import React, { FormEvent, useEffect, useState, useTransition } from 'react'
import { Input } from './ui/input';
import { Button } from './ui/button';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import Editor from './Editor';
import useOwner from '@/lib/useOwner';
import DeleteDoc from './DeleteDoc';
import InviteUsers from './InviteUsers';
import ManageUsers from './ManageUsers';
import Avatar from './Avatar';

function Document({ id }: { id: string }) {
    const [input, setInput] = useState('');
    const [isUpdating, startTransition] = useTransition();
    const [data] = useDocumentData(doc(db, "documents", id));
    const isOwner = useOwner();
    useEffect(() => {
        if (data) {
            setInput(data.title);
        }
    }, [data])
    const updateTitle = (e: FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            startTransition(async () => {
                await updateDoc(doc(db, "documents", id), {
                    title: input,
                })
            })
        }
    }
    return (
        <div className='flex-1 h-full bg-white rounded-xl'>
            <div className='flex max-w-5xl mx-auto justify-between p-5'>
                <form onSubmit={updateTitle} className='flex flex-row flex-1 space-x-2'>
                    <Input
                        className='bg-white flex-1 border-black'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button disabled={isUpdating} type='submit' >
                        {isUpdating ? 'Updating...' : 'Update'}
                    </Button>
                    {isOwner && (
                        <>
                            <InviteUsers />
                            <DeleteDoc />
                        </>
                    )}
                </form>
            </div>
            <div className='flex max-w-5xl mx-auto justify-between px-5 items-center mb-5'>
                <ManageUsers />
                <Avatar />
            </div>
            <hr className='pb-10 max-w-5xl mx-auto' />
            <Editor />
        </div>
    )
}

export default Document
