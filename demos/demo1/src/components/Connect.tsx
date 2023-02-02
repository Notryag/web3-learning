import { ethers } from 'ethers'
import ABIST from '../constant/SimpleToken.js'
import { contractAddress, walletPrivateKey, alchemyKey } from './local.js'

const Connect = () => {
    let provider
    const connectMetaMask = async () => {
        await window.ethereum.enable()
        provider = new ethers.providers.Web3Provider(window.ethereum)
        console.log(provider)

        // await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner()
        
        const balance = await signer.getBalance()
        console.log('balance', ethers.utils.formatEther(balance));
    }


    const getBalance = async  () => {
        await connectMetaMask()
        console.log(contractAddress, ABIST.abi, provider)
        
        const contract = new ethers.Contract(contractAddress, ABIST.abi, provider)
        const name = await contract.name()
        console.log('%c [ name ]-24', 'font-size:13px; background:pink; color:#bf2c9f;', name)

        const symbol = await contract.symbol()
        console.log('%c [ balance ]-29', 'font-size:13px; background:pink; color:#bf2c9f;', symbol)

        const totalSupply = await contract.totalSupply()
        console.log('%c [ totalSupply ]-29', 'font-size:13px; background:pink; color:#bf2c9f;', totalSupply.toString())

        const balanceOf = await contract.balanceOf('0x07fdf7de0D6F80b680D371F05c30eB2710BB4c2E')
        console.log('%c [ balanceOf ]-29', 'font-size:13px; background:pink; color:#bf2c9f;', balanceOf.toString())

    }

    return (
        <div className="connect-component">
            <button onClick={connectMetaMask}>connect</button>
            <button onClick={getBalance}>balanceof</button>
        </div>
    )
}

export default Connect