import { Tabs } from "expo-router";
import {Ionicons} from '@react-native-vector-icons/ionicons'
import { HapticTab } from "../../../components/HapticTab";

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#1C02E3',
            tabBarInactiveTintColor: '#070708',
            // tabBarBadge:3,
            animation: 'fade'
        }}>
            <Tabs.Screen name='index' options={{
                tabBarIcon: ({color, size}) => <Ionicons name='home' color={color} size={size}/>,
                tabBarLabel: 'Home'
            }}/>
            <Tabs.Screen name='StudyTracker' options={{
                headerShown: false,
                tabBarLabel: 'Study-Tracker',
                tabBarIcon: ({color, size}) => <Ionicons name='aperture-outline' color={color} size={size}/>
            }} />
            <Tabs.Screen name='custom' options={{
                
            }} 
            listeners={{
                tabPress: (e) => {
                    e.preventDefault()
                }
            }}/>
            <Tabs.Screen name='home' options={{
                headerShown: false,
                tabBarIcon: ({color, size}) => <Ionicons name='cog-outline' color={color} size={size}/>,
                tabBarLabel: 'Settings'
            }} />
        </Tabs>
    )
}