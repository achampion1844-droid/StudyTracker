import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NavBarLinksObjectList } from '../UserInfo/userInfo'
import { useRouter } from 'expo-router'

export default function NavBar({setVisibleNavBar, NavBar}:{setVisibleNavBar: (value:boolean) => void, NavBar:boolean}):any {
  const router = useRouter()

  const linkObjectList:NavBarLinksObjectList[] = [
    {
      name: 'Settings',
      addOnData: null
    },
    {
      name: 'Donate',
      addOnData: null
    },
    {
      name: 'History',
      addOnData: null
    }
  ]
  function NavBarLinkToNewPage(name:string) {
    console.log(name)
    if (linkObjectList.some(obj => obj.name === name)) {
      setVisibleNavBar(!NavBar)
      router.push(`/${name}`)
    }
    else {
      console.log('you need to add the routes to use this link in the NavBar')
    }
    
  }




  return (
    <SafeAreaView className='w-full mt-8'>
        {linkObjectList.map((item) => {
          return (
          <Pressable key={item.name} className='border-2 border-black h-14 w-max mb-1 flex-row bg-emerald-100/80 active:bg-emerald-200' onPress={() => NavBarLinkToNewPage(item.name)}>
            <View className='h-full w-2/6 ml-2 justify-center items-center'>
              <Text className='font-bold text-md'>{item.name}</Text>
            </View>
            <View className='h-full flex-1'>
              <Text></Text>
            </View>
          </Pressable>
          
          )
        })}
    </SafeAreaView>
  )
}