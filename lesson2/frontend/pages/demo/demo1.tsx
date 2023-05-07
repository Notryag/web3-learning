import { createContext, useContext, useEffect, useState } from "react"
import { ethers } from 'ethers'

type IWalletCtx = {
    walletProvider: any
}

const WalletCtx = createContext<IWalletCtx>({} as IWalletCtx);

function Connect() {
    const { walletProvider } = useContext(WalletCtx)


    const connectToMetamask = async () => {
        const account = await walletProvider.send('eth_requestAccounts', [])
        const network = await walletProvider.getNetwork()
        const balance = await walletProvider.getBalance(await walletProvider.getSigner().getAddress())

        console.log(account, network, balance)
    }

    return (
        <div>
            <button onClick={connectToMetamask}>connect</button>

        </div>
    )

}


function Demo1() {
    const [walletProvider, setWalletProvider] = useState<any>(null)

    useEffect(() => {
        if (!window.ethereum) {
            return
        } else {
            setWalletProvider(new ethers.providers.Web3Provider(window.ethereum as any))
        }
    }, [])



    return (
        <WalletCtx.Provider value={{ walletProvider }}>
            <div>
                demo1
                <Connect />
            </div>
        </WalletCtx.Provider>
    )
}

export default Demo1