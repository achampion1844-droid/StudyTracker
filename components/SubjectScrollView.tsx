import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import SubjectButton from './SubjectButton'
import { studyItemsType, subjectInfoType, Subjects } from '../UserInfo/userInfo'

const SubjectScrollView = ({studySubjects, filterBySubject}: {studySubjects: subjectInfoType[], filterBySubject: (subjectName:Subjects) => void}) => {
  const [isActive, setIsActive] = useState('')
  return (
    <ScrollView 
        horizontal 
        className='h-20 ml-4 mb-4'
        showsHorizontalScrollIndicator={false}
        >
            <View className='flex-row gap-6 mr-12'>
                {studySubjects.map((subject) => (
                    <SubjectButton isActive={isActive} setIsActive={setIsActive} key={subject.id} id={subject.id} icon={subject.icon} subjectName={subject.subjectName} numSubStudyItems={subject.numSubStudyItems} filterBySubject={filterBySubject}/>
                ))}
            </View>
    </ScrollView>
  )
}

export default SubjectScrollView