import { View, Text, Pressable } from 'react-native'
import React from 'react'

const StudyHeader = () => {

    const date = new Date()
    const formattedDate: string = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
        });

    function changeDate() {
        console.log('this will change the date')
    }
  return (
    <View className='items-start justify-center gap-4 mt-2 ml-4 mb-8'>
        <Text className='text-md text-stone-800'>Workspace</Text>
        <Text className='text-4xl font-semibold'>Today's Study Items</Text>
        <View className='flex-row items-center w-full justify-between'>
            <Pressable className='px-2 py-3 rounded-2xl bg-customButtonBlue hover:bg-customButtonHoverBlue active:bg-customButtonActiveBlue' onPress={changeDate}>
                <Text className='text-stone-100 font-bold'>Date: {formattedDate} ⏷</Text>
            </Pressable>
            <Pressable
                className='mr-6 bg-customButtonBlue w-14 h-14 rounded-full items-center justify-center hover:bg-customButtonHoverBlue active:bg-customButtonActiveBlue'
            >
                <Text className='text-gray-100 font-bold text-4xl'>+</Text>
            </Pressable>
        </View>
        
    </View>
  )
}

export default StudyHeader