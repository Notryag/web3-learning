import { ethers } from "ethers";
import { useEffect } from "react";
const Demo1 = () => {

    const provider = ethers.getDefaultProvider();
    const main = async () => {
        const balance = await provider.getBalance(`vitalik.eth`);
        console.log(provider, 'eth balance')
        console.log(`ETH Balance of vitalik: ${ethers.utils.formatEther(balance)} ETH`);
    }

    useEffect(() => {
        main()
    }, [])

    return (
        <div>
            demo
        </div>
    )
}

export default Demo1