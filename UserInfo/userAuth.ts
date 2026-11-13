import { ImageSourcePropType } from "react-native"
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import { TokenPackageType } from "./userInfo"




const TOKEN_OPTIONS = {
    keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
}

export async function saveTokens(accessToken: string, refreshToken: string): Promise<boolean> {
    try {
        await SecureStore.setItemAsync('accessToken', accessToken, TOKEN_OPTIONS)
        await SecureStore.setItemAsync('refreshToken', refreshToken, TOKEN_OPTIONS)
        return true
    } catch (error) {
        console.error("Could not save tokens to secure storage:", error)
        await SecureStore.deleteItemAsync('accessToken')
        await SecureStore.deleteItemAsync('refreshToken')
        return false
    }
}








export async function getToken():Promise<TokenPackageType | {} | null> {
    try {
        const accessToken = await SecureStore.getItemAsync('accessToken')
        const refreshToken = await SecureStore.getItemAsync('refreshToken')
        let tokenPackage:TokenPackageType | {} = {}
        if (accessToken && refreshToken) {
            tokenPackage = {
                'accessToken': accessToken,
                'refreshToken': refreshToken,
            }
            return tokenPackage
        }
        return null
    }catch (error) {
        console.error('Could not access Keychain:', error)
        return null
    }
}













export async function removeTokens(): Promise<boolean> {
    try {
        await SecureStore.deleteItemAsync('accessToken')
        await SecureStore.deleteItemAsync('refreshToken')
        return true
    } catch (error) {
        console.error('Could not wipe tokens: ', error)
        return false
    }
}





const api = axios.create({
    baseURL: `${process.env.EXPO_PUBLIC_API_URL}`,
    timeout: 10000,
    headers: {'Content-Type': 'application/json'},
})

export async function validateToken(accessToken: string | null):Promise<boolean> {
    if (!accessToken) return false
    try {
        const response = await api.post(
            `/api/auth/token/verify/`, 
            {'token': accessToken},
        )
        if (Object.keys(response.data).length === 0) return true
        return false
    } catch(error) {
        const status = axios.isAxiosError(error) ? error.response?.status : 'no response'
        console.log('Token validation failed, status:', status)
        return false
    }
}







export async function refreshingToken(refreshToken: string | null):Promise<string | false> {
    if (!refreshToken) return false
    try {
        const {data} = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/api/auth/token/refresh/`, 
            {'refresh': refreshToken}, 
            {headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${refreshToken}`}}
        )
        if (!data.access) return false
        const saved = await saveTokens(data['access'], data['refresh'] ?? refreshToken) 
        return saved ? data.access : false
    } catch (error) {
        console.log('error refresh token not working', error.response?.status)
        return false
    }
}




export async function getAccessToken(): Promise<string | false> {
    try {
        const accessToken = await SecureStore.getItemAsync('accessToken')
        if (accessToken && (await validateToken(accessToken))) {
            return String(accessToken)
        }

        const refreshToken = await SecureStore.getItemAsync('refreshToken')
        if (!refreshToken) return false
        
        const newAccessToken = await refreshingToken(refreshToken)
        if (typeof(newAccessToken) !== 'string') {
            await SecureStore.deleteItemAsync('accessToken')
            await SecureStore.deleteItemAsync('refreshToken')
            return false
        }

        return newAccessToken

    } catch (error) {
        console.log('error at getAccessToken')
        await SecureStore.deleteItemAsync('accessToken')
        await SecureStore.deleteItemAsync('refreshToken')
        return false
    }
}



export async function getUserAcessOrRefreshToken(username:string, email:string, password:string) {
    try {
        const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/api/auth/login/`,
            {
                "username": username,
                "email": email,
                "password": password,
            },{
                headers: {
                    'Content-Type': 'application/json',
            }
        })
        await saveTokens(response.data['access'], response.data['refresh'])
        return {'accessToken':response.data['access'], 'refreshToken': response.data['refresh']}
    } catch(error){
        console.log('Login failed. Please check your details at getUserAcessOrRefreshTokens')
        return false
    }
}