import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { futureStudiesObjType } from '../UserInfo/userInfo'

const ToggleButton = ({assignmentId, finishedAssignment, alreadyCompletedAssignment, extraDates, activeID}: {assignmentId:string, finishedAssignment: (assignmentId:string, toggle:boolean) => void, alreadyCompletedAssignment:boolean, extraDates:futureStudiesObjType, activeID:string}) => {
  const [toggle, setToggle] = useState<boolean | undefined>()

  function togglePressed() {
    finishedAssignment(assignmentId, !toggle)
    setToggle(!toggle)
  }

  // creates a toggleable button on each assigment block that when pressed
  // changed from white to black to indicate completion of the assignment
  useEffect(() => {
    const pair: [string,boolean] | undefined= Object.values(extraDates).find(pair => pair[0] === activeID)
    if (pair) setToggle(pair[1])
  },[activeID, extraDates])

  return (
    <View>
      <TouchableOpacity
        accessibilityRole='checkbox'
        accessibilityState={{checked: toggle}}
        onPress={togglePressed}
        className='border-[3px] border-stone-900 h-8 w-8 rounded-lg'
        style={{backgroundColor: toggle ? 'black': 'white'}}
        activeOpacity={0.6}
        >
        <Text></Text>
      </TouchableOpacity>
    </View>
  )
}

export default ToggleButton