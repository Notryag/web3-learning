"use client"

import { Signer } from "ethers"
import { ethers, Contract } from "ethers"
import { useEffect, useState } from "react"
import contractInformation from './MyToken.json'


export default function Token() {
  const [account, setAccount] = useState('')
  const [contract, setContract] = useState<Contract>()
  const [contractInfo, setContractInfo] = useState({
    name: '',
    symbol: "",
    decimals: 0,
    totalSupply: '',
    balance: ''
  })

  const [mintVal, setMintVal] = useState('')

  const [transferAddress, setTransferAddress] = useState('')
  const [transferAmount, setTransferAmount] = useState('')


  async function connectWallet() {
    if (typeof window.ethereum === 'undefined') {
      alert("consider install MetaMask")
    } else {
      const { ethereum } = window
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

      setAccount(accounts[0])

      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()

    }
  }

  async function checkIfWalletConnected() {
    try {
      const { ethereum } = window
      const accounts = ethereum.request({ method: "eth_accounts" })
      if (accounts.length) {
        const currentAC = accounts[0]
        setAccount(currentAC)
        getDetail()
      }

    } catch (error) {
      console.log(error)
    }
  }


  async function getDetail() {
    if (!account) return
    try {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()

      const contract = new ethers.Contract(
        contractInformation.info.address,
        contractInformation.abi,
        signer
      )

      const name = await contract.name()
      const symbol = await contract.symbol()
      const decimals = await contract.decimals()
      const totalSupply = await contract.totalSupply()
      const balance = await contract.balanceOf(signer.getAddress())
      console.log(name, symbol, decimals, totalSupply, balance, 'token detail')
      setContract(contract)
      setContractInfo({
        name,
        symbol,
        decimals,
        totalSupply: ethers.formatEther(totalSupply),
        balance: ethers.formatEther(balance),
      })
    } catch (error) {
      console.log(error)
    }

  }

  async function transfer() {
    if(!contract) return
    console.log(ethers.parseEther("1"))
    const tx = await contract.transfer(transferAddress, ethers.parseEther(transferAmount))
    await tx.wait()
    getDetail()
  }

  async function mint() {
    if(!contract) return
    const tx = await contract.mint(ethers.parseEther(mintVal))
    await tx.wait()
    getDetail()
  }


  useEffect(() => {
    checkIfWalletConnected()
  }, [])



  return (
    <>
      <div>
        token
        <button onClick={connectWallet}>connect</button>
        <div>
          {
            account ? account : ''
          }
        </div>
        <div>
          {contract ? (
            <>
              <div>contract info</div>
              <button onClick={getDetail}>refresh</button>
              <div>
                <span>name: {contractInfo.name}</span>
                <span>symbol: {contractInfo.symbol}</span>
                <span>decimals: {contractInfo.decimals}</span>
                <span>toatalSupply: {contractInfo.totalSupply}</span>
                <span>balance: {contractInfo.balance}</span>
                <span></span>
              </div>
              <div>
                <h1>mint</h1>
                <input type="text" value={mintVal} onChange={e => setMintVal(e.target.value)}/>
                <button onClick={mint}>mint token</button>
              </div>
              <div>
                <h1>转账</h1>
                <input type="text" value={transferAddress} onChange={e => setTransferAddress(e.target.value)} placeholder="wallet address"/>
                <input type="text" value={transferAmount} onChange={e=> setTransferAmount(e.target.value)} placeholder="token amount"/>
                <button onClick={transfer}>转账</button>
              </div>
            </>
          ) : ''}
        </div>
        <button onClick={getDetail}> get contract detail</button>
      </div>
    </>
  )
}