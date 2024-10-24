import { ReactNode, useState,useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

interface ProtectedProps{
    children : ReactNode,
    authentication ?: boolean
}

export default function Protected({children , authentication = true}: ProtectedProps){
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector((state: {auth: {status: string | null}}) => state.auth.status)
    useEffect(() => {
     if (authentication && authStatus === null) {
        navigate("/login")
     }else if(!authentication && authStatus !== null){
        navigate("/")
     }
     setLoader(false)
    }, [authStatus,navigate,authentication])
    
    return loader? <h1>Loading...</h1>: <>{children}</>
}