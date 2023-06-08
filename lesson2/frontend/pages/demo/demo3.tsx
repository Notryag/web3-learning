import dynamic from "next/dynamic"
import { useEffect } from "react"


const _ZToken = dynamic(() => Promise.resolve(ZToken), { ssr: false })

export default _ZToken

function ZToken() {

    return (
        <div className="flex">
            ztoken
        </div>
    )
}


function Detail() {

}