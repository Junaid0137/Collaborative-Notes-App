'use state';
import { useRoom } from '@liveblocks/react/suspense'
import React, { useEffect, useState } from 'react'
import * as Y from 'yjs'
import { LiveblocksYjsProvider } from '@liveblocks/yjs';
import { Button } from './ui/button';
import { MoonIcon, SunIcon } from 'lucide-react';
import BlockNote from './BlockNote';
function Editor() {
    const room = useRoom();
    const [doc, setDoc] = useState<Y.Doc>();
    const [provider, setProvider] = useState<LiveblocksYjsProvider>();
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const yDoc = new Y.Doc();
        const yProvider = new LiveblocksYjsProvider(room, yDoc);
        setDoc(yDoc);
        setProvider(yProvider);

        return () => {
            yDoc?.destroy();
            yProvider?.destroy();
        }

    }, [room])

    if (!doc || !provider) {
        return null;
    }

    const style = `hover:text-white ${darkMode
        ? 'text-gray-300 bg-gray-700 hover:bg-gray-100 hover:text-gray-700'
        : 'text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-700'
        }`
    return (
        <div className='mx-auto p-5 max-w-5xl'>
            <div className='flex flex-row justify-end pb-10'>
                <Button className={style} onClick={() => setDarkMode(!darkMode)} >
                    {darkMode ? <SunIcon /> : <MoonIcon />}
                </Button>
            </div>
            <BlockNote doc={doc} provider={provider} darkMode={darkMode} />
        </div>
    )
}

export default Editor
