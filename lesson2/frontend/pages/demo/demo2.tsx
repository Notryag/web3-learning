import { Input, Button } from 'antd'
import { ethers } from 'ethers'
import { useState } from 'react'
import { Collapse } from 'antd';

const { Panel } = Collapse

const WalletGenerator = () => {
    const [wallets, setWallets] = useState<ethers.Wallet[]>([])
    const [walletsCount, setWalletsCount] = useState<number>(1)
    const [loading, setLoading] = useState<boolean>(false)
    const generateWallets = () => {
        if(walletsCount > 20) return alert('数量不能超过100')
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
            <div className="display-list">
                <Collapse defaultActiveKey={['1']} >
                    {wallets.map((wallet, index) => {
                        return (

                            <Panel header={`钱包${index + 1}`} key={index}>
                                <div className="item">
                                    <span className="item-title">地址</span>
                                    <Input className="item-content" value={wallet.address}></Input>
                                </div>
                                <div className="item overflow-hidden ">
                                    <span className="item-title">公钥</span>
                                    <Input className="item-content" value={wallet.publicKey}></Input>
                                </div>
                                <div className="item">
                                    <span className="item-title">私钥</span>
                                    <Input className="item-content" value={wallet.privateKey}></Input>
                                </div>
                            </Panel>
                        )
                    })}
                </Collapse>

            </div>
        </div>
    )
}


export default WalletGenerator