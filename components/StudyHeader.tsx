import { View, Text, Pressable, Platform, Modal, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useRouter } from 'expo-router'
import DateTimePicker from '@react-native-community/datetimepicker';

const StudyHeader = ({filterNewDate, name} : {filterNewDate: (scrollDate:Date) => void, name:string}) => {

    const [scrollDate, setScrollDate] = useState<Date | null>(null)
    const [open, setOpen] = useState(false)
    const [formattedDate, setFormattedDate] = useState<string>('')

    const router = useRouter()

    function formatDate(date:Date):string {
        return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
        });
    }
   
    useEffect(() => {
        setFormattedDate(formatDate(new Date()))
    }, [])

    function addNewStudyItem() {
        router.push('/newStudyItem')
    }

    const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setOpen(false);
    }
    if (selectedDate) {
      filterNewDate(selectedDate)
      setScrollDate(selectedDate)
    }
  }



  return (
    <View className='items-start justify-center gap-4 mt-2 ml-4 mb-8'>
        <Text className='text-md text-stone-800'>Workspace</Text>
        <Text className='text-4xl font-semibold'>Today's Study Items</Text>
        <Text className='text-4xl font-semibold py-0 -my-4'>{name}</Text>
        <View className='flex-row items-center w-full justify-between'>
            <Pressable 
                onPress={() => setOpen(true)}
                className='px-2 py-3 rounded-2xl bg-customButtonBlue hover:bg-customButtonHoverBlue active:bg-customButtonActiveBlue'>
                <Text className='text-stone-100 font-bold'>Date: {scrollDate ? formatDate(scrollDate) : formattedDate} ⏷</Text>
            </Pressable>
            
            <Pressable
                onPress={addNewStudyItem}
                className='mr-6 bg-customButtonBlue w-14 h-14 rounded-full items-center justify-center hover:bg-customButtonHoverBlue active:bg-customButtonActiveBlue'
            >
                <Text className='text-gray-100 font-bold text-4xl'>+</Text>
            </Pressable>
        </View>
            {open && (
                <Modal
                    transparent={true} //makes the modal transparent
                    visible={open} //open determines when the modal is visible
                    animationType='slide' //animationType determines what the animation is when the modal appears and vanishes
                    onRequestClose={() => { //determines what the modal does when closing
                        setOpen(false)
                    }}
                >
                    <View className='h-full w-full justify-end items-center'>
                        <Pressable className='w-full h-full' onPress={() => setOpen(false)}>
                            <View className='w-full h-full'>

                            </View>
                        </Pressable>
                        
                        <View className='bg-black h-fit w-full pb-6 rounded-2xl justify-end items-center'>
                            <DateTimePicker 
                                value={scrollDate || new Date()} //value is the value of the datetimepicker and if there is no scroll data then it sets itself as today's date
                                mode='date' //I don't know what mod is but I assime is sets this picker to date
                                display={Platform.OS === 'ios' ? 'spinner' : 'default'} // sets different types of datetikepicker for different os
                                onChange={handleDateChange} //what happens when the value of the  datetimepicker changes
                            /> 
                            <Button title='Done' onPress={() => setOpen(false)}/>
                        </View>
                       
                    </View>
                </Modal>
                
            )}
        
    </View>
  )
}

export default StudyHeader