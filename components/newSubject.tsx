import { View, Text, Pressable, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'

const AddableNewSubject = ({isVisible, setIsVisible, setNewSubjectName, newSubjectName, newSubjectSubmitButtonPressed}:{isVisible:boolean, setIsVisible:(isVisible:boolean)=>void, setNewSubjectName:React.Dispatch<React.SetStateAction<string>>, newSubjectName:string, newSubjectSubmitButtonPressed:() => void}) => {
  return (
    <View className='w-full justify-center h-2/5 md:w-40'>
        <View className='justify-center items-end mx-4'>
            <TouchableOpacity 
                className='border-2 border-black h-12 w-12 justify-center items-center rounded-full'
                onPress={() => setIsVisible(!isVisible)}>
                <Text className='font-bold text-xl'>X</Text>
            </TouchableOpacity>
        </View>
        
        <View className='mt-6 items-center mx-4'>
            <TextInput 
                onChangeText={setNewSubjectName}
                value={newSubjectName}
                className='border-2 border-black h-16 text-2xl w-full placeholder:text-gray-600 mx-4'
                placeholder='New Subject Name'
            />
            <Pressable 
                className='bg-customButtonBlue w-full mx-4 h-12 rounded-lg mt-2 flex justify-center items-center active:bg-customButtonActiveBlue'
                onPress={newSubjectSubmitButtonPressed}
                >
                <Text className='text-gray-50 text-2xl pl-2'>Submit</Text>
            </Pressable>
        </View>
    </View>
  )
}

export default AddableNewSubject