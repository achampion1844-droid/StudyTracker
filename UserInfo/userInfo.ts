import { ImageSourcePropType } from "react-native"

type userDataType = {
    name: string
    id: number
    email: string
}



export type studyItemsType = {
    assignmentName: string
    assignmentID: number
    assignmentDescription: string
    dateAdded: string
    remainingStudySessions: number
    subject: string
    icon: ImageSourcePropType
    isCompleted: boolean
    dateaddedObj: Date
}

export function getUserData():userDataType {
    const userData:userDataType = {
        name: 'Austin Harrison',
        id: 1122255333222,
        email: 'Austin@gmail.com'
    }
    return userData
}


const date = new Date()
const formattedDate: string = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
    });

export function getUserStudyItems() {
    const studyItems:studyItemsType[] = [{
        assignmentName: 'Chem 1-1',
        assignmentID: 5432453234523452353452535234,
        assignmentDescription: 'Focused on moles laskdfjaslkdfjslk fsjafl kasjdf alksdfj aslkdf ajsdflka sjdflkas dfjaklsd fjaslkdf jaslkdf jsadklf ajsd',
        dateAdded: formattedDate,
        remainingStudySessions: 2,
        subject: 'Chemistry',
        icon: require('../assets/icons/BookIcon.jpg'),
        isCompleted: false,
        dateaddedObj: date
    },
    {
        assignmentName: 'Chem 1-1',
        assignmentID: 5432453345634845687684765472535234,
        assignmentDescription: 'Focused on moles laskdfjaslkdfjslk fsjafl kasjdf alksdfj aslkdf ajsdflka sjdflkas dfjaklsd fjaslkdf jaslkdf jsadklf ajsd',
        dateAdded: formattedDate,
        remainingStudySessions: 2,
        subject: 'Chemistry',
        icon: require('../assets/icons/BookIcon.jpg'),
        isCompleted: false,
        dateaddedObj: date
    },
{
        assignmentName: 'Chem 1-1',
        assignmentID: 5432453456345634563456786548467946732535234,
        assignmentDescription: 'Focused on moles laskdfjaslkdfjslk fsjafl kasjdf alksdfj aslkdf ajsdflka sjdflkas dfjaklsd fjaslkdf jaslkdf jsadklf ajsd',
        dateAdded: formattedDate,
        remainingStudySessions: 2,
        subject: 'Chemistry',
        icon: require('../assets/icons/BookIcon.jpg'),
        isCompleted: false,
        dateaddedObj: date
    },
{
        assignmentName: 'Chem 1-1',
        assignmentID: 5432453456345764587685632535234,
        assignmentDescription: 'Focused on moles laskdfjaslkdfjslk fsjafl kasjdf alksdfj aslkdf ajsdflka sjdflkas dfjaklsd fjaslkdf jaslkdf jsadklf ajsd',
        dateAdded: formattedDate,
        remainingStudySessions: 2,
        subject: 'Chemistry',
        icon: require('../assets/icons/BookIcon.jpg'),
        isCompleted: false,
        dateaddedObj: date
    },
{
        assignmentName: 'Chem 1-1',
        assignmentID: 543223452346547644532535234,
        assignmentDescription: 'Focused on moles laskdfjaslkdfjslk fsjafl kasjdf alksdfj aslkdf ajsdflka sjdflkas dfjaklsd fjaslkdf jaslkdf jsadklf ajsd',
        dateAdded: formattedDate,
        remainingStudySessions: 2,
        subject: 'Chemistry',
        icon: require('../assets/icons/BookIcon.jpg'),
        isCompleted: false,
        dateaddedObj: date
    },
{
        assignmentName: 'Chem 1-1',
        assignmentID: 5433456345643568674724532535234,
        assignmentDescription: 'Focused on moles laskdfjaslkdfjslk fsjafl kasjdf alksdfj aslkdf ajsdflka sjdflkas dfjaklsd fjaslkdf jaslkdf jsadklf ajsd',
        dateAdded: formattedDate,
        remainingStudySessions: 2,
        subject: 'Chemistry',
        icon: require('../assets/icons/BookIcon.jpg'),
        isCompleted: false,
        dateaddedObj: date
    },
{
        assignmentName: 'Chem 1-1',
        assignmentID: 54324537654765475674652535234,
        assignmentDescription: 'Focused on moles laskdfjaslkdfjslk fsjafl kasjdf alksdfj aslkdf ajsdflka sjdflkas dfjaklsd fjaslkdf jaslkdf jsadklf ajsd',
        dateAdded: formattedDate,
        remainingStudySessions: 2,
        subject: 'Chemistry',
        icon: require('../assets/icons/BookIcon.jpg'),
        isCompleted: false,
        dateaddedObj: date
    },
{
        assignmentName: 'Chem 1-1',
        assignmentID: 543345634563456346345624532535234,
        assignmentDescription: 'Focused on moles laskdfjaslkdfjslk fsjafl kasjdf alksdfj aslkdf ajsdflka sjdflkas dfjaklsd fjaslkdf jaslkdf jsadklf ajsd',
        dateAdded: formattedDate,
        remainingStudySessions: 2,
        subject: 'Chemistry',
        icon: require('../assets/icons/BookIcon.jpg'),
        isCompleted: false,
        dateaddedObj: date
    },
{
        assignmentName: 'Chem 1-1',
        assignmentID: 543245329867967896789678535234,
        assignmentDescription: 'Focused on moles laskdfjaslkdfjslk fsjafl kasjdf alksdfj aslkdf ajsdflka sjdflkas dfjaklsd fjaslkdf jaslkdf jsadklf ajsd',
        dateAdded: formattedDate,
        remainingStudySessions: 2,
        subject: 'Chemistry',
        icon: require('../assets/icons/BookIcon.jpg'),
        isCompleted: false,
        dateaddedObj: date
    },
{
        assignmentName: 'Chem 1-1',
        assignmentID: 5432345634584678764532535234,
        assignmentDescription: 'Focused on moles laskdfjaslkdfjslk fsjafl kasjdf alksdfj aslkdf ajsdflka sjdflkas dfjaklsd fjaslkdf jaslkdf jsadklf ajsd',
        dateAdded: formattedDate,
        remainingStudySessions: 2,
        subject: 'Chemistry',
        icon: require('../assets/icons/BookIcon.jpg'),
        isCompleted: false,
        dateaddedObj: date
    },
{
        assignmentName: 'Chem 1-1',
        assignmentID: 345634584678967,
        assignmentDescription: 'Focused on moles laskdfjaslkdfjslk fsjafl kasjdf alksdfj aslkdf ajsdflka sjdflkas dfjaklsd fjaslkdf jaslkdf jsadklf ajsd',
        dateAdded: formattedDate,
        remainingStudySessions: 2,
        subject: 'Chemistry',
        icon: require('../assets/icons/BookIcon.jpg'),
        isCompleted: false,
        dateaddedObj: date
    },
{
        assignmentName: 'Chem 1-1',
        assignmentID: 5432452345645674658767595432535234,
        assignmentDescription: 'Focused on moles laskdfjaslkdfjslk fsjafl kasjdf alksdfj aslkdf ajsdflka sjdflkas dfjaklsd fjaslkdf jaslkdf jsadklf ajsd',
        dateAdded: formattedDate,
        remainingStudySessions: 2,
        subject: 'Chemistry',
        icon: require('../assets/icons/BookIcon.jpg'),
        isCompleted: false,
        dateaddedObj: date
    },
{
        assignmentName: 'Chem 1-1',
        assignmentID: 543245345643578654832535234,
        assignmentDescription: 'Focused on moles laskdfjaslkdfjslk fsjafl kasjdf alksdfj aslkdf ajsdflka sjdflkas dfjaklsd fjaslkdf jaslkdf jsadklf ajsd',
        dateAdded: formattedDate,
        remainingStudySessions: 2,
        subject: 'Chemistry',
        icon: require('../assets/icons/BookIcon.jpg'),
        isCompleted: false,
        dateaddedObj: date
    },
{
        assignmentName: 'Chem 1-1',
        assignmentID: 543248765785678532535234,
        assignmentDescription: 'Focused on moles laskdfjaslkdfjslk fsjafl kasjdf alksdfj aslkdf ajsdflka sjdflkas dfjaklsd fjaslkdf jaslkdf jsadklf ajsd',
        dateAdded: formattedDate,
        remainingStudySessions: 2,
        subject: 'Chemistry',
        icon: require('../assets/icons/BookIcon.jpg'),
        isCompleted: false,
        dateaddedObj: date
    },
{
        assignmentName: 'Chem 1-1',
        assignmentID: 543245432567532535234,
        assignmentDescription: 'Focused on moles laskdfjaslkdfjslk fsjafl kasjdf alksdfj aslkdf ajsdflka sjdflkas dfjaklsd fjaslkdf jaslkdf jsadklf ajsd',
        dateAdded: formattedDate,
        remainingStudySessions: 2,
        subject: 'Chemistry',
        icon: require('../assets/icons/BookIcon.jpg'),
        isCompleted: false,
        dateaddedObj: date
    },
{
        assignmentName: 'Chem 1-1',
        assignmentID: 543245323423423421232535234,
        assignmentDescription: 'Focused on moles laskdfjaslkdfjslk fsjafl kasjdf alksdfj aslkdf ajsdflka sjdflkas dfjaklsd fjaslkdf jaslkdf jsadklf ajsd',
        dateAdded: formattedDate,
        remainingStudySessions: 2,
        subject: 'Chemistry',
        icon: require('../assets/icons/BookIcon.jpg'),
        isCompleted: false,
        dateaddedObj: date
    },{
        assignmentName: 'Chem 1-1',
        assignmentID: 54324234234235234,
        assignmentDescription: 'Focused on moles laskdfjaslkdfjslk fsjafl kasjdf alksdfj aslkdf ajsdflka sjdflkas dfjaklsd fjaslkdf jaslkdf jsadklf ajsd',
        dateAdded: formattedDate,
        remainingStudySessions: 2,
        subject: 'Chemistry',
        icon: require('../assets/icons/BookIcon.jpg'),
        isCompleted: false,
        dateaddedObj: date
    },]
    return studyItems
}



export type subjectInfoType = {
    icon: ImageSourcePropType
    subjectName: Subjects
    numSubStudyItems: number
    id: string
}

enum Subjects {
    Chemistry = 'Chemistry',
    Math = 'Math',
    English = 'English',
    Biology = 'Biology',
    Physics = 'Physics',
    CompSci = 'CompSci',
    History = 'History',
}


export function getSubjectInfo(): subjectInfoType[] {
    const studyInfoObj:subjectInfoType[] = [
        {
            icon: require('../assets/icons/BookIcon.jpg'),
            subjectName: Subjects.Math,
            numSubStudyItems: 3,
            id: '12344562'
        },
        {
            icon: require('../assets/icons/BookIcon.jpg'),
            subjectName: Subjects.English,
            numSubStudyItems: 3,
            id: '643563456'
        },
        {
            icon: require('../assets/icons/BookIcon.jpg'),
            subjectName: Subjects.Biology,
            numSubStudyItems: 3,
            id: '23452345'
        },
        {
            icon: require('../assets/icons/BookIcon.jpg'),
            subjectName: Subjects.Physics,
            numSubStudyItems: 3,
            id: '123263444562'
        },
        {
            icon: require('../assets/icons/BookIcon.jpg'),
            subjectName: Subjects.CompSci,
            numSubStudyItems: 3,
            id: '56376547'
        },
        {
            icon: require('../assets/icons/BookIcon.jpg'),
            subjectName: Subjects.History,
            numSubStudyItems: 3,
            id: '2345235'
        },
    ]
    return studyInfoObj
}


enum Months {
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

export type dateObjType = {
    id: string
    date: number
    month: Months
    year: number
    lastDayOfMonth: number

}

export function getDateObj():dateObjType[] {
    const dateObj = [
        {
            id: 'asdfasdf',
            date: 1,
            month: Months.Oct,
            year: 2026,
            lastDayOfMonth: 31
        },
        {
            id: 'fdsafsd',
            date: 2,
            month: Months.Oct,
            year: 2026,
            lastDayOfMonth: 31
        },
        {
            id: 'sdfasdgadfg',
            date: 3,
            month: Months.Oct,
            year: 2026,
            lastDayOfMonth: 31
        },
        {
            id: 'asfdfsdfreaw',
            date: 4,
            month: Months.Oct,
            year: 2026,
            lastDayOfMonth: 31
        },
        {
            id: 'bfdsdfsg',
            date: 5,
            month: Months.Oct,
            year: 2026,
            lastDayOfMonth: 31
        },
        {
            id: 'gqregerg',
            date: 6,
            month: Months.Oct,
            year: 2026,
            lastDayOfMonth: 31
        },
        {
            id: 'asdfasgheqrg',
            date: 7,
            month: Months.Oct,
            year: 2026,
            lastDayOfMonth: 31
        },
        {
            id: 'uerythdfg',
            date: 8,
            month: Months.Oct,
            year: 2026,
            lastDayOfMonth: 31
        },
        {
            id: 'wrterwretertwet',
            date: 9,
            month: Months.Oct,
            year: 2026,
            lastDayOfMonth: 31
        },
        {
            id: 'hdgfhfghdf',
            date: 10,
            month: Months.Oct,
            year: 2026,
            lastDayOfMonth: 31
        },
        {
            id: 'wertweshd',
            date: 11,
            month: Months.Oct,
            year: 2026,
            lastDayOfMonth: 31
        },
        {
            id: 'ghhjdmhgm',
            date: 12,
            month: Months.Oct,
            year: 2026,
            lastDayOfMonth: 31
        },
        {
            id: 'ugfdhdfhsdfg',
            date: 13,
            month: Months.Oct,
            year: 2026,
            lastDayOfMonth: 31
        },
        {
            id: 'irudtyhdfghgdf',
            date: 14,
            month: Months.Oct,
            year: 2026,
            lastDayOfMonth: 31
        },
        {
            id: 'puyoioikgfjghj',
            date: 15,
            month: Months.Oct,
            year: 2026,
            lastDayOfMonth: 31
        },
        {
            id: 'wertrsgdfgsdfdsfg',
            date: 16,
            month: Months.Oct,
            year: 2026,
            lastDayOfMonth: 31
        },
        {
            id: 'wtqtewqthsdhf',
            date: 17,
            month: Months.Oct,
            year: 2026,
            lastDayOfMonth: 31
        },
        {
            id: 'ytrhsfgsdfter',
            date: 18,
            month: Months.Oct,
            year: 2026,
            lastDayOfMonth: 31
        },
        {
            id: 'qertdhsdfgsd',
            date: 19,
            month: Months.Oct,
            year: 2026,
            lastDayOfMonth: 31
        },
        {
            id: 'ywetgdsgfdgsdfg',
            date: 20,
            month: Months.Oct,
            year: 2026,
            lastDayOfMonth: 31
        },
        {
            id: 'dgfsgfdsgaeffas',
            date: 21,
            month: Months.Oct,
            year: 2026,
            lastDayOfMonth: 31
        },
        {
            id: 'gafdgsdafsdfas',
            date: 22,
            month: Months.Oct,
            year: 2026,
            lastDayOfMonth: 31
        },
        {
            id: 'gqreregdfg',
            date: 23,
            month: Months.Oct,
            year: 2026,
            lastDayOfMonth: 31
        },
        {
            id: 'iyfgughdhfhs',
            date: 24,
            month: Months.Oct,
            year: 2026,
            lastDayOfMonth: 31
        },
        {
            id: 'wertwegdsgfcx',
            date: 25,
            month: Months.Oct,
            year: 2026,
            lastDayOfMonth: 31
        },
        {
            id: 'hdfsgfsgdxzfdgsdfg',
            date: 26,
            month: Months.Oct,
            year: 2026,
            lastDayOfMonth: 31
        },
        {
            id: 'rstrdgshfghdfggfs',
            date: 27,
            month: Months.Oct,
            year: 2026,
            lastDayOfMonth: 31
        },
        {
            id: 'fshdfgsfdgxc',
            date: 28,
            month: Months.Oct,
            year: 2026,
            lastDayOfMonth: 31
        },
        {
            id: 'udtfyhfghd',
            date: 29,
            month: Months.Oct,
            year: 2026,
            lastDayOfMonth: 31
        },
        {
            id: 'wergfdsgfghgc',
            date: 30,
            month: Months.Oct,
            year: 2026,
            lastDayOfMonth: 31
        },
        {
            id: 'sdfgdgfasdraetras',
            date: 31,
            month: Months.Oct,
            year: 2026,
            lastDayOfMonth: 31
        }
    ]
    return dateObj
}