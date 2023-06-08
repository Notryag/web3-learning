
import {configureChains, mainnet} from 'wagmi'
import './globals.css'
import {publicProvider} from "wagmi/providers/public";
import {optimism, polygon} from "wagmi/chains";
import {alchemyProvider} from "wagmi/providers/alchemy";

// const {chains} = configureChains(
//     [mainnet, polygon],
//     [alchemyProvider({
//         apiKey: ''
//     })],
// )


export default function RootLayout(
    {
       children,
   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
