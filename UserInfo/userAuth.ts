import { ImageSourcePropType } from "react-native"
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import { TokenPackageType } from "./userInfo"






export async function saveTokens(accessToken: string, refreshToken: string): Promise<boolean> {
    try {
        await SecureStore.setItemAsync('accessToken', accessToken)
        await SecureStore.setItemAsync('refreshToken', refreshToken)
        // console.log('Sucessful')
        return true
    } catch (error) {
        console.error("Could not save tokens to Keychain:", error)
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










export async function validateToken(accessToken: string | null):Promise<boolean> {
    if (!accessToken) {
        return false
    }
    // console.log('accessToken', accessToken)
    // console.log('validatingToken')
    try {
        const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/api/auth/token/verify/`, 
                {
                    'token': accessToken
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            )
            // console.log(response.data)
            if (Object.keys(response.data).length === 0) {
                // console.log('returning true')
                return true
            }
            return false
    } catch(error) {
        console.log('error not a valid token', error)
        return false
    }
}







export async function refreshingToken(refreshToken: string | null):Promise<boolean | string> {
    if (!refreshToken) {
        return false
    }
    try {
        const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/api/auth/token/refresh/`, 
                {
                    'refresh': refreshToken
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${refreshToken}`
                    }
                }
            )
            if (response.data) {
                await saveTokens(response.data['access'], response.data['refresh'])
                return response.data['access'], response.data['refresh']
            }
            return false
    } catch (error) {
        console.log('error refresh token not working', error)
        return false
    }
}




export async function getAccessToken(): Promise<string | false> {
    try {
        let accessToken:string | null = await SecureStore.getItemAsync('accessToken')
        const refreshToken:string | null = await SecureStore.getItemAsync('refreshToken')
        const isValidToken:boolean = await validateToken(accessToken)
        // console.log(isValidToken)
        if (isValidToken) {
            // console.log('returning correct accesstoken')
            return String(accessToken)
        //This whole else block is completly untested right now
        // figure out why there was an error when the server was started in the morning
        } else {
            // console.log('heading to use refresh token')
            if (refreshToken) {
                // console.log('else block')
                const newAccessToken = await refreshingToken(refreshToken)
                // console.log('new Access Token' , newAccessToken)
                if (typeof(newAccessToken) !== 'boolean') {
                    // console.log('returning new access Token')
                    return newAccessToken
                }
            }
            
        }
    } catch (error) {
        console.log('error at getAccessToken')
        return false
    }
    return false
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
        saveTokens(response.data['access'], response.data['refresh'])
        return {'accessToken':response.data['access'], 'refreshToken': response.data['refresh']}
    } catch(error){
        console.log(error)
        return error
    }
}