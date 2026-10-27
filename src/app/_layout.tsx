import { Stack } from "expo-router";
import '../../global.css';
import { useColorScheme } from 'react-native';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name='(tabs)' options={{headerShown: false}}/>
      <Stack.Screen name='newStudyItem' options={{headerShown: false}}/>
    </Stack>
    );
}
