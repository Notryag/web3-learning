import { ethers } from "ethers"

export default function Wallet() {

    async function connectWallet() {
        if(typeof window.ethereum === 'undefined') {
            alert("install metamask")
        } else {
            const {ethereum} = window
            const accounts = await ethereum.request({method: 'eth_requestAccounts'})

            const provider = new ethers.BrowserProvider(ethereum)
            const signer = await provider.getSigner()
        }
    }


    


    return (
        <div>
            wallet
        </div>
    )
}