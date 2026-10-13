import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const ToggleButton = () => {
    const [toggle, setToggle] = useState(false)


  return (
    <View>
      <TouchableOpacity
        accessibilityRole='checkbox'
        accessibilityState={{checked: toggle}}
        onPress={() => setToggle(!toggle)}
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