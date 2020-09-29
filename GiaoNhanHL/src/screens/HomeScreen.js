import React, { useEffect, useState, useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Alert, Button, Text, TextInput, View, Dimensions, SafeAreaView, TouchableOpacity,
    StyleSheet,
    ScrollView,
    StatusBar,
    FlatList,
    Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'

import DataScreen from './DataScreen'
import ProfileScreen from './ProfileScreen'
import NotificationsScreen from './NotificationsScreen'
  
const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation }) => {
    return (        
        <Tab.Navigator 
        initialRouteName="Data" 
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Data') {
                iconName = 'home'
              } else if (route.name === 'Profile') {
                iconName = 'user'
              } else if (route.name === 'Notifications') {
                iconName = 'bell'
              }
    
              const myIcon = <Icon name={iconName} size={size} color={color} />;
    
              // You can return any component that you like here!
              return myIcon;
    
            },
          })}
          tabBarOptions={{
            activeTintColor: 'deepskyblue',
            inactiveTintColor: 'grey',
            swipeEnabled: true,
          }}>
            <Tab.Screen name="Data" component={DataScreen}/>
            <Tab.Screen name="Notifications" component={NotificationsScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>             
      );
}

export default HomeScreen;