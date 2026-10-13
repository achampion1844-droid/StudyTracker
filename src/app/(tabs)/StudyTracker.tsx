import { View, Text, ScrollView, Button, Pressable, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getSubjectInfo, getUserData, getUserStudyItems, subjectInfoType } from '../../../UserInfo/userInfo'
import ToggleButton from '../../../components/Button'
import Icon from '../../../components/Icon'
import SubjectButton from '../../../components/SubjectButton'
import DateButton from '../../../components/DateButton'

const studyTracker = () => {
    const userData = getUserData()
    const studyItems = getUserStudyItems()
    const studySubjects = getSubjectInfo()
    const date = new Date()
    const formattedDate: string = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
        });

    const THEME = {
        icon: {
            size: 50
        }
    }

    const [activeID, setActiveId] = useState<string>('')

    
    function changeDate() {
        console.log('what date do you want to track?')
    }

    function press() {
        console.log('hi')
    }

    const buttonID = {
        button1: 'hello',
        button2: 'hi',
        button3: 'bye',
    }

    function handleReturnedID(id:string) {
        setActiveId(id)
    }




  return (
    <SafeAreaView className='border-4 border-blue-700 h-full bg-customBgBlue'>
        <FlatList
            ListHeaderComponent={() => (
                <>
                    <View className='h-40 items-start justify-center gap-4 mt-2 ml-4 mb-8'>
                        <Text className='text-md text-stone-800'>Workspace</Text>
                        <Text className='text-4xl font-semibold'>Today's Study Items</Text>
                        <Pressable className='px-2 py-3 rounded-2xl bg-customButtonBlue hover:bg-customButtonHoverBlue active:bg-customButtonActiveBlue' onPress={changeDate}>
                            <Text className='text-stone-100 font-bold'>Date: {formattedDate} ⏷</Text>
                        </Pressable>
                    </View>
                    
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

                    <View className='border-4 border-orange-600 h-52 mb-8 ml-4'>
                        <View className='border-blue-300 border-2 h-16 justify-center'>
                            <Text className=' text-3xl font-bold text-stone-900'>10 / 12 Items Studied!!!</Text>
                        </View>
                        
                        <View className='border-brown-300 border-2 h-32 items-center justify-center flex-row gap-8'>
                            <DateButton id={buttonID.button1} returnId={handleReturnedID} activeID={activeID}/>
                            <DateButton id={buttonID.button2} returnId={handleReturnedID} activeID={activeID}/>
                            <DateButton id={buttonID.button3} returnId={handleReturnedID} activeID={activeID}/>
                        </View>

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
                            <ToggleButton />
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