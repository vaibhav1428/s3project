import {  StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ScreenOne from './src/screens/ScreenOne';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ScreenTwo from './src/screens/ScreenTwo';
import ScreenThree from './src/screens/ScreenThree';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaProvider>
           <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="screenone" component={ScreenOne}  />
          <Stack.Screen name="screenTwo" component={ScreenTwo}  />
          <Stack.Screen name="screenThree" component={ScreenThree}  />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
 

  )
}

export default App

const styles = StyleSheet.create({})