import { ethers } from "./ethres.js";
import { contractAddress, walletPrivateKey, alchemyKey } from './local.js'
import dbgjson from './SimpleToken.js'

const abi = dbgjson.abi
const provider = new ethers.providers.JsonRpcProvider(`https://eth-goerli.g.alchemy.com/v2/${alchemyKey}`)

const wallet = new ethers.Wallet(walletPrivateKey, provider)

// 声明可写合约
const contractWETH = new ethers.Contract(contractAddress, abi, wallet)

const main = async () => {
    const address = await wallet.getAddress()
    console.log('%c [ address ]-18', 'font-size:13px; background:pink; color:#bf2c9f;', address)
    const balance = await wallet.getBalance()
    console.log('余额', ethers.utils.formatEther(balance), balance)

    // const tx = await contractWETH.mint(1)
    // // 等待交易上链
    // await tx.wait()
    console.log(`交易详情：`)
}


main()
