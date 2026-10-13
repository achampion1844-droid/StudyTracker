import { View, Text, ScrollView, Button, Pressable, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getUserData, getUserStudyItems } from '../../../UserInfo/userInfo'
import ToggleButton from '../../../components/Button'
import Icon from '../../../components/Icon'

const studyTracker = () => {
    const userData = getUserData()
    const studyItems = getUserStudyItems()
    const date = new Date()
    const formattedDate: string = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
        });

    const THEME = {
        icon: {
            size: 50
        }
    }

    
    function changeDate() {
        console.log('what date do you want to track?')
    }

    function press() {
        console.log('hi')
    }




  return (
    <SafeAreaView className='border-4 border-blue-700 h-full bg-customBgBlue'>
        <FlatList
            ListHeaderComponent={() => (
                <View className='h-40 items-start justify-center gap-4 mt-2 pl-4 mb-8'>
                    <Text className='text-md text-stone-800'>Workspace</Text>
                    <Text className='text-4xl font-semibold'>Today's Study Items</Text>
                    <Pressable className='px-2 py-3 rounded-2xl bg-customButtonBlue hover:bg-customButtonHoverBlue active:bg-customButtonActiveBlue' onPress={changeDate}>
                        <Text className='text-stone-100 font-bold'>Date: {formattedDate} ⏷</Text>
                    </Pressable>
                </View>
            )}
            data={studyItems}
            contentContainerStyle={{
                paddingVertical: 8,
            }}
            ItemSeparatorComponent={() => <View className='h-4' />}
            renderItem={({item}) => {
                return (
                    <View className='border-2 border-black rounded-3xl h-28 flex-row mx-2 px-2'>
                        <View className='justify-center items-center w-20'>
                            <Icon source={item.icon} style={THEME.icon.size}/>
                        </View>
                        <View className='flex-grow pl-3 pt-3'>
                            <View className='self-start'>
                                <Text className='bg-blue-400 w-fit py-1 px-2 rounded-xl text-stone-100'>{item.remainingStudySessions} Days Left!</Text>
                            </View>
                            <Text className='pt-2 font-bold text-base'>{item.assignmentName}</Text>
                            <Text className='pt-2 font-normal text-sm flex-1 line-clamp-1 w-60'>{item.assignmentDescription}</Text>
                        </View>
                        <View className='w-16 items-center justify-center'>
                            <ToggleButton />
                        </View>
                    </View>
                )
            }}
            keyExtractor={item => item.assignmentID.toString()}
            scrollEnabled={true}
            nestedScrollEnabled={true}
        />
    </SafeAreaView>
    
  )
}

export default studyTracker