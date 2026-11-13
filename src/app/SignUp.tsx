import { View, Text, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SignUpAPI } from '../../functions/SignIn'
import { saveTokens } from '../../UserInfo/userAuth'
import { useRouter } from 'expo-router'

const SignUp = () => {
    const [signUpName, setSignUpName] = useState<string>('Austin')
    const [signUpEmail, setSignUpEmail] = useState<string>('Austin@gmail.com')
    const [signUpPassword, setSignUpPassword] = useState<string>('sdajkfhasdklfbasdjh3124123454jk2')
    const [signUpPasswordCheck, setSignUpPasswordCheck] = useState<string>('sdajkfhasdklfbasdjh3124123454jk2')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const router = useRouter()

    async function triggerSignUp() {
        const response = await SignUpAPI(signUpName, signUpEmail, signUpPassword, signUpPasswordCheck)
        if (response['access']) {
            console.log('access', response['access'])
            console.log('refresh', response['refresh'])
            await saveTokens(response['access'], response['refresh'])
            router.navigate('/(tabs)/StudyTracker')
        } else {
            setErrorMessage(Object.values(response)[0][0])
        }
    }
  return (
    <SafeAreaView className='items-center justify-center bg-customBgBlue'>
        <View className='items-center justify-center w-full h-full '>
            <Text className='text-red-500 text-2xl'>{errorMessage}</Text>
            <Text className='text-5xl'>Sign Up 😘</Text>
            <TextInput 
                value={signUpName}
                onChangeText={setSignUpName}
                placeholder='Username'
                className='border-black border-2 w-[80%] h-14 rounded-full mt-8 pl-4'
            />
            <TextInput 
                value={signUpEmail}
                onChangeText={setSignUpEmail}
                placeholder='email'
                className='border-black border-2 w-[80%] h-14 rounded-full mt-8 pl-4'
            />
            <TextInput
                secureTextEntry={true}
                value={signUpPassword}
                onChangeText={setSignUpPassword}
                placeholder='password'
                className='border-black border-2 w-[80%] h-14 rounded-full mt-8 pl-4'
            />
            <TextInput 
                secureTextEntry={true}
                value={signUpPasswordCheck}
                onChangeText={setSignUpPasswordCheck}
                placeholder='retype password'
                className='border-black border-2 w-[80%] h-14 rounded-full mt-8 placeholder:text-black pl-4'
            />
            <Pressable onPress={triggerSignUp} className='bg-cyan-200 border-black border-2 mt-8 w-[60%] h-16 items-center justify-center rounded-full active:bg-cyan-300'>
                <Text className='text-xl'>Thank You For Signing Up 🤩</Text>
            </Pressable>
        </View>
        
    </SafeAreaView>
  )
}

export default SignUp