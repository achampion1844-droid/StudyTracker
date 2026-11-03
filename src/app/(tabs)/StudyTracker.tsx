import { View, Text, ScrollView, Button, Pressable, FlatList, Image, TouchableOpacity, Dimensions, Alert, Modal, TextInput } from 'react-native'
import React, { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { dateObjType, getDateObj, getSubjectInfo, getUserData, getUserStudyItems, Months, studyItemsType, subjectInfoType, TokenPackageType, userDataType } from '../../../UserInfo/userInfo'
import {getToken, getUserAcessOrRefreshToken, refreshingToken, removeTokens, saveTokens, validateToken} from '../../../UserInfo/userAuth'
import ToggleButton from '../../../components/Button'
import Icon from '../../../components/Icon'
import SubjectButton from '../../../components/SubjectButton'
import DateButton from '../../../components/DateButton'
import SubjectScrollView from '../../../components/SubjectScrollView'
import StudyHeader from '../../../components/StudyHeader'
import { Redirect, useRouter } from 'expo-router'




export function dateIdRetriever(day:number, month:any, year:number) {
        const id = getDateObj().filter((time) => time.date===day && time.month===month && time.year==year)
        return id[0]
    }


const studyTracker = (): ReactNode => {
    const [userData, setUserData] = useState<userDataType>({
            name: '',
            id: '',
            email: '',
        })
    const [studyItems, setStudyItems] = useState<studyItemsType[]>([]) //changed
    const [studySubjects, setStudySubjects] = useState<subjectInfoType[]>([])
    const [dateTimes, setDateTimes] = useState(() => getDateObj())
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true)
    const [isSigningUp, setIsSigningUp] = useState<boolean>(false)
    
    const date = new Date()
    const todaysDay = Number(date.toLocaleDateString('en-US', {day: 'numeric'}))
    const todaysMonth = (date.toLocaleDateString('en-US', {month: 'short'}))
    
    const [formattedMonth, setFormattedMonth] = useState(todaysMonth)
    const [formattedDay, setFormattedDay] = useState(todaysDay)
    //modal boolean for setting a new Subject
    const [isVisible, setIsVisible] = useState(false)
    // variable for the new subject name
    const [newSubjectName, setNewSubjectName] = useState('')
    
    //todaysObj filters all the obj in dateTimes to see which ones have the same day and
    //month as formattedMonth and formattedDay.
    const [todaysObj, setTodaysObj] = useState(dateTimes.filter((obj) => obj.month === formattedMonth && obj.date === formattedDay))
    //activeID is the id of the currect date button that is filtering all the study items
    const [activeID, setActiveId] = useState<string>(todaysObj.length > 0 ? todaysObj[0].id : '')

    const [loginUsername, setLoginUsername] = useState<string>('superman')
    const [loginEmail, setLoginEmail] = useState<string>('superman@gmail.com')
    const [loginPassword, setLoginPassword] = useState<string>('1!qQ1!qQ')
    const [loginErrorMessage, setLoginErrorMessage] = useState<String>('')

    const router = useRouter()
    const dateListRef = useRef(null)
    const THEME = {
        icon: {
            size: 50
        }
    }

    // resets todaysObj to filter for the new month and day
    // handleFilterByDate then filters all of the new study topics by
    // the id of the currect date button (activeID) and this effect goes
    // off whenever formattedMonth and formattedDay are changed
    useEffect(() => {
        setTodaysObj(dateTimes.filter((obj) => obj.month === formattedMonth && obj.date === formattedDay))
        handleFilterByDate(activeID)
    },[formattedMonth, formattedDay])

    // loads the api's at the opening of the application and sets the state
    useEffect(() => {
        async function loadFromAPI() {
            if (isLoggedIn) {
                const userData = await getUserData()
                setUserData(userData)

                const studyValue = await getUserStudyItems()
                const subjectValue = await getSubjectInfo()

                if (studyValue) {
                    setStudyItems(studyValue)
                }
                setStudySubjects(subjectValue)
            }
        }
        loadFromAPI()
    },[isLoggedIn])


    useEffect(() => {
        async function hasTokenOrRedirect() {
            const response:any = await getToken()
            if (response !== null && Object.keys(response).length > 0) {
                const validate = await validateToken(response['accessToken'])
                if (validate) {
                    setIsLoggedIn(true)
                }
                else {
                    setIsLoggedIn(false)
                }
            } else {
                setIsLoggedIn(false)
            }
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
    }



    async function LogIn() {
        const response:any = await getUserAcessOrRefreshToken(loginUsername, loginEmail, loginPassword)
        const accessToken:string = response['accessToken']
        if (accessToken) {
            setIsLoggedIn(true)
            
        } else {
            setLoginErrorMessage(response.response.data['non_field_errors'][0])
        }
    }


    function SignUp() {
        console.log('signing up')
        setIsSigningUp(true)
        router.push('/SignUp')
    }






    // formatting date functions
    function formatDay(date:Date):string {
        return date.toLocaleDateString('en-US', {
        day: 'numeric'
        });
    }
    function formatMonth(date:Date):string {
        return date.toLocaleDateString('en-US', {
        month: 'short'
        });
    }
    function formatNumMonth(date:Date):string {
        return date.toLocaleDateString('en-US', {
        month: 'numeric'
        });
    }
    function formatYear(date:Date):string {
        return date.toLocaleDateString('en-US', {
        year: 'numeric'
        });
    }


    // function takes in two parameters the id of the assignment and if the box was 
    // ticked (true) or unticked (false). Ths function then maps over the whole
    // list to ensure that the assignment is updated with the new value
    // then two lists are created finished and not finished before getting
    // merged together and set into the Study Items list
    function handleFinishedAssignments(id:string, isCompleted:boolean): void {
        const updated = studyItems.map((item) => item.assignmentID === String(id) ? {...item, isCompleted} : item) // this might be faulty the String typecast
        const finished = updated.filter(item => item.isCompleted)
        const notFinished = updated.filter(item => !item.isCompleted)
        setStudyItems([...notFinished, ...finished])
        // the code below seems to be doing the exact same thing so test it and see if the code above works as intended
        // if (isCompleted) {
        //     const finished = updated.filter(item => item.isCompleted)
        //     const notFinished = updated.filter(item => !item.isCompleted)
        //     setStudyItems([...notFinished, ...finished])
        // } else {
        //     const finished = updated.filter(item => item.isCompleted)
        //     const notFinished = updated.filter(item => !item.isCompleted)
        //     setStudyItems([...notFinished, ...finished])
        // }
    }




    // subjectName is passed as a prop up from the Subject button component
    // this filter takes either the subject name or a null and filter the
    // assignments to be studied by the category name pass or it returns
    // the full list of assignments if null is returned. An example would be 
    // clicking the chemistry button and then clicking it again. on the second
    // click, a null is returned reseting the button. The list is then reorganized
    // to ensure that all finished and unfinished study assignments are still organized
    async function handleFilterBySubject(subjectName:string | null):Promise<void> { //added an async and a Promise<void>
        let dummyStudyItems
        const data = await getUserStudyItems()
        if (data) {
            if (!subjectName) {
                // see if you can add an extra layer to the getUserStudyItems() function where if you click it and you have already loaded everything, it gets a parameter that tells it you've already have the data and returns the data instantly through and if () block
                dummyStudyItems = data.filter(item => item.dateStartedId === activeID)
            }
            else {
                dummyStudyItems = data.filter((items) => items.subject == subjectName && items.dateStartedId === activeID)
            }
            const finished = dummyStudyItems.filter(item => item.isCompleted)
            const notFinished = dummyStudyItems.filter(item => !item.isCompleted)
            setStudyItems([...notFinished, ...finished])
        }
    }



    // eventually make the dates a list and filter by if the date.dateStartedId is in the list
    // creates a function that takes in the id of the date button and filters
    // all of the study items to see which ones are tied to the specific date
    async function handleFilterByDate(id:string): Promise<void> {
        const data = await getUserStudyItems()
        if (data) {
            const newDateFilterArray = data.filter((date) => date.dateStartedId === id)
            setStudyItems(newDateFilterArray)
        }
        
    }


    // this function takes in a newDate Date object from the scroll wheel
    // and then converts the newDate into a day, month, and year. If the new
    // date is within the time range of the IdRetriever, then the formattedDay
    // and formattedMonth are changed while the activeId is shifted as well
    function handleNewDate(newDate:Date) {
        const day = Number(formatDay(newDate))
        const month = formatMonth(newDate)
        const year = Number(formatYear(newDate))
        if (dateIdRetriever(day, month, year) !== undefined) {
            setFormattedDay(day)
            setFormattedMonth(month)
            setActiveId(dateIdRetriever(day, month, year).id)
        } 
        else {
            Alert.alert('Date to Far Back', 'The date you have selected is before your first study assignment')
        }
    }

    // when the new subject is added to the list
    // this function triggers
    function newSubjectSubmitButtonPressed() {
        setIsVisible(false)
        setNewSubjectName('')
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

                    <StudyHeader filterNewDate={handleNewDate} name={userData.name}/>





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
                        <View className='h-16 justify-center'>
                            <Text className=' text-3xl font-bold text-stone-900'>10 / 12 Items Studied!!!</Text>
                        </View>


                        <View className='h-20 mt-6'>
                            <FlatList
                                className=''
                                ref={dateListRef}
                                initialScrollIndex={formattedDay-1}
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