"use client"

import { ethers } from "ethers"
import { useEffect, useState } from "react"

export default function Coffee() {

    const contractAddress =''

    const [currentAccount, setCurrentAccount] = useState()

    async function checkIfWalletIsConnected() {
        try {
            const { ethereum } = window
            
            const accounts = await ethereum.request({method: "eth_accounts"})

            if(accounts.length !== 0) {
                setCurrentAccount(accounts[0])
                console.log("wallet is connected")
            } else {
                console.warn("make sure you hava metaMask connected")
            }

        } catch (error:any) {
            console.error("error", error.message);
           
        }
    }

    const connectWallet =async () => {
        try {
            const {ethereum} = window
            if(!ethereum) {
                console.warn("make sure you have metaMask connected")
                return
            }

            const accounts =await ethereum.request({method: "eth_requestAccounts"})
            console.log('%c [ accounts ]-40', 'font-size:13px; background:pink; color:#bf2c9f;', accounts)
            setCurrentAccount(accounts[0])
        } catch (error: any) {
            console.error(error.message)
        }
    }


    useEffect(() => {

    }, [])


    return (
        <>
            <div>
                <h1>coffee</h1>
                <div>
                    {currentAccount ? currentAccount : ''}
                    <button onClick={connectWallet}>connect to wallet</button>
                </div>
            </div>
        </>
    )
}