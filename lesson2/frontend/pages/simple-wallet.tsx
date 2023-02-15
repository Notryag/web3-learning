import { ethers, providers } from "ethers";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

export default dynamic(() => Promise.resolve(Wallet), {ssr: false})

function Wallet() {
    const [walletProvider, setWalletProvider] = useState<any>(null)
    const [account, setAccount] = useState<string>('')
    const [network, setNetWork] = useState<string>('')
    const [balance, setBalance] = useState<string>('')

    const [to, setTo] = useState<string>('')
    const [amount, setAmount] = useState<string>('')
    const [transferring, setTransferring] = useState<boolean>(false)

    useEffect(() => {
        if(!window.ethereum) {
            return 
        } else {
            console.log(123);
            
            setWalletProvider(new ethers.providers.Web3Provider(window.ethereum as any))
        }
    }, [])

    const connectMetamask =async () => {
        try {
            const account = await walletProvider.send('eth_requestAccounts', [])
            const network = await walletProvider.getNetwork()
            const signer = await walletProvider.getSigner()
            const balance = await walletProvider.getBalance(await signer.getAddress())
            
            console.log('%c [ account ]-23', 'font-size:13px; background:pink; color:#bf2c9f;', balance.toString())
            setAccount(account[0])
            setBalance(ethers.utils.formatEther(balance))
            setNetWork(network.name)
        } catch (error) {
            console.log(error)            

        }
    }
    const transfer =async () => {
        try {
            console.log('transfer')
            const value = ethers.utils.parseEther(amount)
            const singner = walletProvider.getSigner()

            const receipt = singner.sendTransaction({
                to,
                value
            })
            await receipt.await()
            console.log(ethers.utils.formatEther(await singner.getBalance()), 'now singner balance is' )
        } catch (error) {
            console.log(error, 'error')
        }

    }

    return (
        <div className="flex bg-gray=50 h-screen flex-col">
            <div>
                <button onClick={connectMetamask}>connect to metamask</button>
            </div>
            <div>
                <div>{account}</div>
                <div>{network}</div>
                <div>{balance}</div>
            </div>
            <div>
                <div>transfer</div>
                <div>
                    <input type="text" 
                        value={to}
                        onInput={(e: any) => setTo(e.target?.value)}
                        placeholder="address"
                    />
                    <input type="text"
                        value={amount}
                        onInput={(e: any) => setAmount(e.target.value)}
                    />
                    <button onClick={transfer}>
                        send
                    </button>
                </div>
            </div>
        </div>
    )
}