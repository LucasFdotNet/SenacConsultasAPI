import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard, Image, TouchableOpacity } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { HomeStackSreen } from '../stack/HomeStackSreen';
import { SearchScreen } from '../screens/SearchScreen';
import { MyAccountScreen } from '../screens/MyAccountScreen';
import { SigninScreen } from '../screens/Authentication/Signin';
import { SignupScreen } from '../screens/Authentication/SignupSceen';

export function Protegido() {

    const { logado } = useAuth()

    const Stack = createNativeStackNavigator<any>();
    const Tab = createBottomTabNavigator();

    return (
        <NavigationContainer >
        {
          logado ? (
            <>
              <Tab.Navigator 
                initialRouteName="HomeStack"
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap = "accessibility";

                    if (route.name === "HomeStack") {
                      iconName = "home"
                    } else if (route.name === "Search") {
                      iconName = "search"
                    } else if (route.name === "MyAccount") {
                      iconName = "person"
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                  },
                  tabBarActiveTintColor: '#327dfc',
                  tabBarInactiveTintColor: 'gray',
                  headerShown: false
                  
                  // headerLeft: () => <Image source={require('@expo/../../assets/logo_sus.png')} style={styles.logo} />

                  })
                  
                }
              >
                <Tab.Screen name="HomeStack" component={HomeStackSreen} options={{title: "Inicio"}} />
                {/* <Tab.Screen name="Search" component={SearchScreen} options={{title: "Buscar"}} /> */}
                <Tab.Screen name="MyAccount" component={MyAccountScreen} options={{title: "Minha conta"}} />
              </Tab.Navigator>
            </>
          ) : (
            <>
              <Stack.Navigator initialRouteName="Signin">
                <Stack.Screen name="Signin" component={SigninScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
              </Stack.Navigator>
            </>
          )
        }
      </NavigationContainer>
    )
}