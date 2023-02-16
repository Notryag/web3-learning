import {
    Box,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Button,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Input
} from "@chakra-ui/react";
import { useState } from "react";
import { ethers } from 'ethers'


export default function WalletGenerator() {
    const [walletNum, setWalletNum] = useState<number>(1)
    const [wallets, setWallets] = useState<ethers.Wallet[]>([])
    const [loading, setLoading] = useState<boolean>(false)


    const generateWallet = () => {
        setLoading(true)
        setTimeout(() => {
            const wallets: ethers.Wallet[] = []
            for (let i = 0; i < walletNum; i++) {
                let wallet = ethers.Wallet.createRandom()
                wallets.push(wallet)
            }
            setWallets(wallets)
            console.log(wallets, 'wallets')
            setLoading(false)
        }, 100)

    }

    return (
        <div>
            <div>
                <h1>钱包地址生成器</h1>
                <div>生成数量</div>
                <div>
                    一次最多生成 100 个钱包地址，如果生成过多会导致浏览器卡死。
                </div>
                <div>
                    <NumberInput
                        onChange={(val) => setWalletNum(+val)}
                        value={walletNum}
                        defaultValue={1} min={1} max={100}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </div>
                <div className="flex">
                    <Button
                        w={100}
                        className="mt-5 text-white flex-1"
                        bgColor="blue.300"
                        isLoading={loading}
                        loadingText='生成中'
                        onClick={generateWallet}>生成钱包</Button>
                </div>
                <div className="mt-5">
                    <Accordion>
                        {
                            wallets.map(wallet => {
                                return (
                                    <AccordionItem>
                                        <h2>
                                            <AccordionButton>
                                                <Box as="span" flex='1' fontWeight={700} textAlign='left'>
                                                    {wallet.address}
                                                </Box>
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </h2>
                                        <AccordionPanel pb={4}>
                                            <div className="flex ">
                                                <div className="mx-5 text-lg align-middle self-center">地址</div>
                                                <Input className="flex-1" readOnly value={wallet.address}></Input>
                                            </div>
                                            <div className="flex ">
                                                <div className="mx-5 text-lg align-middle self-center">私钥</div>
                                                <Input className="flex-1" readOnly value={wallet.privateKey}></Input>
                                            </div>
                                            <div className="flex ">
                                                <div className="mx-5 text-lg align-middle self-center">助记词</div>
                                                <Input className="flex-1" readOnly value={wallet.mnemonic.phrase}></Input>
                                            </div>

                                        </AccordionPanel>
                                    </AccordionItem>
                                )
                            })
                        }


                    </Accordion>
                </div>
            </div>
        </div>
    )
}