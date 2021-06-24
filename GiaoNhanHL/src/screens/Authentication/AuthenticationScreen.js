
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Provider, useDispatch, useSelector } from 'react-redux'

import SignInScreen from './SignInScreen'
import MainScreen from '../MainScreen'
import SplashScreen from '../SplashScreen'
import { getToken } from '../../redux/authentication/action'

const Stack = createStackNavigator();

export default function Authentication() {
    const dispatch = useDispatch();
    const isLoading = useSelector((store) => store.authentication.isLoading);
    const userToken = useSelector((store) => store.authentication.userToken);

    useEffect(() => {
        dispatch(getToken());
    }, []);
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {isLoading ? (
                    <Stack.Screen name="Splash" component={SplashScreen} />
                ) : userToken == null ? (
                    <Stack.Screen
                        name="SignIn"
                        component={SignInScreen}
                        options={{title: 'Đăng nhập'}}
                    />
                    
                ) : (
                        <Stack.Screen name="Main" component={MainScreen} />
                    )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}