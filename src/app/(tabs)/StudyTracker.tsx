import { View, Text, ScrollView, Button, Pressable, FlatList, Image, TouchableOpacity, Dimensions, Alert, Modal, TextInput } from 'react-native'
import React, { act, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { addNewAssignment, addNewSubject, dateObjType, futureStudiesObjType, getAllEarliestDateObj, getDateObj, getSubjectInfo, getUserData, getUserStudyItems, Months, studyItemsType, subjectInfoType, TokenPackageType, updateFinishedAssignment, userDataType } from '../../../UserInfo/userInfo'
import {getToken, getUserAcessOrRefreshToken, refreshingToken, removeTokens, saveTokens, validateToken} from '../../../UserInfo/userAuth'
import ToggleButton from '../../../components/Button'
import Icon from '../../../components/Icon'
import SubjectButton from '../../../components/SubjectButton'
import DateButton from '../../../components/DateButton'
import SubjectScrollView from '../../../components/SubjectScrollView'
import StudyHeader from '../../../components/StudyHeader'
import { Redirect, useRouter } from 'expo-router'
import { formatDay, formatNumMonth, formatYear } from '../../../functions/DateModifiers'
import NavBar from '../../../components/NavBar'



const studyTracker = (): ReactNode => {
    const [userData, setUserData] = useState<userDataType>({name: '', id: '', email: ''})
    const [studyItems, setStudyItems] = useState<studyItemsType[]>([]) //changed
    const [studySubjects, setStudySubjects] = useState<subjectInfoType[]>([])
    const [dateTimes, setDateTimes] = useState(() => getDateObj())
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true)
    const [isSigningUp, setIsSigningUp] = useState<boolean>(false)
    
    const date = new Date()
    const todaysDay = Number(date.toLocaleDateString('en-US', {day: 'numeric'}))
    const todaysMonth = (date.toLocaleDateString('en-US', {month: 'short'}))
    

    //modal boolean for setting a new Subject
    const [isVisible, setIsVisible] = useState(false)
    // variable for the new subject name
    const [newSubjectName, setNewSubjectName] = useState('')
    const [numberOfStudyItemsLeft, setNumberOfStudyItemsLeft] = useState<Number>(0)
    


    //activeID is the id of the currect date button that is filtering all the study items
    const [activeID, setActiveId] = useState<string>(`${formatYear(new Date)}-${formatNumMonth(new Date)}-${formatDay(new Date).padStart(2,'0')}`)


    const [loginUsername, setLoginUsername] = useState<string>('superman')
    const [loginEmail, setLoginEmail] = useState<string>('superman@gmail.com')
    const [loginPassword, setLoginPassword] = useState<string>('1!qQ1!qQ')
    const [loginErrorMessage, setLoginErrorMessage] = useState<String>('')
    const [visibleNavBar, setVisibleNavBar] = useState<boolean>(false)

    const router = useRouter()
    const dateListRef = useRef(null)
    const THEME = {icon: {size: 50}}


    useEffect(() => {
        handleFilterByDate(activeID)
    },[activeID])

    // loads the api's at the opening of the application and sets the state
    useEffect(() => {
        if (!isLoggedIn) return
        async function loadFromAPI() {
            const [userData, studyValue, subjectValue] = await Promise.all([
                getUserData(),
                reStudyDateFilter(),
                getSubjectInfo(),
            ])
            if (userData) setUserData(userData)
            if (studyValue) setStudyItems(studyValue)
            if (subjectValue) setStudySubjects(subjectValue)
        }
        loadFromAPI()
    },[isLoggedIn])


    useEffect(() => {
        async function hasTokenOrRedirect() {
            const token:any = await getToken()
            const isValid = token?.accessToken ? await validateToken(token.accessToken) : false
            setIsLoggedIn(isValid ? true : false)
        }
        hasTokenOrRedirect()
    },[])
    

    
    async function testingFunction() {
        console.log('IS WORKING')
        // console.log(await getUserData())
        // getUserAcessOrRefreshToken()
        removeTokens()
        // const response = await getToken()
        // console.log(response)
        // console.log('tested')
        // const refreshToken:any = await getToken()
        // console.log(refreshToken)
        // console.log('high', await refreshingToken(refreshToken['refreshToken']))
        // await getAllEarliestDateObj()
        // console.log(activeID)
        // addNewAssignment()
        // reStudyDateFilter()
    }


    async function reStudyDateFilter(date?:string) { //logic has been simplifed
        const allStudyItems = await getUserStudyItems()
        if (!allStudyItems) return
        let trueDate:string = date || activeID
        const presentFilteredStudyItems = allStudyItems.filter(item => item.dateAdded === trueDate)
        const futureFilteredStudyItems = allStudyItems.filter(item => (item.extraDates ? Object.values(item.extraDates) : []).some(entry => entry[0] === trueDate))
        const fullFilteresStudyItems:studyItemsType[] = [...presentFilteredStudyItems, ...futureFilteredStudyItems].filter((obj, index, self) => index === self.findIndex((o) => o.assignmentID === obj.assignmentID))
        return fullFilteresStudyItems
    }



    async function LogIn() {
        const response:any = await getUserAcessOrRefreshToken(loginUsername, loginEmail, loginPassword)
        const accessToken:string = response['accessToken']
        if (accessToken) {
            setIsLoggedIn(true)
        } else {
            setLoginErrorMessage(response.response.data['non_field_errors'])
        }
    }


    function SignUp() {
        setIsSigningUp(true)
        router.push('/SignUp')
    }






    


    // function takes in two parameters the id of the assignment and if the box was 
    // ticked (true) or unticked (false). Ths function then maps over the whole
    // list to ensure that the assignment is updated with the new value
    // then two lists are created finished and not finished before getting
    // merged together and set into the Study Items list
    async function handleFinishedAssignments(id:string, isCompleted:boolean): Promise<void> {
        let newExtraDates = studyItems.find(item => item.assignmentID === id)?.extraDates
        for (const session of Object.values(newExtraDates ?? {})) { //Object.values takes the values, puts them into a list but it still pointing to the original bits of data which can be modified through the code
            if (session.includes(activeID)) {
                session[1] = isCompleted
            }
        }
        updateFinishedAssignment(id, isCompleted, newExtraDates)

        const finished = studyItems.filter(item => Object.values(item.extraDates ?? {}).some(pair => pair[0] === activeID && pair[1]))
        const notFinished = studyItems.filter(item => !finished.includes(item))
        setStudyItems([...notFinished, ...finished])
    }




    // subjectName is passed as a prop up from the Subject button component
    // this filter takes either the subject name or a null and filter the
    // assignments to be studied by the category name pass or it returns
    // the full list of assignments if null is returned. An example would be 
    // clicking the chemistry button and then clicking it again. on the second
    // click, a null is returned reseting the button. The list is then reorganized
    // to ensure that all finished and unfinished study assignments are still organized
    async function handleFilterBySubject(subjectName:string | null):Promise<void> {
        const data = await reStudyDateFilter()
        if (!data) return
        const filtered = subjectName ? data.filter((items) => items.subject == subjectName) : data
        const finished = filtered.filter(item => item.isCompleted)
        const notFinished = filtered.filter(item => !item.isCompleted)
        setStudyItems([...notFinished, ...finished])
    }



    // eventually make the dates a list and filter by if the date.dateStartedId is in the list
    // creates a function that takes in the id of the date button and filters
    // all of the study items to see which ones are tied to the specific date
    async function handleFilterByDate(id:string): Promise<studyItemsType[] | void> {
        const filteredData = await reStudyDateFilter(id)
        if (filteredData) {
            setStudyItems(filteredData)
        }
        setActiveId(id) 
    }


    // this function takes in a newDate Date object from the scroll wheel
    // and then converts the newDate into a day, month, and year. If the new
    // date is within the time range of the IdRetriever, then the formattedDay
    // and formattedMonth are changed while the activeId is shifted as well
    async function handleNewDate(newDate:Date) {
        const dateID = `${formatYear(newDate)}-${formatNumMonth(newDate)}-${formatDay(newDate).padStart(2,'0')}`
        const response: false | studyItemsType = await getAllEarliestDateObj()
        const isBeforeFirstAssignment = response ? new Date(response['dateAdded']).toISOString() >= new Date(dateID).toISOString() : true
        if (isBeforeFirstAssignment) {
            Alert.alert('Date to Far Back', 'The date you have selected is before your first study assignment')
            return
        }
          
        setActiveId(dateID)
        const studyData = await reStudyDateFilter(dateID)
        if (studyData) setStudyItems(studyData)
    }


    function newSubjectSubmitButtonPressed() {
        addNewSubject(newSubjectName)
        setNewSubjectName('')
    }

    function openNavBar() {
        setVisibleNavBar(true)
    }

    function handleRemainingStudySessions(remainingStudySessions:futureStudiesObjType) {
        return Object.values(remainingStudySessions).filter(session => session[0] > activeID).length
    }

    


  return (
    <SafeAreaView className='h-full bg-customBgBlue'>
        <FlatList
            ListHeaderComponent={
                <>



                    <Pressable className='ml-3 h-6 w-10 border-black border-2 active:bg-black' onPress={testingFunction}>
                        <View >
                            <Text>
                                ++++++++
                            </Text>
                        </View>
                    </Pressable>

                    <Pressable className='ml-3 h-6 w-10  active:bg-blue-200' onPress={openNavBar}>
                        <View >
                            <Text className=''>
                                ⚙️
                            </Text>
                        </View>
                    </Pressable>



                    <StudyHeader filterNewDate={handleNewDate} name={userData.name}/>
                    
                    <Modal
                    visible={visibleNavBar}
                    transparent
                    animationType='slide'
                    onRequestClose={() => setVisibleNavBar(false)}
                    >
                        <SafeAreaProvider>
                            <View className='flex-1 flex-row'>
                                <View className='w-1/2 h-full bg-teal-100'>
                                    <NavBar setVisibleNavBar={setVisibleNavBar} NavBar={NavBar}/>
                                </View>
                                <Pressable className='flex-1 bg-black/50' onPress={() => setVisibleNavBar(false)}>
                                </Pressable>
                            </View>
                        </SafeAreaProvider>
                        
                        
                    </Modal>
                    



                    <Modal 
                        visible={isVisible} 
                        onRequestClose={() => setIsVisible(!isVisible)}
                        // transparent={true}
                    >
                        <View className='w-full justify-center h-2/5 md:w-40'>
                            <View className='justify-center items-end mx-4'>
                                <TouchableOpacity 
                                    className='border-2 border-black h-12 w-12 justify-center items-center rounded-full'
                                    onPress={() => setIsVisible(!isVisible)}>
                                    <Text className='font-bold text-xl'>X</Text>
                                </TouchableOpacity>
                            </View>
                            
                            <View className='mt-6 items-center mx-4'>
                                <TextInput 
                                    onChangeText={setNewSubjectName}
                                    value={newSubjectName}
                                    className='border-2 border-black h-16 text-2xl w-full placeholder:text-gray-600 mx-4'
                                    placeholder='New Subject Name'
                                />
                                <Pressable 
                                    className='bg-customButtonBlue w-full mx-4 h-12 rounded-lg mt-2 flex justify-center items-center active:bg-customButtonActiveBlue'
                                    onPress={newSubjectSubmitButtonPressed}
                                    >
                                    <Text className='text-gray-50 text-2xl pl-2'>Submit</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>





                    <SubjectScrollView 
                        studySubjects={studySubjects} 
                        filterBySubject={handleFilterBySubject}
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                    />

                    
                        <Modal
                            visible={!isLoggedIn && !isSigningUp? true: false}
                            pointerEvents='auto'
                            animationType='fade'
                            transparent={true}
                            onRequestClose={() => setIsLoggedIn(true)}
                        >
                            <View className='w-full h-full bg-customBgBlue justify-center items-center'>
                                <Text className='text-2xl text-red-500'>{loginErrorMessage}</Text>
                                <Text className='text-4xl'>LOG IN</Text>
                                <TextInput 
                                    className='border-black border-2 w-[90%] h-14 pl-4 text-xl pb-1 bg-transparent rounded-full mt-8 placeholder:text-black'
                                    onChangeText={setLoginUsername}
                                    value={loginUsername}
                                    placeholder='Username'
                                />
                                <TextInput 
                                    className='border-black border-2 w-[90%] h-14 pl-4 text-xl pb-1 bg-transparent rounded-full mt-8 placeholder:text-black'
                                    onChangeText={setLoginEmail}
                                    value={loginEmail}
                                    placeholder='Email'
                                />
                                <TextInput 
                                    className='border-black border-2 w-[90%] h-14 pl-4 text-xl pb-1 bg-transparent rounded-full mt-8 placeholder:text-black'
                                    onChangeText={setLoginPassword}
                                    value={loginPassword}
                                    placeholder='Password'
                                />
                                <Pressable className='w-[90%] h-14 mt-8 border-black border-2 justify-center items-center rounded-full active:bg-blue-100' onPress={LogIn}>
                                    <Text className='text-4xl'>
                                        Log In
                                    </Text>
                                </Pressable>

                                <Pressable onPress={SignUp} className='w-[40%] h-14 mt-4 justify-center items-center rounded-full active:bg-blue-100'>
                                        <Text className='text-xl text-blue-700'>Sign Up?</Text>
                                </Pressable>
                            </View>
                        </Modal>





                    <View className='h-52 ml-4'>
                        <View className='h-8 justify-center'>
                            <Text className=' text-3xl font-bold text-stone-900'></Text>
                        </View>


                        <View className='h-20 mt-6'>
                            <FlatList
                                className=''
                                ref={dateListRef}
                                initialScrollIndex={Number(activeID.slice(8,10))-1}
                                getItemLayout={(data, index) => ({
                                    length: 65,
                                    offset: 8 + (65 * (index - 1)),
                                    index,
                                })}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                data={dateTimes}
                                keyExtractor={(item)=> item.id.toString()}
                                renderItem={({item}:{item:dateObjType}) => (
                                    <>
                                        <DateButton 
                                            key={item.id} 
                                            date={item.date} 
                                            id={item.id} 
                                            activeID={activeID} 
                                            setActiveId={setActiveId} 
                                            filterByDate={handleFilterByDate}/>
                                    </>
                                )}
                                contentContainerStyle={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 30,
                                    paddingLeft: 8,
                                    paddingRight: 16,
                                }}
                            />
                        </View> 
                    </View>
                </>
            }
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
                                <Text className='bg-blue-400 w-fit py-1 px-2 rounded-xl text-stone-100'>{handleRemainingStudySessions(item.extraDates)} Days Left!</Text>
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
            ListFooterComponent={
                <View className='border-2 border-black mx-2 px-2 mt-4 h-28 rounded-3xl items-center justify-center'>
                    <Pressable 
                        className=' w-full h-full justify-center items-center'
                        onPress={() => {router.push('/newStudyItem')}}
                        >
                        <Text className='text-7xl bg-customStudyButton h-16 w-16 rounded-full text-center' style={{ lineHeight: 60 }}>+</Text>
                    </Pressable>
                </View>
            }
        />
        
    </SafeAreaView>
    
  )
}
//* this might be faulty the Number typecast on line 296 with the toggle button <ToggleButton assignmentId={Number(item.assignmentID)} finishedAssignment={handleFinishedAssignments}/> 
export default studyTracker