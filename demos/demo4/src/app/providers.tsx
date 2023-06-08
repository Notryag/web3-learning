'use client'

import {useEffect, useState} from "react";
import {WagmiConfig} from "wagmi";

export function Provider({children}: {children:React.ReactNode}) {
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])
    // return <WagmiConfig config={config}

}