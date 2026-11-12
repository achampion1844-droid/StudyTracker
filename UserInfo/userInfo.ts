import { ImageSourcePropType } from "react-native"
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import { getAccessToken } from "./userAuth"


const date = new Date()





export type userDataType = {
    name: string
    id: string
    email: string
}

export type futureStudiesObjType = {
    [key: `${number}_days`]: [string,boolean]
}

export type studyItemsType = {
    assignmentName: string
    assignmentID: string
    assignmentDescription: string
    dateAdded: string
    remainingStudySessions: number
    subject: string
    icon: ImageSourcePropType
    isCompleted: boolean
    dateaddedObj: Date
    dateStartedId: string
    extraDates: futureStudiesObjType
}

export type studyItemsAPICallType = {
    assignment_name: string
    assignment_ID: string
    assignment_description: string
    date_started: string
    remaining_study_sessions: string
    subject: {
        name: string,
        description: string,
        created_at: string,
        user: string
        subject_ID: string
    }
    icon: string
    is_Completed: string
    extra_dates: futureStudiesObjType
    intervals: futureStudiesObjType
}

export type dateObjType = {
    id: string
    date: number
    month: Months
    year: number
    lastDayOfMonth: number
}

export type subjectInfoType = {
    icon: ImageSourcePropType
    subjectName: string
    numSubStudyItems: number
    id: string
}

export type SubjectApiInfoType = {
    icon: string | null,
    id: string,
    num_sub_study_items: string,
    subject_name: {
        created_at: string,
        description: string,
        name: string,
        subject_ID: string,
        user: string,
    }
}

export type SubjectApiType = {
    name: string,
    description: string,
    created_at: string,
    user: string,
    subject_ID: string,
}

export type SubjectName = {
    name: string
}

export type TokenPackageType = {
    accessToken:string, 
    refreshToken:string,
}

export type NavBarLinksObjectList = {
    name: string,
    addOnData: string | null
}

export type UserApiType = {
    username:string
    pk: string
    email: string
}



export enum Months {
    Jan = 'Jan',
    Feb = 'Feb',
    Mar = 'Mar',
    Apr = 'Apr',
    May = 'May',
    Jun = 'Jun',
    Jul = 'Jul',
    Aug = 'Aug',
    Sep = 'Sep',
    Oct = 'Oct',
    Nov = 'Nov',
    Dec = 'Dec',
}



    






export async function getAllEarliestDateObj() {
    let userStudyObjNew:studyItemsType[] = []
    const accessToken = await getAccessToken()
    if (!accessToken) return false
    
    try {
        const {data} = await axios.get<studyItemsAPICallType[]>(
            `${process.env.EXPO_PUBLIC_API_URL}/api/Assignment/`, 
            {headers: {"ngrok-skip-browser-warning": "true", 'Authorization': `Bearer ${accessToken}`}}
        )

        userStudyObjNew = data.map((response) => ({
            assignmentName: response.assignment_name,
            assignmentID: String(response.assignment_ID),
            assignmentDescription: response.assignment_description,
            dateAdded: (response.date_started),
            remainingStudySessions: Number(response.remaining_study_sessions),
            subject: response.subject.name,
            icon: response.icon ? {uri: response.icon} : require('../assets/icons/BookIcon.jpg'),
            isCompleted: Boolean(response.is_Completed),
            dateaddedObj: new Date(response.date_started),
            dateStartedId: String(response.date_started),
            extraDates: intervalDateAdder(response.intervals, response.date_started)
        }))
    } catch (error) {
        console.log('getAllEarliestDateObj')
        console.error(error)
    }

    if (userStudyObjNew.length === 0) return false

    const earliestStudyObj = userStudyObjNew.reduce((earliest, current) => 
        new Date(current.dateAdded) < new Date(earliest.dateAdded) ? current : earliest
    )
    return earliestStudyObj
}



export function getDateObj():dateObjType[] {
    const dateObj:dateObjType[] = []
    const currentDate = new Date()
    const month = currentDate.toLocaleString('default', {month:'short'}) as Months
    const numMonth = currentDate.toLocaleString('default', {month:'numeric'})
    const day = Number(currentDate.getDate())
    const year = Number(currentDate.getFullYear())
    const lastDay = Number(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate())
    
    for (let i = 1; i <= lastDay; i++) {
        dateObj.push({
            id: String(String(year) + "-" + String(numMonth) + '-' + String(i).padStart(2,'0')),
            date: i,
            month: month,
            year: year,
            lastDayOfMonth: lastDay
        })
    }
    return dateObj
}







export async function getSubjectInfo(): Promise<subjectInfoType[] | false>  {
    let responses:SubjectApiInfoType[] = []
    const studyInfoObj:subjectInfoType[] = []
    const accessToken = await getAccessToken()
    if (!accessToken)  return false
    
    try {
        const response = await axios.get(
            `${process.env.EXPO_PUBLIC_API_URL}/api/Subject_Info/`, 
            {headers: {"ngrok-skip-browser-warning": "true", 'Authorization': `Bearer ${accessToken}`}}
        )
        responses = response.data
    } catch(error) {
        console.log('Status:', error.response.status);
        console.log('Error data:', error.response.data);
        console.log('error at getUserStudyItem')
        return false
    }
    responses.forEach((response) => {
        if (true) {
            studyInfoObj.push({
                icon: response.icon ? {uri: response.icon} : require('../assets/icons/BookIcon.jpg'),
                subjectName: response.subject_name.name,
                numSubStudyItems: Number(response.num_sub_study_items),
                id: response.id,
            })
        }
    })
    return studyInfoObj
}

function addDays(dateStr: string, days: number): string {
  // "YYYY-MM-DD" strings are parsed as UTC midnight
  const date = new Date(dateStr);
  date.setUTCDate(date.getUTCDate() + days); // handles month and year rollover
  return date.toISOString().slice(0, 10);    // back to "YYYY-MM-DD"
}

//this function dynamically adds the date to the object when it arrives
function intervalDateAdder(responses:any, dateStarted:any) {
    // checks to see if this interval obj is already formatted correct and if so returns the response
    if ((responses[1].some(item => typeof(item)==='boolean')) && (responses[1].some(item => typeof(item)==='string'))) {
        return responses
    }

    let newIntervalList = {}
    for (const i in responses) {
        newIntervalList[i] = [addDays(dateStarted,Number(i)), responses[i][0]] 
    }
    return newIntervalList
}

export async function getUserStudyItems(): Promise<studyItemsType[] | false> {
    const accessToken = await getAccessToken()
    if (!accessToken) {
        return false
    }
    
    try {
        const { data } = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/Assignment/`, {
            headers: {
                "ngrok-skip-browser-warning": "true",
                "Authorization": `Bearer ${accessToken}`
            }
        })
        
        return data.map((response) => ({
            assignmentName: response.assignment_name,
            assignmentID: String(response.assignment_ID),
            assignmentDescription: response.assignment_description,
            dateAdded: (response.date_started),
            remainingStudySessions: Number(response.remaining_study_sessions),
            subject: response.subject.name,
            icon: response.icon ? {uri: response.icon} : require('../assets/icons/BookIcon.jpg'),
            isCompleted: Boolean(response.is_Completed),
            dateaddedObj: new Date(response.date_started),
            dateStartedId: String(response.date_started),
            extraDates: intervalDateAdder(response.intervals, response.date_started),
    }))
    
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('Status:', error.response?.status)
            console.log('Error data:', error.response?.data)
        } else {
            console.log('Unexpected error:', error)
        }
        console.log('error at getUserStudyItems')
        return false
    }
}



export async function getSubjectList(): Promise<SubjectName[] | false> {
    const accessToken = await getAccessToken()
    if (!accessToken) {
        return false
    }
    try {
        const { data } = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/Subject/`, {
            headers: {
                "ngrok-skip-browser-warning": "true",
                'Authorization': `Bearer ${accessToken}`
            }
        })
        return data.map((value:SubjectApiType) => ({name: value.name}))
    } catch (error) {
        console.log('error at getSubjectList')
        console.error(error)
        return false
    }
}



export async function getUserData():Promise<userDataType | false> {
    const accessToken = await getAccessToken()
    if (!accessToken) {
        return false
    }
    
    try {
        const { data } = await axios.get<UserApiType>(`${process.env.EXPO_PUBLIC_API_URL}/api/auth/user/`, {
            headers: {
                "ngrok-skip-browser-warning": "true",
                'Authorization': `Bearer ${accessToken}`
            }
        })
        return {
            name: data['username'],
            id: data['pk'],
            email: data['email'],
        }
        
    } catch(error) {
        console.log('user data error', error)
        return {name: '', id: '', email: '',}
    }
}






export async function addNewAssignment(newAssignmentObj:studyItemsType) {
    const accessToken = await getAccessToken()
    if (!accessToken) {
        return false
    }
    try { //gets the id for the subject model the assignment is tied to
        const {data} = await axios.get<SubjectApiType[]>(`${process.env.EXPO_PUBLIC_API_URL}/api/Subject/`, {
            headers: {
                "ngrok-skip-browser-warning": "true",
                "Authorization": `Bearer ${accessToken}`
            }
        })
        const chemStudySubjectID = data.find(subject => subject['name'] === newAssignmentObj.subject)?.subject_ID
        if (!chemStudySubjectID) return false
        
         //adds the new assignment
        await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/api/Assignment/`,
            {
                assignment_name: newAssignmentObj.assignmentName,
                assignment_description: newAssignmentObj.assignmentDescription,
                remainingStudySessions: String(newAssignmentObj.remainingStudySessions),
                isCompleted: false,
                subject_id: chemStudySubjectID
            },
            {
            headers: {
                "ngrok-skip-browser-warning": "true",
                "Authorization": `Bearer ${accessToken}`
            }
        })
        return true
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('addNewAssignment Status:', error.response?.status)
            console.log('Error data:', error.response?.data)
        }
        return false
    }
}

export async function updateFinishedAssignment(id:string, isCompleted:boolean, newExtraDates:any) {
    const accessToken = await getAccessToken()
    if (!accessToken) return false

    try {
        await axios.patch(
            `${process.env.EXPO_PUBLIC_API_URL}/api/Assignment/${id}/`, 
            {intervals: newExtraDates},
            {headers: {"ngrok-skip-browser-warning": "true", "Authorization": `Bearer ${accessToken}`}}
        )
        return true

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('updateFinishedAssignment Status:', error.response?.status)
            console.log('Error data:', error.response?.data)
        }
        return false
    }  
}

export async function addNewSubject(newSubjectName:string):Promise<boolean> { //figure out how this works!!!
    const accessToken = await getAccessToken()
    if (!accessToken) return false
    let subjectUUID
    let subjectName
    try {
        const responseSubject = await axios.post(
            `${process.env.EXPO_PUBLIC_API_URL}/api/Subject/`,
            {name: newSubjectName}, 
            {headers: {"ngrok-skip-browser-warning": "true", 'Authorization': `Bearer ${accessToken}`}}
        )

        subjectUUID = responseSubject.data['subject_ID']
        subjectName = responseSubject.data['name']

        const responseSubjectInfo = await axios.post(
            `${process.env.EXPO_PUBLIC_API_URL}/api/Subject_Info/`,
            {num_sub_study_items: 6, subject_details: subjectUUID}, 
            {headers: {"ngrok-skip-browser-warning": "true", 'Authorization': `Bearer ${accessToken}`}}
        )
        return true
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.log('Status:', error.response.status);
            console.log('Server says:', JSON.stringify(error.response.data, null, 2));
        } else {
            console.log('Request failed:', error);
        }
        return false
    }
}


























export enum Subjects {
    Chemistry = 'Chemistry',
    Math = 'Math',
    English = 'English',
    Biology = 'Biology',
    Physics = 'Physics',
    Programming = 'Programming',
    History = 'History',
    Psychology = 'Psychology',
    Accounting = 'Accounting',
    Wind_Synphony = 'Wind_Synphony'
}

const formattedDate: string = date.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});

