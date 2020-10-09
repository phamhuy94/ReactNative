import React, { useEffect, useState, useContext,useCallback } from 'react';
import { Alert, Button, Text, TextInput, View, Dimensions, SafeAreaView, TouchableOpacity,
    StyleSheet,
    ScrollView,
    StatusBar,
    FlatList,
    Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ViewDetail from '../components/ViewDetail'
import {useDispatch,useSelector} from 'react-redux'
import {logout} from '../redux/authentication/action'

const ProfileScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [state, setState] = useState([]);

    const load = async () => {
        AsyncStorage.getItem('userToken').then(result => {
            LoadAPI(result)
        })
    }

    const signOut = useCallback(() => {
        dispatch(logout())
    })

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