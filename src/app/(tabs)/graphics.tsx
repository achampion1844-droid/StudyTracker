import { View, Text, Animated, Button, PanResponder, Pressable } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function graphics() {
    
    const fadeAnim = useRef(new Animated.Value(0)).current //dial that starts at 0 but can increase in value
    useEffect(() => {
        Animated.timing(fadeAnim, { //Animated.timing smoothly changes the first value placed inside of it
            toValue: 1, //this is the ending value that Animated.Value goes to
            duration: 2100,  //how long it takes from the starting value to the ending value
            useNativeDriver: true //use the mobile devices native hardware
        }).start() //.start() triggers that activation of the function
    },[])

    const [alreadyMoved, setAlreadyMoved] = useState(false)
    const positionX = useRef(new Animated.Value(0)).current
    const moveBox = () => {
        if (!alreadyMoved) {
            Animated.timing(positionX, {
                toValue: 300,
                duration: 500,
                useNativeDriver: true
            }).start(({finished}) => {
                if (finished) {
                    console.log('finished')
                }
            })
        } else {
            Animated.timing(positionX, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true
            }).start(({finished}) => {
                if (finished) {
                    console.log('finished')
                }
            })
        }
        setAlreadyMoved(prev => !prev)
    }


    const [isMovingBlueBox, setIsMovingBlueBox] = useState(false)
    const movingBlueBox = useRef(new Animated.Value(0)).current
    function moveBlueBox() {
        if (!isMovingBlueBox) {
            Animated.timing(movingBlueBox, {
                toValue: 400,
                duration: 2000,
                useNativeDriver: true
            }).start()
        }
        else {
            Animated.timing(movingBlueBox, {
                toValue:0,
                duration: 2000,
                useNativeDriver: true
            }).start()
        }
        setIsMovingBlueBox(prev => !prev)
    }


    const position = useRef(new Animated.ValueXY()).current; // keeps track of the x and y coord of this ref
    const [dragging, setDragging] = useState(false);
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true, //this one tells react when the ref is click that this code should handle the response and nothing else
            onMoveShouldSetPanResponder: () => true, //this one tells react when the ref is click that this code should handle the response and nothing else
            onPanResponderGrant: () => { //tells possition to remember whatever the coord are that the modal is at right now
                setDragging(true)
                position.extractOffset() // function tells position where is it and to remember the coord that extractOffset provides
            },
            onPanResponderMove: Animated.event( //when the ref is moved is triggers an event where the position x and y values are in relation to the previous calculation
                [null, {dx: position.x, dy: position.y}],
                { useNativeDriver: false }
            ),
            onPanResponderRelease: () => {
                setDragging(false)
                position.flattenOffset() //remembers the exact position the ref in is now by remember the extractOffset() and adding the dx and dy and saving this
            },
        })
    ).current;



    const variablePosition = useRef(new Animated.ValueXY()).current
    const [isMoving, setIsMoving] = useState(false)
    const panResponderTwo = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                setIsMoving(true)
                variablePosition.extractOffset()
            },
            onPanResponderMove: Animated.event([null, {dx: variablePosition.x, dy: variablePosition.y}], {
                useNativeDriver: false
            }),
            onPanResponderRelease: () => {
                setIsMoving(false)
                variablePosition.flattenOffset()
            }
        })
    ).current

  return (
    <View>
      <SafeAreaView>
        <Animated.View style={{opacity: fadeAnim}}>
            <View style={{width:200, height:200, backgroundColor: 'blue'}}/>
        </Animated.View>

        <Animated.View style={{transform: [{translateX:positionX},{translateY:positionX}] }}>
            <View style={{width:100, height: 100, backgroundColor: 'red'}} />
        </Animated.View>
        <Button title='MoveBox' onPress={moveBox} />

        <Animated.View style={{transform: [{translateX:movingBlueBox}] }}>
            <Pressable onPress={moveBlueBox}>
                <View style={{height:100, width:100, backgroundColor:'purple'}} />
            </Pressable>
        </Animated.View>

        <Animated.View
            style={[
                {width:100, height:100, backgroundColor:'blue', borderRadius:50},
                {
                    transform: position.getTranslateTransform(), //don't know what this does
                    opacity: dragging ? 0.8 : 1,
                },
            ]}
            {...panResponder.panHandlers}
        >
        </Animated.View>

        <Animated.View style={[
            {width: 100, height: 100, backgroundColor:'green'},
            {
                transform: variablePosition.getTranslateTransform(),
                opacity: isMoving ? .6 : 1
            }
        ]}
            {...panResponderTwo.panHandlers}
        >
            

        </Animated.View>

      </SafeAreaView>
    </View>
  )
}