import { ethers } from "ethers"

export async function connectWallet() {
    try {
        if (typeof window.ethereum !== undefined) {
            const accounts = await  window.ethereum.request({method: 'eth_requestAccounts'})
            const provider = new ethers.BrowserProvider(window.ethereum)
            const network = await provider.getNetwork()
            return {
                provider,
                network,
                address: accounts[0]
            }
        } else {
            throw new Error("metaMask not found")
        }
    } catch (error) {
        console.error('Error connecting to MetaMask:', error);
        throw error;
    }
}

export const checkIfWalletIsConnected = async () => {
    try {
        if(typeof window.ethereum !== 'undefined') {
            const provider = new ethers.BrowserProvider(window.ethereum)
            const network = await provider.getNetwork()
            const accounts = await provider.listAccounts()
            if(accounts.length > 0) {
                return {
                    connected: true,
                    address:accounts[0],
                    network: network.chainId
                }
            }
        } 
        return {
            connected: false
        }
    } catch (error: any) {
        return {
            connected: false,
            error: error.message
        }
    }
}