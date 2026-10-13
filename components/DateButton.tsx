import { View, Text, Pressable } from 'react-native'
import React from 'react'

const DateButton = ({id, activeID, returnId}: {id:string, activeID:string, returnId: (id:string) => void}) => {
    function buttonPressed() {
      returnId(id)
    }
    
  return (
    <View>
      <Pressable onPress={buttonPressed}>
        <View className={`${activeID===id ? 'bg-black': 'bg-white'} h-10 w-10 rounded-full justify-center items-center`}>
            <Text className={`${activeID===id ? 'text-white': 'text-black'}`}>12</Text>
        </View>
      </Pressable>
    </View>
  )
}

export default DateButton