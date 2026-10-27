import { ImageSourcePropType } from "react-native"
import axios from 'axios'


const date = new Date()





export type userDataType = {
    name: string
    id: number
    email: string
}

export type studyItemsType = {
    assignmentName: string
    assignmentID: string
    assignmentDescription: string
    dateAdded: string
    remainingStudySessions: number
    subject: Subjects
    icon: ImageSourcePropType
    isCompleted: boolean
    dateaddedObj: Date
    dateStartedId: string
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
    subjectName: Subjects
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




// export enum Subjects





export function getUserData():userDataType {
    const userData:userDataType = {
        name: 'Austin Harrison',
        id: 1122255333222,
        email: 'Austin@gmail.com'
    }
    return userData
}



export function isValidSubject(name:any) {
    return Object.values(Subjects).includes(name)
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
            id: String(String(year) + "-" + String(numMonth) + '-' + String(i)),
            date: i,
            month: month,
            year: year,
            lastDayOfMonth: lastDay
        })
    }
    return dateObj
}



export async function getSubjectInfo(): Promise<subjectInfoType[]>  {
    let responses:SubjectApiInfoType[] = []
    const studyInfoObj:subjectInfoType[] = []
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/Subject_Info/')
        responses = response.data
    } catch(error) {
        console.log(error)
    }
    responses.forEach((response) => {
        const subjectName = response.subject_name.name as Subjects
        if (isValidSubject(subjectName)) {
            studyInfoObj.push({
                icon: response.icon ? {uri: response.icon} : require('../assets/icons/BookIcon.jpg'),
                subjectName: subjectName,
                numSubStudyItems: Number(response.num_sub_study_items),
                id: response.id,
            })
        }
    })
    return studyInfoObj
}



export async function getUserStudyItems(newStudySession?:studyItemsType): Promise<studyItemsType[]> {
    let userStudyObjNew:studyItemsType[] = []
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/Assignment/')
        const responses:studyItemsAPICallType[] = response.data
        responses.map((response) => {
            const subjectName = response.subject.name as Subjects
            if (isValidSubject(subjectName)) {
                userStudyObjNew?.push({
                assignmentName: response.assignment_name,
                assignmentID: String(response.assignment_ID),
                assignmentDescription: response.assignment_description,
                dateAdded: (response.date_started),
                remainingStudySessions: Number(response.remaining_study_sessions),
                subject: subjectName,
                icon: response.icon ? {uri: response.icon} : require('../assets/icons/BookIcon.jpg'),
                isCompleted: Boolean(response.is_Completed),
                dateaddedObj: new Date(response.date_started),
                dateStartedId: String(response.date_started),
                })
            }
        })
    } catch (error) {
        console.log('error')
        console.error(error)
    }
    return userStudyObjNew
}




































// const formattedDate: string = date.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});
// export function getUserStudyItemss(newStudySession?:studyItemsType):studyItemsType[] {
//     let studyItems:studyItemsType[] = [{
//         assignmentName: 'Chem 3-2',
//         assignmentID: '5433452535234',
//         assignmentDescription: 'extremely tricky namings',
//         dateAdded: formattedDate,
//         remainingStudySessions: 3,
//         subject: Subjects.Physics,
//         icon: require('../assets/icons/BookIcon.jpg'),
//         isCompleted: false,
//         dateaddedObj: date,
//         dateStartedId: 'qertdhsdfgsd'
//     },
//     {
//         assignmentName: 'Psyche 1-1',
//         assignmentID: '535234',
//         assignmentDescription: 'Human development',
//         dateAdded: formattedDate,
//         remainingStudySessions: 1,
//         subject: Subjects.Psychology,
//         icon: require('../assets/icons/BookIcon.jpg'),
//         isCompleted: false,
//         dateaddedObj: date,
//         dateStartedId: 'qertdhsdfgsd'
//     },
//     {
//         assignmentName: 'Chem 1-1',
//         assignmentID: '4234234565234',
//         assignmentDescription: 'Focused on moles laskdfjaslkdfjslk fsjafl kasjdf alksdfj aslkdf ajsdflka sjdflkas dfjaklsd fjaslkdf jaslkdf jsadklf ajsd',
//         dateAdded: formattedDate,
//         remainingStudySessions: 2,
//         subject: Subjects.Chemistry,
//         icon: require('../assets/icons/BookIcon.jpg'),
//         isCompleted: false,
//         dateaddedObj: date,
//         dateStartedId: 'qertdhsdfgsd'
//     },]
//     return studyItems
// }

// export function getDateObjj():dateObjType[] {
//     const dateObj = [
//         {
//             id: 'asdfasdf',
//             date: 1,
//             month: Months.Oct,
//             year: 2026,
//             lastDayOfMonth: 31
//         },
//         {
//             id: 'fdsafsd',
//             date: 2,
//             month: Months.Oct,
//             year: 2026,
//             lastDayOfMonth: 31
//         },
//     ]
//     return dateObj
// }

// export function getSubjectInfoo(): subjectInfoType[] {
//     const studyInfoObj:subjectInfoType[] = [
//         {
//             icon: require('../assets/icons/BookIcon.jpg'),
//             subjectName: Subjects.Math,
//             numSubStudyItems: 3,
//             id: '12344562'
//         },
//         {
//             icon: require('../assets/icons/BookIcon.jpg'),
//             subjectName: Subjects.Chemistry,
//             numSubStudyItems: 3,
//             id: '543212'
//         },
//     ]
//     return studyInfoObj
// }