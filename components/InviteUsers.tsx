import React, { FormEvent, useState, useTransition } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { inviteUserToDoc } from "@/actions/actions";

function InviteUsers() {
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const path = usePathname();
    const [email, setEmail] = useState();
    const handleInvite = async (e: FormEvent) => {

        e.preventDefault();
        const roomId = path.split('/').pop();
        if (!roomId) return;

        startTransition(async () => {
            const { success } = await inviteUserToDoc(roomId, email);
            if (success) {
                setIsOpen(false);
                setEmail('')
                toast.success('User added to Room Successfully')
            } else {
                toast.error('Failed to add User to the room')
            }
        })
    }
    return <div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button asChild variant='outline'>
                <DialogTrigger>Invite</DialogTrigger>
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Invite a User to collaburate!</DialogTitle>
                    <DialogDescription>
                        Enter the email of the User you want to invite
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleInvite}>
                    <Input
                        type="email"
                        placeholder="Email"
                        className="w-full mb-4"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <DialogFooter>
                        <Button type="submit" disabled={!email || isPending}>
                            {isPending ? 'Inviting...' : 'Invite'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    </div>;
}

export default InviteUsers;
