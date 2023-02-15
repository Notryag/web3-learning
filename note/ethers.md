# ethers

常用方法记录
```js
import { ethers } from 'ethers'

const provider = new ethers.providers.JsonRpcProvider('alchemy_url')
const metaProvider = new ethers.providers.Web3Provider(window.ethereum)

const main = async () => {
    const balance = provider.getBalance('vitalik.eth') 
    const network = provider.getNetwork()
    const blockNumber = provider.getBlockNumber()
    const gasPrise = provider.getGasPrice()
    const block = provider.getBlock(0)
    console.log(ethers.utils.formatEther(balance), network, blockNumber, gasPrise, block)
}

const contract = new ethers.Contract('addressDai', 'abi', provider)

const contractMain = () => {
    // 合约中的方法
    const name = contract.name()
    const symbol = contract.symbol()
    const totalsupply = contract.totalsupply()
    console.log(name, symbol, totalsupply)
}

const wallet = new ethers.Wallet('privatekey', provider)
// metamask wallet
const metaWallet = await metaProvider.send('eth_requestAccounts', [])

const walletMain = async () => {
    const balance = await wallet.getBalance()
    const txCount = await wallet.getTransactionCount()
    console.log(ethers.utils.formatEther(balance), txCount)
    const receipt = await wallet.sendTransaction({
        to: 'address',
        value: ethers.utils.parseEther('0.001')
    })
    await receipt.wait()
    
}
```