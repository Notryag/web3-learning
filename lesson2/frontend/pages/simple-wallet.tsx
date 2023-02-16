import { ethers } from "ethers";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

export default dynamic(() => Promise.resolve(Wallet), { ssr: false })

function Wallet() {
    const [walletProvider, setWalletProvider] = useState<any>(null)
    const [account, setAccount] = useState<string>('')
    const [network, setNetWork] = useState<string>('')
    const [balance, setBalance] = useState<string>('')

    const [to, setTo] = useState<string>('')
    const [amount, setAmount] = useState<string>('')
    const [transferring, setTransferring] = useState<boolean>(false)

    useEffect(() => {
        if (!window.ethereum) {
            return
        } else {
            setWalletProvider(new ethers.providers.Web3Provider(window.ethereum as any))
        }
    }, [])

    const connectMetamask = async () => {
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
    const transfer = async () => {
        try {
            console.log('transfer')
            const value = ethers.utils.parseEther(amount)
            const singner = walletProvider.getSigner()

            const receipt = singner.sendTransaction({
                to,
                value
            })
            await receipt.await()
            console.log(ethers.utils.formatEther(await singner.getBalance()), 'now singner balance is')
        } catch (error) {
            console.log(error, 'error')
        }
    }

    function sliceAddress(address: string) {
        if (!address) return ''
        return address.slice(0, 5) + '......' + address.slice(-6)
    }

    return (
        <div className="flex bg-gray=50 h-screen flex-col py-5 px-10">
            <div className=" flex py-5 flex-col">
                <div className="flex justify-end">
                    <button
                        className="h-10 px-6 font-semibold rounded-lg bg-black text-white "
                        onClick={connectMetamask}>connect to metamask</button>
                </div>
                {
                    account ? (<div className=" mt-3 px-3 py-5 bg-green-50 w-full">
                        <div>
                            <span>Hello,</span>
                            {sliceAddress(account)}</div>
                        <div>{network}</div>
                        <div>{balance}</div>
                    </div>) : <span></span>
                }

            </div>

            <div>
                <h1 className="text-2xl mb-3">transfer</h1>
                <div className="flex flex-col space-y-2">
                    <input
                        className="mr-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none  text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm"
                        type="text"
                        value={to}
                        onInput={(e: any) => setTo(e.target?.value)}
                        placeholder="address"
                    />
                    <input type="text"
                        className="mr-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none  text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm"
                        placeholder="amoun"
                        value={amount}
                        onInput={(e: any) => setAmount(e.target.value)}
                    />
                    <button
                        className="rounded-[12px] bg-black text-white h-10 px-6 !mt-6"
                        onClick={transfer}>
                        send
                    </button>
                </div>
            </div>
        </div>
    )
}