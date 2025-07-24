'use client'
import { X } from '@phosphor-icons/react'
import React from 'react'
import RouteInfo from './RouteInfo'

const HeaderMobile = () => {
    return (
        <>

            {/* Left Arrow (like IconButton edge="start") */}
            <button
                className="text-[var(--Primary-1,#054E72)]"
            // onClick={handleStepBack}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none">
                    <path d="M13 4 7 10l6 6" stroke="currentColor" strokeWidth="2" />
                </svg>
            </button>


            {/* Title (like Typography with sx={{ ml: 2, flex: 1 }}) */}
            <RouteInfo />

            {/* Close Button (like IconButton edge="end") */}
            <button
                // onClick={onClose}
                className="text-[var(--Primary-1,#054E72)]"
            >
                <X size={20} />
            </button>
        </>
    )
}

export default HeaderMobile