import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs screenOptions={{headerShown: false}}>
            <Tabs.Screen name='index' />
            <Tabs.Screen name='StudyTracker' options={{headerShown: false}} />
            <Tabs.Screen name='home' options={{headerShown: false}} />
            <Tabs.Screen name='study' options={{headerShown: false}} />
            <Tabs.Screen name='studyTracker' options={{href: null}} />
        </Tabs>
    )
}