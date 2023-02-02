import { ethers } from 'ethers'

import { contractAbi, contractAddress } from '../utils/constants'

const { etherum } = window

const createEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(etherum)
    const signer = provider.getSigner()
    const transactionsContract = new ethers.Contract(contractAddress, contractAbi, signer)

    return transactionsContract
}

const Welcome = () => {
    return (
        <div>Welcome</div>
    )
}

export default Welcome