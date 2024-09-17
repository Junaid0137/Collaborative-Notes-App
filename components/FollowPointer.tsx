import React from 'react'
import { motion } from 'framer-motion'
import stringToColor from '@/lib/stringToColor';
function FollowPointer({ x, y, info }: { x: number, y: number, info: { name: string, email: string, avatar: strng } }) {
    const color = stringToColor(info.email || '1');
    return (
        <motion.div
            className='h-4 w-4 rounded-full absolute z-50'
            style={{
                top: y,
                left: x,
                pointerEvents: 'none'
            }}
            initial={{
                scale: 1,
                opacity: 1,
            }}
            animate={{
                scale: 1,
                opacity: 1
            }}
            exit={{
                scale: 0,
                opacity: 0
            }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 48 48">
                <path fill={color} d="M39.8,23.2L17.3,12.4c-0.7-0.4-1.6,0.3-1.4,1.1L20.3,38c0.2,0.9,1.3,1.1,1.8,0.4l4.4-5.9l9.4,12.1	c0.3,0.4,1,0.5,1.4,0.2l4.8-3.6c0.4-0.3,0.5-1,0.2-1.4l-9.4-12.1l6.9-2.7C40.6,24.8,40.6,23.6,39.8,23.2z"></path><path fill="none" stroke="#18193f" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M30.7,27l-2.6-3.3l6.9-2.7c0.8-0.3,0.9-1.5,0.1-1.8L12.6,8.4c-0.7-0.4-1.6,0.3-1.4,1.1l1.5,8.6"></path><path fill="none" stroke="#18193f" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M13.6,22.9l2,11.1c0.2,0.9,1.3,1.1,1.8,0.4l4.4-5.9l9.4,12.1c0.3,0.4,1,0.5,1.4,0.2l4.8-3.6	c0.4-0.3,0.5-1,0.2-1.4l-3.3-4.2"></path>
            </svg>
            <motion.div
                style={{
                    backgroundColor: color,
                }}
                initial={{
                    scale: 0.5,
                    opacity: 0,
                }}
                animate={{
                    scale: 1,
                    opacity: 1
                }}
                exit={{
                    scale: 0.5,
                    opacity: 0
                }}
                className='px-2 py-2 bg-neutral-200 text-black font-bold whitespace-nowrap min-w-max text-xs rounded-full'
            >
                {info?.name || info?.email}
            </motion.div>
        </motion.div>
    )
}

export default FollowPointer
