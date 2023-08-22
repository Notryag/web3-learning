"use client"

import { ethers } from "ethers"
import { useEffect, useState } from "react"
import cofferSeller from './CoffeeSeller.json'
export default function Coffee() {
    type Coffee = {
        address: string,
        name: string,
        message: string,
        timestamp: string
    }
    const [allCoffee, setAllCoffee] = useState<Coffee[]>([])

    const [currentAccount, setCurrentAccount] = useState()
    const [name, setName] = useState("")
    const [message, setMessage] = useState("")



    async function checkIfWalletIsConnected() {
        try {
            const { ethereum } = window

            const accounts = await ethereum.request({ method: "eth_accounts" })

            if (accounts.length !== 0) {
                setCurrentAccount(accounts[0])
                console.log("wallet is connected")
            } else {
                console.warn("make sure you hava metaMask connected")
            }

        } catch (error: any) {
            console.error("error", error.message);

        }
    }

    const connectWallet = async () => {
        try {
            const { ethereum } = window
            if (!ethereum) {
                console.warn("make sure you have metaMask connected")
                return
            }

            const accounts = await ethereum.request({ method: "eth_requestAccounts" })
            console.log('%c [ accounts ]-40', 'font-size:13px; background:pink; color:#bf2c9f;', accounts)
            setCurrentAccount(accounts[0])
        } catch (error: any) {
            console.error(error.message)
        }
    }

    const buyCoffee = async () => {
        try {
            const { ethereum } = window
            if (ethereum) {
                const provider = new ethers.BrowserProvider(ethereum)
                const signer = await provider.getSigner()


                const coffeeContract = new ethers.Contract(
                    cofferSeller.info.address,
                    cofferSeller.abi,
                    signer
                )

                const coffeeTxn = await coffeeContract.buyCoffee(
                    name || "Anonyous",
                    message || "enjoy your coffee",
                    { value: ethers.parseEther("1"), gasLimit: 400000 }
                )

                console.log("mining...")
                const res = await coffeeTxn.wait()
                    console.log(res, 'tx res')
                setName("")
                setMessage("")
                console.log("success")
            }
        } catch (error) {
            console.log(error)
        }
    }


    async function getAllCoffee() {
        try {
            const { ethereum } = window
            if (ethereum) {
                const provider = new ethers.BrowserProvider(ethereum)
                const signer = await provider.getSigner()

                const coffeeContract = new ethers.Contract(
                    cofferSeller.info.address,
                    cofferSeller.abi,
                    signer
                )
                const coffees = await coffeeContract.getCoffess()

                const finalCoffee = coffees.map((item: { timestamp: bigint; giver: any; name: any; message: any }) => {
                    return {
                        address: item.giver,
                        name: item.name,
                        message: item.message,
                        timestamp: new Date(+String(item.timestamp) * 1000).toLocaleString()
                    }
                })
                setAllCoffee(finalCoffee)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        let coffeeContract: ethers.Contract | undefined
        checkIfWalletIsConnected()
        getAllCoffee()

        const onNewCoffee = (from: string, name: string, message: string, timestamp: bigint) => {
            console.log("on new coffee")
            setAllCoffee(pre => [
                ...pre, {
                    address: from,
                    name: name,
                    message,
                    timestamp: new Date(+String(timestamp) * 1000).toLocaleString()
                }
            ])
        }

        (async () => {
            if (window.ethereum) {
                const provider = new ethers.BrowserProvider(window.ethereum)
                const signer = await provider.getSigner()
                coffeeContract = new ethers.Contract(
                    cofferSeller.info.address,
                    cofferSeller.abi,
                    signer
                    )
                    console.log('new event',signer, coffeeContract)
                coffeeContract.on("NewCoffee", onNewCoffee)
            }
        })()
        return () => {
            if (coffeeContract !== undefined) {
                coffeeContract.off("NewCoffee", onNewCoffee)
            }
        }
    }, [])


    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen py-1 bg-gray-100">
                <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                    <h1 className="text-6xl mb-6">BY ME A COFFEE</h1>
                    {
                        currentAccount ?
                            (<div className="w-full max-w-xs top-3 z-50">
                                <form className="bg-white shadow-md-rounded px-8 pt-6 pb-8 mb-4">
                                    <div className="mb-4">
                                        <label className="block text-gray-70 text-sm font-bold mb-2" htmlFor="name">Name</label>
                                        <input
                                            className="shadow appearance-none border round w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            type="text"
                                            id="name"
                                            placeholder="name"
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                        >
                                        </input>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
                                            Send the Creator a Message
                                        </label>
                                        <input
                                            className="shadow appearance-none border round w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            placeholder="send message"

                                            type="text"
                                            value={message}
                                            onChange={e => setMessage(e.target.value)}
                                        ></input>
                                    </div>
                                    <div className="flex w-full items-center justify-center">
                                        <button
                                            onClick={buyCoffee}
                                            className="bg-blue-500 w-full hover:bg-blue-700 text-center text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">

                                            Support
                                        </button>

                                    </div>
                                </form>
                            </div>)
                            : (
                                <button className="bg-blue-500 hover:bg-green-700 text-white font-bold" onClick={connectWallet}>connect to wallet</button>
                            )
                    }
                    {allCoffee.map((coffee, index) => {
                        return (
                            <div className="border-l-2 mt-10" key={index}>
                                <div className="transform transition cursor-pointer hover:-translate-y-2 ml-10 relative flex items-center px-6 py-4 bg-green-600 text-white rounded mb-10 flex-col md:flex-row space-y-4 md:space-y-0">
                                    {/* <!-- Dot Following the Left Vertical Line --> */}
                                    <div className="w-5 h-5 bg-green-600 absolute -left-10 transform -translate-x-2/4 rounded-full z-10 mt-2 md:mt-0"></div>

                                    {/* <!-- Line that connecting the box with the vertical line --> */}
                                    <div className="w-10 h-1 bg-green-300 absolute -left-10 z-0"></div>

                                    {/* <!-- Content that showing in the box --> */}
                                    <div className="flex-auto">
                                        <h1 className="text-md">Supporter: {coffee.name}</h1>
                                        <h1 className="text-md">Message: {coffee.message}</h1>
                                        <h3>Address: {coffee.address}</h3>
                                        <h1 className="text-md font-bold">
                                            TimeStamp: {coffee.timestamp.toString()}
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        );
                    })}


                </main>
            </div>
        </>
    )
}
// text-6xl 