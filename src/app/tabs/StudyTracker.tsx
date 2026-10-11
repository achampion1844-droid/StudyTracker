import { View, Text, ScrollView, Button, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getUserData } from '../../../UserInfo/userInfo'

const studyTracker = () => {
    const userData = getUserData()
    const date = new Date()
    const formattedDate: string = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
        });

    function changeDate() {
        console.log('what date do you want to track?')
    }




  return (
    <SafeAreaView className='border-4 border-blue-700 h-full'>
        <ScrollView className='border-4 border-red-700 bg-customBgBlue pl-4'>
            <View className=' h-40 items-start justify-center gap-4 mt-2'>
                <Text className='text-md text-stone-800'>Workspace</Text>
                <Text className='text-4xl font-semibold'>Today's Study Items</Text>
                <Pressable className='px-2 py-3 rounded-2xl bg-customButtonBlue hover:bg-customButtonHoverBlue active:bg-customButtonActiveBlue' onPress={changeDate}>
                    <Text className='text-stone-100 font-bold'>Date: {formattedDate} ⏷</Text>
                </Pressable>
            </View>
        </ScrollView>
    </SafeAreaView>
    
  )
}

export default studyTracker