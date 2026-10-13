import { View, Text, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'
import Icon from './Icon'
import { subjectInfoType } from '../UserInfo/userInfo'
const SubjectButton = ({icon, subjectName, numSubStudyItems, id} : subjectInfoType) => {
    const [isPressed, setIsPressed] = useState(false)

    const THEME = {
        icon: {
            size: 38
        }
    }

  return (
    <View>
        <Pressable onPress={() => setIsPressed(!isPressed)}>
            <View className={`${isPressed ? 'bg-customStudyButton ' : 'bg-white'} h-20 w-48 rounded-2xl flex-row`}>
                <View className='h-20 w-12 justify-center items-center'>
                    <Icon source={icon} style={THEME.icon.size}/>
                </View>
                <View className='w-36 items-center justify-center'>
                    <Text className={`${isPressed ? 'text-white' : 'text-gray-900'} font-bold text-lg`}>{subjectName}</Text>
                    <Text className={`${isPressed ? 'text-white' : 'text-gray-900'} font-extralight text-xs pt-1`}>{numSubStudyItems} Study Items Today</Text>
                </View>
                
            </View>
        </Pressable>
    </View>
  )
}

export default SubjectButton