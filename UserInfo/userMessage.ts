import { ImageSourcePropType } from "react-native"


export type userMessageSummaryType = {
    username: string,
    id: string
    lastMessage: string,
    timeSinceLastMessage: string
    userPhoto: ImageSourcePropType
    isSeen: boolean
}



export function getUserMessagePageSummaryInfo():userMessageSummaryType[] {

    return [
        {
            username: 'Austin Harrison',
            id: '2345872634598723465',
            lastMessage: 'Hey, good to see you',
            timeSinceLastMessage: '6 Seconds Ago',
            userPhoto: require('../assets/icons/BookIcon.jpg'),
            isSeen: false
        },
        {
            username: 'James Stewert',
            id: '23458726345983465',
            lastMessage: 'What did you get on the math homework last night?',
            timeSinceLastMessage: '12 Minutes Ago',
            userPhoto: require('../assets/icons/BookIcon.jpg'),
            isSeen: false
        },
        {
            username: 'Henry Harolds',
            id: '2435345235465463456',
            lastMessage: 'Why does my name have to start with both Hs',
            timeSinceLastMessage: '4 Hours Ago',
            userPhoto: require('../assets/icons/BookIcon.jpg'),
            isSeen: false
        },
        {
            username: 'Alexander The Great',
            id: '234545456723465',
            lastMessage: 'I have gone from Greece to India and have seen the Kush',
            timeSinceLastMessage: '6 Days Ago',
            userPhoto: require('../assets/icons/BookIcon.jpg'),
            isSeen: false
        },
        {
            username: 'Napoleon the Pig',
            id: '2345872632434523',
            lastMessage: 'Hey! it is illegal in France to name your pet pig Napoleon!!! Change my name immediately',
            timeSinceLastMessage: '4 Weeks Ago',
            userPhoto: require('../assets/icons/BookIcon.jpg'),
            isSeen: false
        },
        {
            username: 'George Washington',
            id: '2345872637465342214523465',
            lastMessage: 'I got us our independence',
            timeSinceLastMessage: '8 Months Ago',
            userPhoto: require('../assets/icons/BookIcon.jpg'),
            isSeen: false
        },
        {
            username: 'Abraham Lincoln',
            id: '234588756790698665',
            lastMessage: 'I made our country and better, more moral place',
            timeSinceLastMessage: '7 Years Ago',
            userPhoto: require('../assets/icons/BookIcon.jpg'),
            isSeen: false
        }

    ]
}