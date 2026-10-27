import { View, Text, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from './Icon'
import { subjectInfoType } from '../UserInfo/userInfo'

type SubjectButtonProp = subjectInfoType & {
    filterBySubject: (subjectName:string | null) => void
    isActive: string
    setIsActive: React.Dispatch<React.SetStateAction<string>>
}
const SubjectButton = ({isActive, setIsActive, icon, subjectName, numSubStudyItems, id, filterBySubject} : SubjectButtonProp) => {
    const isPressed = isActive === id
    // console.log('Active:', isActive, typeof isActive)
    // console.log('ID:', id, typeof id)
    const THEME = {
        icon: {
            size: 38
        }
    }

    function subjectIsPressed() {
        if (isActive == id) {
            setIsActive('')
            filterBySubject(null)
        } else {
            setIsActive(id)
            filterBySubject(subjectName) 
        }
        
    }

  return (
    <View>
        <Pressable onPress={subjectIsPressed}>
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