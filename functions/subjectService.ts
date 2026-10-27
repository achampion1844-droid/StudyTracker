// import { Subjects } from "../UserInfo/userInfo";

// let subjects:any = []

// export async function loadSubjectsFromBackend() {
//     try {
//         const response = await fetch('http://127.0.0.1:8000/api/Subject/')
//         const data = await response.json()

//         subjects = data
//         console.log('Subjects loaded:', subjects)
//     } catch(error) {
//         console.error("Failed to load subjects:", error)
//     }
// }

// export function getAllSubjects() {
//     return subjects
// }

// export function isValidSubject(name:any) {
//     return Object.values(Subjects).includes(name)
// }