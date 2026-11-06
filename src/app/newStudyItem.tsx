import { View, Text, TextInput, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { dateObjType, getSubjectList, getUserStudyItems, Months, studyItemsType, SubjectName } from '../../UserInfo/userInfo'
import { useRouter } from 'expo-router'
import { Selector } from 'rn-selector';
import { formatDay, formatNumMonth, formatYear } from '../../functions/DateModifiers'
import uuid from 'react-native-uuid';

const newStudyItem = () => {
    const [newStudyItem, setNewStudyItem] = useState<studyItemsType | null>(null)
    const [assignmentName, setAssignmentName] = useState<string>('')
    const [assignmentDescription, setAssignmentDescription] = useState<string>('')
    const [subject, setSubject] = useState<string | null>(null)
    const router = useRouter()
    const [response, setResponse] = useState<dateObjType | null>(null)
    const [Subjects, setSubjects] = useState<string[]>(['Chemistry','Biology', 'Physics', 'Wind_Symphony'])
    const [DateID, setDateID] = useState<string>('')
    type StudySubjectsObjType = {
        label:string,
        value:string,
    }

    useEffect(() => {
        let isMounted = true
        async function getSubjectsAPI() {
            if (isMounted) {
                const subjectValue = await getSubjectList()
                if (subjectValue) {
                    setSubjects(subjectValue.map((name) => name.name))
                }
            }
        }
        getSubjectsAPI()
        return () => {
            isMounted = false
        }
    }, []) 
    

    let StudySubjectOptions:StudySubjectsObjType[] = []
    for (const subjectName of Subjects) {
        StudySubjectOptions.push({label: subjectName, value: subjectName})
    }
    useEffect(() => {
        setSubject(StudySubjectOptions[0].value)
    },[])

    function getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    



    function returnHome() {
        router.back()
    }

    const date = new Date()
    const formattedDate: string = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    useEffect(() => {
        const year = formatYear(date)
        const month = formatNumMonth(date)
        const day = formatDay(date)
        setDateID(`${year}-${month}-${day.padStart(2,'0')}`)
    },[])



    function newAssignment() {
        if (!subject) {
            return
        }
        // console.log('newAssignmentObj creations')
        const newAssignmentObj:studyItemsType = {
            assignmentName: assignmentName,
            assignmentID: String(uuid.v4()),
            assignmentDescription: assignmentDescription,
            dateAdded: formattedDate,
            remainingStudySessions: 5,
            subject: subject,
            icon: require('../../assets/icons/BookIcon.jpg'),
            isCompleted: false,
            dateaddedObj: date,
            dateStartedId: DateID,
            extraDates: {"14_days": ["2026-11-18", false], "1_days": ["2026-11-05", false], "28_days": ["2026-12-02", false], "3_days": ["2026-11-07", false], "7_days": ["2026-11-11", false], "84_days": ["2027-01-27", false]}
        }
        // console.log(newAssignmentObj)
        // console.log('dateID', newAssignmentObj.dateStartedId)
        getUserStudyItems(newAssignmentObj)
        router.back()
    }
  
    return (
    <SafeAreaView className='px-3 bg-customBgBlue h-screen'>
        <View>
            <Pressable onPress={returnHome}>
                <Text className='text-4xl mt-4'>←</Text>
            </Pressable>
        </View>
        <View className='items-start justify-center pt-4'>
            <Text className='text-4xl'>New Study Item</Text>
        </View>
        <View className='mt-4'>
            <TextInput 
                className='border-2 border-black -p-1 h-14 text-3xl jusitfy-center placeholder:text-gray-500 placeholder:pl-2 rounded-lg'
                onChangeText={setAssignmentName}
                value={assignmentName}
                placeholder='Assignment Name'
            />
            <TextInput 
                className='mt-4 border-2 border-black h-28 text-lg jusitfy-center placeholder:text-gray-500 placeholder:pl-2 placeholder:text-start rounded-lg'
                onChangeText={setAssignmentDescription}
                value={assignmentDescription}
                placeholder='Short Description'
                multiline={true}
            />
        </View>
        <View className='mt-4'>
            <Selector 
                options={StudySubjectOptions}
                selectedValue={subject}
                onValueChange={(value) => setSubject(value)}
                placeholder='Select your subject'
                // styles={{ borderColor: '#007bff', borderWidth: 1 }}
                //     dropdownStyle={{ backgroundColor: '#f8f9fa' }}
                //     textStyle={{ color: '#343a40' }}
            />
        </View>
        <View className='flex-1 justify-start mt-4'>
            <Pressable onPress={newAssignment} className='h-14 w-full justify-center items-center rounded-xl bg-customButtonBlue active:bg-customButtonActiveBlue'>
                    <Text className='text-2xl text-gray-50 font-semibold'>Submit</Text>
            </Pressable>
        </View>
    </SafeAreaView>
  )
}

export default newStudyItem