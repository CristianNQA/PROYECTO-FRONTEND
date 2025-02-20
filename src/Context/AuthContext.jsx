import { createContext, useEffect, useState } from "react"

//crear el contexto
export const AuthContext = createContext() 

//crear provedor de contexto, que es un componente
export const AuthContextProvider = ({children}) => {

    const [isAuthenticatedState, setisAuthenticatedState] = useState(Boolean(sessionStorage.getItem('access_token')))
    const login = (access_token) => {
        sessionStorage.setItem('access_token', access_token)
        setisAuthenticatedState(true)
    }

    useEffect(
        () => {
            const auth_token = sessionStorage.getItem('access_token')
            if(auth_token){
                setisAuthenticatedState(true)
            }
        },
        []
    )


    return(
        <AuthContext.Provider value={{isAuthenticatedState, login}}>
            {children}
        </AuthContext.Provider>
    )
}






/* export const AuthContext = createContext()
const AuthContextProvider = ({children}) => {
    let isAuthenticated = Boolean(sessionStorage.getItem('access_token'))
    const [isAuthenticatedState, setisAuthenticatedState] = useState(isAuthenticated)

    useEffect(
        () => {
            const auth_token = sessionStorage.getItem('access_token')
            if(auth_token){
                setisAuthenticatedState(true)
            }
        },
        []
    )

    return(
        <AuthContext.Provider value={{isAuthenticatedState}}>
            {children}
        </AuthContext.Provider>
    )
} */

export default AuthContextProvider