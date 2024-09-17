import React, { useState, useTransition } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { deleteDoc } from "@/actions/actions";
import { toast } from "sonner";

function DeleteDoc() {
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const path = usePathname();
    const router = useRouter();
    const handleDelete = async () => {
        const roomId = path.split('/').pop();
        if (!roomId) return;

        startTransition(async () => {
            const { success } = await deleteDoc(roomId);
            if (success) {
                setIsOpen(false);
                router.replace('/')
                toast.success('Room Deleted Successfully')
            } else {
                toast.error('Failed to delete Room')
            }
        })
    }
    return <div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button asChild variant='destructive'>
                <DialogTrigger>Delete</DialogTrigger>
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        type='button'
                        variant='destructive'
                        onClick={handleDelete}
                        disabled={isPending}
                    >
                        {isPending ? 'Deleting...' : 'Delete'}
                    </Button>
                    <DialogClose asChild>
                        <Button type="button" variant='secondary'>
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>;
}

export default DeleteDoc;
