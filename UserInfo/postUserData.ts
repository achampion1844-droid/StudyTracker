import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import { getAccessToken } from "./userAuth"
import { studyItemsType, subjectInfoType } from './userInfo'



export async function postNewUserStudyItem(newAssignmentObj:studyItemsType, subjectIdentification:subjectInfoType) {
    const accessToken = await getAccessToken()
    // console.log(newAssignmentObj)
    console.log('subjectId', subjectIdentification)
    if (accessToken) {
        // console.log('Requesting:', `${process.env.EXPO_PUBLIC_API_URL}/api/Subject/${subjectIdentification.id}/`)
        // console.log('hi', subjectIdentification.id)
        // console.log('testing')
        
        try {
            const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/api/Assignment/`, 
                {
                    assignment_name: 'Chem Super Hard Mode', //newAssignmentObj.assignmentName,
                    assignment_description: 'Super duper hard Chem Assignment', //newAssignmentObj.assignmentDescription,
                    remaining_study_sessions: '5',
                    is_Completed: false,
                    subject_id: subjectIdentification.id,
                },
                {
                headers: {
                    "ngrok-skip-browser-warning": "true",
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            console.log('response', response.data)
        
        } catch (error) {
            console.log('Status:', error.response?.status);
            console.log('URL:', error.config?.method, error.config?.url);
            console.log('Server said:', error.response?.data);
            return false
        }
        return true
    } else {
        return false
    }
}