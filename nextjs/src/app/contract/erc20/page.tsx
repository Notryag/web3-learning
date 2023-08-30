"use client"
import { BrowserProvider } from "ethers";
import { ethers } from "ethers";
import { useEffect, useState } from "react"
import contractInfo from './MyToken.json'
export default function Contract() {
    const [walletProvider, setWalletProvider] = useState<BrowserProvider | null>(null);
    const [account, setAccount]= useState('')
    const [networkName, setNetworkName] = useState("")
    const [balance, setBalance] = useState("")

    async function connectToMetaMask() {
        try {
            const accounts = await walletProvider?.send("eth_requestAccounts", [])
            const network = await walletProvider?.getNetwork()
            const balance = await walletProvider?.getBalance(accounts[0])
            setAccount(accounts[0])
            setNetworkName(network?.name ?? '')
            setBalance(ethers.formatEther(balance || ''))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(!window.ethereum) {
            return
        }
        setWalletProvider(
            new ethers.BrowserProvider(window.ethereum)
        )

    },[])

    return (
        <>
            contract
            <div>
                <button onClick={connectToMetaMask}>connect</button>
            </div>
        </>
    )
}