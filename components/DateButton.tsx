import { View, Text, Pressable } from 'react-native'
import React from 'react'

const DateButton = ({date, id, activeID, setActiveId, filterByDate}: {date:number, id:string, activeID:string, setActiveId: (id: string) => void, filterByDate: (id: string) => void}) => {

  function dateButtonPress() {
    setActiveId(id)
    filterByDate(id)
  }
    
  return (
      <Pressable onPress={dateButtonPress}>
        <View className={`${activeID===id ? 'bg-black': 'bg-white'} h-10 w-10 rounded-full justify-center items-center border-black border-2`}>
          <Text className={`${activeID===id ? 'text-white': 'text-black'}`}>{date}</Text>
        </View>
      </Pressable>
  )
}

export default DateButton