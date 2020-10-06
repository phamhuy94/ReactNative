import React, { useEffect, useState, useContext } from 'react';
import { Alert, Button, Text, TextInput, View, Dimensions, SafeAreaView, TouchableOpacity,
    StyleSheet,
    ScrollView,
    StatusBar,
    FlatList,
    Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ViewDetail from '../components/ViewDetail'

const ProfileScreen = ({ navigation }) => {
    const [state, setState] = useState([]);

    const load = async () => {
        AsyncStorage.getItem('userToken').then(result => {
            LoadAPI(result)
        })
    }

    const LoadAPI = (username) => {
        const url = 'http://sales.hoplong.com/api/Api_NhanVien/GetChiTietNhanVien/' + username;
        fetch(url)
            .then(res => res.json())
            .then(res => {
                setState(res)
            })
            .catch(error => {

            });
    }

    useEffect(() => {
        load()
    }, [])

    return (
        <View style={styles.container}>
            <ViewDetail data={state}></ViewDetail>
            <Button title="Sign out" onPress={signOut} />
        </View>       
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default ProfileScreen;