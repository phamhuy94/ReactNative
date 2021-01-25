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
import HomeGiaoNhanScreen from './GiaoNhan/HomeGiaoNhanScreen'
  
const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation }) => {
    return (        
        <Tab.Navigator 
        initialRouteName="Home" 
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Home') {
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
            activeTintColor: '#2179A9',
            inactiveTintColor: 'grey',
            swipeEnabled: true,
          }}>
            <Tab.Screen name="Home" component={HomeGiaoNhanScreen}/>
            <Tab.Screen name="Notifications" component={NotificationsScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>             
      );
}

export default HomeScreen;