
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from "react-navigation";
import { createStackNavigator } from '@react-navigation/stack';

import { Provider, useDispatch, useSelector } from 'react-redux'

import SignInScreen from '../Authentication/SignInScreen'
import MainScreen from '../MainScreen'
import SplashScreen from '../SplashScreen'
import { getToken } from '../../redux/authentication/action'

const Stack = createStackNavigator();

export default function Authentication() {
    const dispatch = useDispatch();
    const isLoading = useSelector((store) => store.authentication.isLoading);
    const userToken = useSelector((store) => store.authentication.userToken);
    const isSignout = useSelector((store) => store.authentication.isSignout);

    useEffect(() => {
        dispatch(getToken());
    }, []);
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {isLoading ? (
                    // We haven't finished checking for the token yet
                    <Stack.Screen name="Splash" component={SplashScreen} />
                ) : userToken == null ? (
                    // No token found, user isn't signed in
                    <Stack.Screen
                        name="SignIn"
                        component={SignInScreen}
                        options={{
                            title: 'Đăng nhập',
                            // When logging out, a pop animation feels intuitive
                            animationTypeForReplace: isSignout ? 'pop' : 'push',
                        }}
                    />
                ) : (
                            // User is signed in
                            <Stack.Screen name="Main" component={MainScreen} />
                        )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}