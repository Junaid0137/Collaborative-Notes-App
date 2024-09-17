'use client';
import React, { useTransition } from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation';
import { createNewDoc } from '@/actions/actions';

function NewDocButton() {
    const [isPending, startTransition] = useTransition();
    const rounter = useRouter();
    const handleCreateNewDoc = () => {
        startTransition(async () => {
            //creating a new doc
            const { docId } = await createNewDoc();
            rounter.push(`/doc/${docId}`);
        })
    }
    return (
        <div className='mx-auto'>
            <Button onClick={handleCreateNewDoc} disabled={isPending} className='mx-auto'>
                {isPending ? 'Creating...' : "New Document"}
            </Button>
        </div>
    )
}

export default NewDocButton
