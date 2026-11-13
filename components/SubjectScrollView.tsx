import { View, Text, Pressable } from 'react-native'
import React, { DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_KEY_TYPES, useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import SubjectButton from './SubjectButton'
import { studyItemsType, subjectInfoType} from '../UserInfo/userInfo'

const SubjectScrollView = ({studySubjects, filterBySubject, isVisible, setIsVisible, studyItems}: {studySubjects: subjectInfoType[], filterBySubject: (subjectName:string | null) => void, isVisible: boolean, setIsVisible: (bool:boolean) => void, studyItems:studyItemsType[]}) => {
  const [isActive, setIsActive] = useState('')
  function addNewSubject() {
    setIsVisible(true)
  }
  function countNumStudyItemsForSubject(name:string):number {
    return studyItems.filter(item => item.subject === name).length
  }

  return (
    <>
    <ScrollView 
      horizontal 
      className='h-20 ml-4 mb-4'
      showsHorizontalScrollIndicator={false}
    >
      <View className='flex-row gap-6 mr-12'>
        {studySubjects.map((subject) => (
          <SubjectButton 
            isActive={isActive} 
            setIsActive={setIsActive} 
            key={subject.id} 
            id={subject.id} 
            icon={subject.icon} 
            subjectName={subject.subjectName} 
            numSubStudyItems={countNumStudyItemsForSubject(subject.subjectName)} //subject.numSubStudyItems
            filterBySubject={filterBySubject}
          />
        ))}
        <View className='h-20 w-44 rounded-2xl bg-white items-center justify-center'>
          <Pressable 
            className='h-full w-full justify-center items-center'
            onPress={addNewSubject}
          >
            <View className='items-center justify-center h-14 w-14  rounded-full'>
              <Text className='text-black text-6xl'>+</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </ScrollView>
    </>
  )
}

export default SubjectScrollView