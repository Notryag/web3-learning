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
    balance: 0
  })

  const [transferAddress, setTransferAddress] = useState('')
  const [transferAmount, setTransferAmount] = useState(0)


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
      console.log(name, symbol, decimals, totalSupply, 'token detail')
      setContract(contract)
      setContractInfo({
        name,
        symbol,
        decimals,
        totalSupply: totalSupply.toString(),
        balance
      })
    } catch (error) {
      console.log(error)
    }

  }

  async function transfer() {
    if(!contract) return
    console.log(ethers.parseEther("1"))
    const tx = await contract.transfer(transferAddress, ethers.parseEther("1"))
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
              <div>
                <span>name: {contractInfo.name}</span>
                <span>symbol: {contractInfo.symbol}</span>
                <span>decimals: {contractInfo.decimals}</span>
                <span>toatalSupply: {contractInfo.totalSupply}</span>
                <span></span>
              </div>
              <div>
                <h1>转账</h1>
                <input type="text" value={transferAddress} onChange={e => setTransferAddress(e.target.value)} placeholder="wallet address"/>
                <input type="text" value={transferAmount} onChange={e=> setTransferAmount(Number(e.target.value))} placeholder="token amount"/>
                <button onClick={transfer}>转账</button>
              </div>
              <div>
                <h1>授权</h1>
                <input type="text" />
                <input type="text" />
                <button>授权</button>
              </div>
              <div>
                <h1>查询代币授权余额</h1>
                <input type="text" placeholder="请输入授权人地址" />
                <input type="text" placeholder="请输入被授权人地址" />
                <button>查询</button>
              </div>
              <div>
                <h1>通过授权账户进行转账</h1>
                <input type="text" placeholder="输入已被授权的地址" />
                <input type="text" placeholder="输入要转账的地址" />
                <input type="text" placeholder="请输入要授权的代币数量" />
              </div>

            </>
          ) : ''}
        </div>
        <button onClick={getDetail}> get contract detail</button>
      </div>
    </>
  )
}