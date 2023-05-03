import { ethers } from 'ethers'
import { useState } from 'react'

export default function WalletGenerator() {
  const [startChar, setStartChar] = useState<string>('')
  const [includeChar, setIncludeChar] = useState<string>('')
  const [endChar, setEndChar] = useState<string>('')
  const [wallet, setWallet] = useState<ethers.wallet>()

  function generate() {
    let _wallet: ethers.Wallet | null = null
    console.log(_wallet, 'generate')
    const match = new RegExp(`^0x${startChar}.*${includeChar}.*${endChar}$`)
    while (true) {
      console.log('while')
      const wallet = ethers.Wallet.createRandom()
      if (match.test(wallet.address)) {
        _wallet = wallet
        break
      }
    }
    setWallet(_wallet)
  }

  return (
    <div>
      walletgenerator
      {wallet?.address ?? ''}
      <div className="warp">
        <div>
          <h2>输入开头号码</h2>
          <input type="text" value={startChar} onChange={(e) => setStartChar(e.target.value)} placeholder="请输入开头号码" />
        </div>
        <div>
          <h2>输入包含号码</h2>
          <input type="text" value={includeChar} onChange={(e) => setIncludeChar(e.target.value)} placeholder="请输入包含号码" />
        </div>

        <div>
          <h2>输入结尾号码</h2>
          <input type="text" value={endChar} onChange={(e) => setEndChar(e.target.value)} placeholder="请输入结尾号码" />
        </div>
        <div className="">
          <button onClick={generate}>开始生成</button>
        </div>
        <div className="content"></div>
      </div>
    </div>
  )
}
