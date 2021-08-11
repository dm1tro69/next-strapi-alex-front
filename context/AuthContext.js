import React, {createContext, useEffect, useState} from 'react';
import {useRouter} from "next/router";
import { Magic } from 'magic-sdk';
import {MAGIC_PUBLIC_KEY} from "../utils/urls";

const AuthContext = createContext(null)

let magic

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)

    const router = useRouter()

    const loginUser = async (email) => {
        try {
            await magic.auth.loginWithMagicLink({email})
            setUser({email})
            router.push('/')
        }catch (e) {
            setUser(null)
        }

    }
    const logoutUser = async (email) => {
        try {
            await magic.user.logout()
            setUser(null)
            router.push('/')
        }catch (e) {
            
        }
    }

    const checkUserLoggedIn = async () => {
        try {
            const isLoggedIn = await magic.user.isLoggedIn()
            if (isLoggedIn){
                const {email} = await magic.user.getMetadata()
                setUser({email})
            }
            
        }catch (e) {
            
        }
    }

    const getToken = async () => {
        try {
            const token = await magic.user.getIdToken()
            return token
        }catch (e) {
            
        }
    }

    useEffect(() => {
        magic = new Magic(MAGIC_PUBLIC_KEY)
        checkUserLoggedIn()
    }, [])

    return (
        <AuthContext.Provider value={{user, loginUser, logoutUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext

