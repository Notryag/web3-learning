import { Input, Button } from 'antd'
import { ethers } from 'ethers'
import { useState } from 'react'

const WalletGenerator = () => {
    const [wallets, setWallets] = useState<ethers.Wallet[]>([])
    const [walletsCount, setWalletsCount] = useState<number>(1)
    const [loading, setLoading] = useState<boolean>(false)
    const generateWallets = () => {
        setLoading(true)
        const wallets = [] as ethers.Wallet[]
        setTimeout(async () => {
            for (let i = 0; i < walletsCount; i++) {
                const wallet = await ethers.Wallet.createRandom()
                wallets.push(wallet)
            }
            setWallets(wallets)
            setLoading(false)
            console.log(wallets, 'wallets')
        }, 200)
    }


    return (
        <div className='p-2'>
            <h1 className='text-lg'>钱包地址生成器</h1>
            <div>
                <span className='mb-2 inline-block'>生成数量</span>
                <Input
                    value={walletsCount}
                    onChange={(e: any) => setWalletsCount(Number(e.target.value))}
                ></Input>
            </div>
            <div className='flex justify-center mt-2'>
                <Button block loading={loading} onClick={generateWallets}>开始生成</Button>
            </div>

        </div>
    )
}


export default WalletGenerator