"use client"

import { Signer } from "ethers"
import { ethers } from "ethers"
import { useEffect, useState } from "react"
import contractInfo from './CoffeeSeller.json'


export default function Token() {
  const [account, setAccount] = useState('')
  const [signer, setSinger] = useState<Signer>()

  async function walletConnect() {
    if(typeof window.ethereum === 'undefined') {
      alert("consider install MetaMask")
    } else {
      const {ethereum} = window
      const accounts = await ethereum.enable()
      setAccount(accounts[0])

      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()

    }
  }


  async function getDetail() {
    try {
      const contract = new ethers.Contract(
        contractInfo.info.address,
        contractInfo.abi,
        signer
      )

      const name = await contract.getName()
      const symbol = await contract.symbol()
      const decimals = await contract.decimals()
      const totalSupply = await contract.totalSupply()
      console.log(name, symbol, decimals, totalSupply, 'token detail')

    } catch (error) {
      console.log(error)
    }

  } 

   useEffect(() => {

   }, [])



  return (
    <>
    <div>
      token
      <button onClick={walletConnect}>connect</button>
      <button onClick={getDetail}> get contract detail</button>
    </div>
    </>
  )
}