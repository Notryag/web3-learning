import { useNetwork, useProvider, useSigner } from "wagmi"

export default function Token() {
    const provider = useProvider()
    const singner = useSigner()
    const network = useNetwork()

    console.log(provider, singner, network);
    

    return (
        <div>
            <div>
                token
            </div>
        </div>
    )
}