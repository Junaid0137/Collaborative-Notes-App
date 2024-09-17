'use client';
import React, { Fragment } from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from 'next/navigation';

function BreadCrumbs() {
    const path = usePathname();
    const segmants = path.split('/');
    return (
        <div className='my-auto'>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    {segmants.map((segmant, idx) => {
                        if (!segmant) return null;
                        const href = `/${segmants.slice(0, idx + 1).join('/')}`
                        return (
                            <Fragment key={segmant}>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem >
                                    <BreadcrumbLink href={href} >{segmant}</BreadcrumbLink>
                                </BreadcrumbItem>
                            </Fragment>
                        )
                    })}
                </BreadcrumbList>
            </Breadcrumb>

        </div>
    )
}

export default BreadCrumbs
