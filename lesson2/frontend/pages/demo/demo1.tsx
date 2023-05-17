import { createContext, useContext, useEffect, useState } from "react"
import { ethers } from 'ethers'
import { Button, Input, Alert } from 'antd'
import dynamic from "next/dynamic";
type IWalletCtx = {
    walletProvider: any,
    account: string,
    network: string,
    balance: string,
    setAccount: (account: string) => void,
    setBalance: (balance: string) => void,
    setNetwork: (network: string) => void,
}

const WalletCtx = createContext<IWalletCtx>({} as IWalletCtx);

function sliceAddress(address: string) {
    if (!address) return ''
    return address.slice(0, 5) + '......' + address.slice(-6)
}

function Connect() {
    const { walletProvider, setAccount, setBalance, setNetwork, account, network, balance } = useContext(WalletCtx)
    const connectToMetamask = async () => {
        try {
            const accounts = await walletProvider.send('eth_requestAccounts', [])
            const network = await walletProvider.getNetwork()
            const balance = await walletProvider.getBalance(await walletProvider.getSigner().getAddress())

            setAccount(accounts[0])
            setNetwork(network.name)
            setBalance(ethers.utils.formatEther(balance))
        } catch (error) {
            console.log(error)
        }

    }

    const disconnect = () => {
        setAccount('')
        setNetwork('')
        setBalance('')
    }
    useEffect(() => {
        console.log(account, 'account')
    }, [])
    if (!account) {
        return (
            <div className="flex justify-end">
                {
                    walletProvider ? <Button onClick={connectToMetamask}>connect</Button> : 'loading'
                }
                
            </div>
        )
    } else {
        return (
            <>
                <div className="flex justify-end items-center gap-2 m-2">
                    <span>hello: </span>
                    <span>{sliceAddress(account)}</span>
                    <Button onClick={disconnect}>disconnect</Button>
                </div>
                <div className="bg-red-100 p-2 rounded-md">
                    <div>account {account}</div>
                    <div>network {network}</div>
                    <div>balance {balance}</div>
                </div>

            </>
        )
    }

}

const Transfer = () => {

    const { walletProvider, account } = useContext(WalletCtx)
    const [to, setTo] = useState<string>('')
    const [amount, setAmount] = useState<string>('')
    // const [messageApi, contextHolder] = message.useMessage()
    const handleClick = async () => {
        if (!to || !amount) return
        try {
            console.log(to, amount, 'amount')
            const value = ethers.utils.parseEther(amount)
            const signer = walletProvider.getSigner()
            console.log(value, to)

            const tx = {
                to,
                value
            }
            const result = await signer.sendTransaction(tx)
            await result.wait()
            setTo('')
            setAmount('')
            // messageApi.success("交易成功成功")

        } catch (error) {
            console.log(error)
            // messageApi.error("交易失败")
        }
    }
    if (!account) {
        return null;
    }

    return (
        <div className="my-2 gap-2">
            <h1 className="text-lg">Tranfer</h1>
            {/* {contextHolder} */}
            <Input

                value={to}
                onInput={(e: any) => setTo(e.target.value)}
                placeholder="input address" >
            </Input>
            <Input
                className="my-2"
                value={amount}
                onInput={(e: any) => setAmount(e.target.value)}
                placeholder="amount" >
            </Input>
            <div className="flex justify-center">
                <Button size={"large"} className="w-1/2" onClick={handleClick}>send</Button>
            </div>
        </div>
    )
}


function Demo1() {
    const [walletProvider, setWalletProvider] = useState<any>(null)
    const [account, setAccount] = useState<string>('')
    const [network, setNetwork] = useState<string>('')
    const [balance, setBalance] = useState<string>('')

    useEffect(() => {
        if (!window.ethereum) {
            return
        } else {
            try {
                setWalletProvider(new ethers.providers.Web3Provider(window.ethereum as any))
            } catch (error) {
                console.log(error);

            }
        }
    }, [])

    return (
        <WalletCtx.Provider value={{
            walletProvider,
            setAccount,
            setBalance,
            setNetwork,
            account,
            network,
            balance
        }}>
            <div className="m-2">
                <Connect />
                <Transfer />
            </div>
        </WalletCtx.Provider>
    )
}

export default dynamic(() => Promise.resolve(Demo1), { ssr: false });