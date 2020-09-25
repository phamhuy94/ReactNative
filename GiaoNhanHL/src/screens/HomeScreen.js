import React, { useEffect, useState, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Alert, Button, Text, TextInput, View, Dimensions, SafeAreaView, TouchableOpacity,
    StyleSheet,
    ScrollView,
    StatusBar,
    FlatList,
    Image } from 'react-native';

import DataScreen from './DataScreen'
import DetailsScreen from './DetailsScreen'
  
const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
    return (        
        <Stack.Navigator initialRouteName="Data">
            <Stack.Screen name="Data" component={DataScreen} />
            <Stack.Screen name="Chi tiết nhân viên" component={DetailsScreen} />
        </Stack.Navigator>             
      );
}

export default HomeScreen;