import axios from 'axios'
import * as SecureStore from 'expo-secure-store'


export async function SignUpAPI(username:string, email:string, password1: string, password2:string) {
    console.log('does this function run')
    try {
        console.log('hi', 'username', username, 'email', email, 'password1', password1, 'password2', password2)
        const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/api/auth/registration/`, 
            {
                "username": username,
                "email": email,
                "password1": password1,
                "password2": password2,
            }, {
                headers: {
                    "ngrok-skip-browser-warning": "true",
                }
            }
        )
        return response.data
    } catch (error) {
        console.log('dye')
        console.log('error status:', error.response?.status)
        console.log('error data:', error.response?.data)  // This is the key!
        console.log('full error:', error)
        return error.response?.data
    }
}