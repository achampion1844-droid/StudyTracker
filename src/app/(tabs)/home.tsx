import { View, Text, Pressable, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from '../../../components/Icon'
import { getUserMessagePageSummaryInfo, userMessageSummaryType } from '../../../UserInfo/userMessage'

const home = () => {
  const THEME = {icon: {size: 55}}
  const [messageSummaryData, setMessageSummaryData] = useState<userMessageSummaryType[]>([])

  useEffect(() => {
    setMessageSummaryData(getUserMessagePageSummaryInfo())
  },[])

  function loadMessageHistory() {
    console.log('loading Message history')
  }
  function searchMessages() {
    console.log('searching messages')
  }

  return (
    <SafeAreaView className='h-full w-full items-center'>

    
      <View className=' h-28 w-[95%] flex-row justify-between items-center'>
        <Text className='text-5xl pt-2'>Messages 💬</Text>
        <Pressable onPress={searchMessages} className='h-24 w-24 pr-4 items-center justify-center'>
          <Text className='text-6xl pt-3 pl-3'>🔍</Text>
        </Pressable>
        
      </View>

      <FlatList 
        className='h-full'
        data={messageSummaryData}
        keyExtractor={item => item.id}
        renderItem={({item}: {item:userMessageSummaryType}) => 
          <Pressable className='rounded-3xl flex-col h-28 w-screen self-center items-center justify-center' onPress={() => loadMessageHistory()}>
            <View className='w-full flex-row mb-3 flex-1 h-28'>
                  <View className='justify-center items-center w-20 pl-2'>
                      <Icon source={require('../../../assets/icons/BookIcon.jpg')} style={THEME.icon.size}/>
                  </View>
                  <View className='flex-grow pr-3 pl-2'>
                      <View className='flex-row items-top justify-between h-10 items-start'>
                        <View className='flex-1 mr-2 h-full justify-end'>
                          <Text className='font-bold text-lg h-full pt-4' numberOfLines={1} ellipsizeMode='tail'>{item.username}</Text>
                        </View>
                        <Text className='text-sm flex-2 pr-2 pt-5'>{item.timeSinceLastMessage}</Text>
                      </View>
                      
                      <View className=' w-[340px] flex-1 justify-center'>
                        <Text className='font-normal text-md leading-6' numberOfLines={2} ellipsizeMode='tail'>{item.lastMessage}</Text>
                      </View>
                      
                  </View> 
            </View>
            <View className='flex-row-reverse w-full'>
              <View className='h-2 w-[77%] border-b-2 border-gray-400 mr-5'></View>
            </View>
          </Pressable>
        }
      
      /> 
    </SafeAreaView>
  )
}

export default home