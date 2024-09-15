import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';
import { HomeScreen } from './src/screens/HomeScreen';


import { SignupScreen } from './src/screens/Authentication/SignupSceen';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SigninScreen } from './src/screens/Authentication/Signin';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SearchScreen } from './src/screens/SearchScreen';
import { MyAccountScreen } from './src/screens/MyAccountScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import { HomeStackSreen } from './src/stack/HomeStackSreen';
import { AuthProvider, useAuth } from './src/components/context/AuthContext';
import { Protegido } from './src/components/Protegido';



type RootStackNavigatorAuthentication = {
  Signin: undefined;
  Signup: undefined;
}

export default function App() {


  return (
    <AuthProvider>
      <Protegido />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 30,
    width: 30
  }
});
