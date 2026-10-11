type userDataType = {
    name: string
    id: number
    email: string

}

export function getUserData():userDataType {
    const userData:userDataType = {
        name: 'Austin Harrison',
        id: 1122255333222,
        email: 'Austin@gmail.com'
    }
    return userData
}