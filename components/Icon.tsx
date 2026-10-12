import { View, Text, ImageSourcePropType, Image } from 'react-native'
import React from 'react'

const Icon = ({source, style}: {source:ImageSourcePropType, style:number}) => {
  return (
    <Image source={source} style={{
        width: style,
        height: style,
        resizeMode: 'contain',
        borderRadius: style / 2,
    }}/>
  )
}

export default Icon