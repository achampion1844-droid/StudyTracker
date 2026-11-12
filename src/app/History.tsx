import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getUserStudyItems, studyItemsType } from '../../UserInfo/userInfo'
import Icon from '../../components/Icon'
import ToggleButton from '../../components/Button'
import { formatDay, formatNumMonth, formatYear } from '../../functions/DateModifiers'

const History = () => {
    const [allUserStudyItems, setAllUserStudyItems] = useState<studyItemsType[]>()
    const [activeID, setActiveId] = useState<string>(`${formatYear(new Date)}-${formatNumMonth(new Date)}-${formatDay(new Date).padStart(2,'0')}`)

    useEffect(() => {
        async function gettingAllUserAssignments() {
            const data = await getUserStudyItems()
            if (data) {
                setAllUserStudyItems(data)
            }
            console.log(data)
        }
        gettingAllUserAssignments()
    })

    const THEME = {
        icon: {
            size: 50
        }
    }

    function handleFinishedAssignments() {
        console.log('well done')
    }

  return (
    <SafeAreaView className='h-full'>
        <FlatList
            data={allUserStudyItems}
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
                                <Text className='bg-blue-400 w-fit py-1 px-2 rounded-xl text-stone-100'>History</Text>
                            </View>
                            <Text className='pt-2 font-bold text-base'>{item.assignmentName}</Text>
                            <Text className='pt-2 font-normal text-sm flex-1 line-clamp-1 w-60'>{item.assignmentDescription}</Text>
                        </View>
                        <View className='w-16 items-center justify-center'>
                            <ToggleButton activeID={activeID} extraDates={item.extraDates} alreadyCompletedAssignment={item.isCompleted} assignmentId={item.assignmentID} finishedAssignment={handleFinishedAssignments}/> 
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

export default History