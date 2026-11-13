import { View, Text, ScrollView, Pressable, TextInput, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { getUserData, getUserStudyItems, userDataType } from '../../UserInfo/userInfo'
import { useRouter } from 'expo-router'

const Settings = () => {

    const [userInfo, getUserInfo] = useState<userDataType | false>()
    const [userStudyDates, getUserStudyDates] = useState<unknown>()
    const [newStudyScheduleInput, setNewStudyScheduleInput] = useState<string>('')
    const [daysApartString, setDaysApartString] = useState<string>('')
    const router = useRouter()

    const insets = useSafeAreaInsets()
    useEffect(() => {
        async function getData() {
            const gettingUserData = await getUserData()
            if (gettingUserData) {
                getUserInfo(gettingUserData)
            }
            const gettingUserStudyDates = await getUserStudyItems()

            // this function gets the user study items. Then it grabs the first item
            // on the list and grabs the keys in the object 'extraDates', then it 
            // grabs the number in the key 14 for 12_days and slices the rest of the
            // string off before setting the placeholder value equal to the string
            if (gettingUserStudyDates) {
                let tempDaysApartString:string = ''
                const keys = Object.keys(gettingUserStudyDates[0]['extraDates'])
                console.log('keys', keys)
                for (const i in keys) {
                    console.log('i', keys[i].slice(0, -5), 'i', keys[i])
                    tempDaysApartString = tempDaysApartString + keys[i] + ", "
                }
                tempDaysApartString = tempDaysApartString.slice(0,-2)
                setDaysApartString(tempDaysApartString)
            }
        }
        getData()
    },[])

    function changePassword() {
        console.log('you should make this change the password')
    }

    function submitNewReStudySchedule() {
        console.log('you should make this change the study schedule')
    }

    function returnButton() {
        router.back()
    }



  
    return (
    <SafeAreaView className='border-2 border-black w-screen h-screen'>
        <ScrollView className='border-2 border-blue-500 w-full h-full flex-col'>

            <View className='border-2 border-green-500 w-full h-fit mt-9'>
                <Text className='ml-4 text-4xl'>User Info</Text>
                <View className='ml-10'>
                    <Text className='ml-4 text-xl'>- Username: {userInfo ? userInfo.name : 'Anomyous'}</Text>
                    <Text className='ml-4 text-xl'>- Email: {userInfo ? userInfo.email : 'Anomyous'}</Text>
                    <Pressable className='active:bg-teal-200/80' onPress={changePassword}>
                        <Text className='ml-4 text-xl'>- Change Password</Text>
                    </Pressable>
                </View>
            </View>

            <View className='border-2 border-green-500 w-full h-fit mt-10'>
                <Text className='ml-4 text-4xl'>Change ReStudy Schedule</Text>
                <View className='ml-10 flex-row border-blue-400 border-2 rounded-full mr-4'>
                    <TextInput 
                        value={newStudyScheduleInput}
                        onChangeText={setNewStudyScheduleInput}
                        placeholder={`${daysApartString} days apart`}
                        className='h-12 text-xl flex-1 text-black pl-4 pb-1'
                    />
                    <Pressable onPress={submitNewReStudySchedule} className='border-gray-700 border-2 rounded-full w-24 justify-center items-center active:bg-teal-100/70'>
                        <Text>Submit</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>

        <Pressable 
            style={{top: insets.top, left: 8, elevation:10, zIndex:10}}
            className='ml-2 h-9 w-16 rounded-2xl items-center justify-center absolute left-2 top-0 z-10 bg-blue-100 active:bg-blue-200'
            onPress={returnButton}
        >
                <Text className='text-black text-2xl'>←</Text>
        </Pressable>
    </SafeAreaView>
  )
}

export default Settings