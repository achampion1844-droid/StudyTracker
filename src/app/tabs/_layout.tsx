import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen name='index' />
            <Tabs.Screen name='about' options={{headerShown: false}} />
            <Tabs.Screen name='home' options={{headerShown: false}} />
            <Tabs.Screen name='study' options={{headerShown: false}} />
        </Tabs>
    )
}