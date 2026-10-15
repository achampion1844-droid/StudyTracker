import { View, Text } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'
import SubjectButton from './SubjectButton'
import { studyItemsType, subjectInfoType } from '../UserInfo/userInfo'

const SubjectScrollView = ({studySubjects}: {studySubjects: subjectInfoType[]}) => {
  return (
    <ScrollView 
        horizontal 
        className='border-orange-600 border-6 h-20 ml-4 mb-4'
        showsHorizontalScrollIndicator={false}
        >
            <View className='flex-row gap-6 mr-12'>
                {studySubjects.map((subject) => (
                    <SubjectButton key={subject.id} id={subject.id} icon={subject.icon} subjectName={subject.subjectName} numSubStudyItems={subject.numSubStudyItems}/>
                ))}
            </View>
    </ScrollView>
  )
}

export default SubjectScrollView