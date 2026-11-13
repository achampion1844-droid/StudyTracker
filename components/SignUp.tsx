import { View, Text, TextInput, Pressable } from 'react-native'
import React from 'react'

const SignUpModal = ({
        loginErrorMessage, 
        setLoginUsername, 
        loginUsername, 
        setLoginEmail, 
        loginEmail, 
        setLoginPassword, 
        loginPassword, 
        SignUp,
        LogIn,
    }: {
        loginErrorMessage:String, 
        setLoginUsername:React.Dispatch<React.SetStateAction<string>>, 
        loginUsername:string, 
        setLoginEmail:React.Dispatch<React.SetStateAction<string>>, 
        loginEmail:string, 
        setLoginPassword:React.Dispatch<React.SetStateAction<string>>, 
        loginPassword:string, SignUp: () => void
        LogIn: () => void
    }) => {
    return (
        <View className='w-full h-full bg-customBgBlue justify-center items-center'>
            <Text className='text-2xl text-red-500'>{loginErrorMessage}</Text>
            <Text className='text-4xl'>LOG IN</Text>
            <TextInput
                className='border-black border-2 w-[90%] h-14 pl-4 text-xl pb-1 bg-transparent rounded-full mt-8 placeholder:text-black'
                onChangeText={setLoginUsername}
                value={loginUsername}
                placeholder='Username'
            />
            <TextInput 
                className='border-black border-2 w-[90%] h-14 pl-4 text-xl pb-1 bg-transparent rounded-full mt-8 placeholder:text-black'
                onChangeText={setLoginEmail}
                value={loginEmail}
                placeholder='Email'
            />
            <TextInput 
                className='border-black border-2 w-[90%] h-14 pl-4 text-xl pb-1 bg-transparent rounded-full mt-8 placeholder:text-black'
                onChangeText={setLoginPassword}
                value={loginPassword}
                placeholder='Password'
            />
            <Pressable className='w-[90%] h-14 mt-8 border-black border-2 justify-center items-center rounded-full active:bg-blue-100' onPress={LogIn}>
                <Text className='text-4xl'>
                    Log In
                </Text>
            </Pressable>

            <Pressable onPress={SignUp} className='w-[40%] h-14 mt-4 justify-center items-center rounded-full active:bg-blue-100'>
                    <Text className='text-xl text-blue-700'>Sign Up?</Text>
            </Pressable>
        </View>
  )
}

export default SignUpModal