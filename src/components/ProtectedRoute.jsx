import { useContext } from "react"
import { AuthContext } from "../Context/AuthContext.jsx"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = () => {
    const {isAuthenticatedState} = useContext(AuthContext)
    return isAuthenticatedState ? <Outlet/> : <Navigate to={'/login'}/>
}


export default ProtectedRoute