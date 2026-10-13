import { ImageSourcePropType } from "react-native"

type userDataType = {
    name: string
    id: number
    email: string
}



type studyItemsType = {
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