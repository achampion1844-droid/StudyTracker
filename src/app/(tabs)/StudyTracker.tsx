import { View, Text, ScrollView, Button, Pressable, FlatList, Image, TouchableOpacity, InteractionManager, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { dateObjType, getDateObj, getSubjectInfo, getUserData, getUserStudyItems, subjectInfoType, Subjects } from '../../../UserInfo/userInfo'
import ToggleButton from '../../../components/Button'
import Icon from '../../../components/Icon'
import SubjectButton from '../../../components/SubjectButton'
import DateButton from '../../../components/DateButton'
import SubjectScrollView from '../../../components/SubjectScrollView'
import StudyHeader from '../../../components/StudyHeader'

const studyTracker = () => {
    const [userData, setUserData] = useState(() => getUserData())
    const [originalStudyData, setOriginalStudyData] = useState(() => getUserStudyItems())
    const [studyItems, setStudyItems] = useState(() => getUserStudyItems())
    const [studySubjects, setStudySubjects] = useState(() => getSubjectInfo())
    const [dateTimes, setDateTimes] = useState(() => getDateObj())
    const dateListRef = useRef(null)
    const CENTERED_INDEX = 5
    const date = new Date()
    const formattedMonth: string = date.toLocaleDateString('en-US', {
        month: 'short',
        });

    const formattedDate: string = date.toLocaleDateString('en-US', {
        day: 'numeric',
        });

    const [todaysDate, setTodaysDate] = useState(Number(formattedDate))
    const todaysObj:dateObjType[] = dateTimes.filter((obj) => obj.month === formattedMonth && obj.date ===  todaysDate)



    const THEME = {
        icon: {
            size: 50
        }
    }

    const [activeID, setActiveId] = useState<string>(todaysObj.length > 0 ? todaysObj[0].id : "")


    function handleFinishedAssignments(id:number, toggle:boolean) {
        if (!toggle) {
            const chosenObj = studyItems.filter((item) => item.assignmentID === id)
            let notChosenObj = studyItems.filter((item) => item.assignmentID !== id)
            notChosenObj = [...notChosenObj, chosenObj[0]]
            setStudyItems(notChosenObj)
            setOriginalStudyData(notChosenObj)
        }
        else if (toggle) {
            const chosenObj = studyItems.filter((item) => item.assignmentID === id)
            let notChosenObj = studyItems.filter((item) => item.assignmentID !== id)
            notChosenObj = [chosenObj[0], ...notChosenObj]
            setStudyItems(notChosenObj)
            setOriginalStudyData(notChosenObj)
        }
    }

    function handleFilterBySubject(subjectName:Subjects) {
        // setStudyItems(originalStudyData)
        const newObj = originalStudyData.filter((items) => items.subject == subjectName)
        console.log(newObj)
        setStudyItems(newObj)
        // setStudyItems(newObj)
    }


  return (
    <SafeAreaView className='h-full bg-customBgBlue'>
        <FlatList
            ListHeaderComponent={() => (
                <>
                    <StudyHeader />
                    
                    <SubjectScrollView studySubjects={studySubjects} filterBySubject={handleFilterBySubject}/>

                    <View className='h-52 ml-4'>
                        <View className='h-16 justify-center'>
                            <Text className=' text-3xl font-bold text-stone-900'>10 / 12 Items Studied!!!</Text>
                        </View>

                        <FlatList
                            ref={dateListRef}
                            // snapToAlignment={'center'}
                            initialScrollIndex={todaysDate}
                            getItemLayout={(data, index) => ({
                                length: 65,
                                offset: 8 + (65 * (index - 1)),
                                index,
                            })}
                            onScrollToIndexFailed={(info) => {console.log('something bad is happening')}}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={dateTimes}
                            keyExtractor={(item)=> item.id.toString()}
                            renderItem={({item}:{item:dateObjType}) => (
                                <>
                                    <DateButton key={item.id} date={item.date} id={item.id} activeID={activeID} setActiveId={setActiveId}/>
                                </>
                                
                            )}
                            contentContainerStyle={{
                                height: 128,
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 30,
                                paddingLeft: 8,
                                paddingRight: 16,
                            }}
                        />
                    </View>
                    
                    
                </>
                
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
                            <ToggleButton assignmentId={item.assignmentID} finishedAssignment={handleFinishedAssignments}/>
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