import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Link, useRouter } from 'expo-router'
import DateTimePickerModal from "react-native-modal-datetime-picker"

const StudyHeader = ({filterNewDate} : {filterNewDate: (scrollDate:Date) => void}) => {

    const [scrollDate, setScrollDate] = useState<Date | null>(null)
    const [open, setOpen] = useState(false)

    const router = useRouter()
    const date = new Date()

    function formatDate(date:Date):string {
        return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
        });
    }
    const formattedDate: string = formatDate(date)


    function addNewStudyItem() {
        router.push('/newStudyItem')
    }



  return (
    <View className='items-start justify-center gap-4 mt-2 ml-4 mb-8'>
        <Text className='text-md text-stone-800'>Workspace</Text>
        <Text className='text-4xl font-semibold'>Today's Study Items</Text>
        <View className='flex-row items-center w-full justify-between'>
            <Pressable 
                onPress={() => setOpen(true)}
                className='px-2 py-3 rounded-2xl bg-customButtonBlue hover:bg-customButtonHoverBlue active:bg-customButtonActiveBlue'>
                <Text className='text-stone-100 font-bold'>Date: {scrollDate ? formatDate(scrollDate) : formattedDate} ⏷</Text>
            </Pressable>
            <DateTimePickerModal
                isVisible={open}
                mode="date"
                onConfirm={(date) => {
                    filterNewDate(date)
                    setOpen(false)
                    setScrollDate(date)
                }}
                onCancel={() => setOpen(false)}
            />
            <Pressable
                onPress={addNewStudyItem}
                className='mr-6 bg-customButtonBlue w-14 h-14 rounded-full items-center justify-center hover:bg-customButtonHoverBlue active:bg-customButtonActiveBlue'
            >
                <Text className='text-gray-100 font-bold text-4xl'>+</Text>
            </Pressable>
        </View>
        
    </View>
  )
}

export default StudyHeader