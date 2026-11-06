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
    if (accessToken) {
        try {
        const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/Assignment/`, {
            headers: {
                "ngrok-skip-browser-warning": "true",
                'Authorization': `Bearer ${accessToken}`
            }
        })
        const responses:studyItemsAPICallType[] = response.data
        responses.map((response) => {
                userStudyObjNew?.push({
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
                extraDates: response.extra_dates

            })
        })
        } catch (error) {
            console.log('getAllEarliestDateObj')
            console.error(error)
        }

        const earliestStudyObj = userStudyObjNew.reduce((earliest, current) => {
            return new Date(current.dateAdded) < new Date(earliest.dateAdded) ? current : earliest
        })
        return earliestStudyObj
    } else {
        return false
    }
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
    if (accessToken)  {
        try {
            const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/Subject_Info/`, {
                headers: {
                    "ngrok-skip-browser-warning": "true",
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            responses = response.data
        } catch(error) {
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
    } else {
        return false
    }
}



export async function getUserStudyItems(newStudySession?:studyItemsType): Promise<studyItemsType[] | false> {
    let userStudyObjNew:studyItemsType[] = []
    const accessToken = await getAccessToken()
    if (accessToken) {
        try {
        const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/Assignment/`, {
            headers: {
                "ngrok-skip-browser-warning": "true",
                'Authorization': `Bearer ${accessToken}`
            }
        })
        const responses:studyItemsAPICallType[] = response.data
        responses.map((response) => {
                userStudyObjNew?.push({
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
                extraDates: response.extra_dates,
            })
        })
        } catch (error) {
            console.log('Status:', error.response.status);
            console.log('Error data:', error.response.data);
            console.log('error at getUserStudyItem')
            return false
        }
        return userStudyObjNew
    } else {
        return false
    }
    
}



export async function getSubjectList(): Promise<SubjectName[] | false> {
    let names: SubjectName[] = []
    const accessToken = await getAccessToken()
    if (accessToken) {
        try {
            const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/Subject/`, {
                headers: {
                    "ngrok-skip-browser-warning": "true",
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            
            const values = response.data.map((value:SubjectApiType) => {
                names.push({name: value.name})
            })
        } catch (error) {
            console.log('error at getSubjectList')
            console.error(error)
        }
        return names
    } else {
        return false
    }
}



export async function getUserData():Promise<userDataType | false> {
    const accessToken = await getAccessToken()
    if (accessToken) {
        let userData: userDataType = {
                name: '',
                id: '',
                email: '',
            }
        try {
            const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/auth/user/`, {
                headers: {
                    "ngrok-skip-browser-warning": "true",
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            userData = {
                name: response.data['username'],
                id: response.data['pk'],
                email: response.data['email'],
            }
            
        } catch(error) {
            console.log('user data error', error)
        }
        return userData
    } else {
        return false
    }
}






export async function addNewAssignment() {
    const accessToken = await getAccessToken()
    if (accessToken) {
        try {
            const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/Subject/`, {
                headers: {
                    "ngrok-skip-browser-warning": "true",
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            // console.log('hit the api backend')
            // console.log(response.data)
            const chemStudySubject:SubjectApiType[] = response.data.filter(subject => subject['name'] === 'Chemistry')
            // console.log(chemStudySubject)
            const chemSubjectID = chemStudySubject[0]['subject_ID']
            // console.log(chemSubjectID)

            try {
                const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/api/Assignment/`,
                    {
                        assignment_name: 'chemistry',
                        assignment_description: 'moles',
                        remainingStudySessions: '5',
                        isCompleted: false,
                        subject_id: chemSubjectID
                    },
                    {
                    headers: {
                        "ngrok-skip-browser-warning": "true",
                        'Authorization': `Bearer ${accessToken}`
                    }
                })
                // console.log(response.data)
            } catch(error) {
                console.log('Status:', error.response.status);
                console.log('Error data:', error.response.data);
            }

        } catch (error) {
            console.log('Status:', error.response.status);
            console.log('Error data:', error.response.data);
        }

    } else {
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

