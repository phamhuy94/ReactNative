import React, { useEffect, useState, useContext } from 'react';
import {
    Alert, Button, Text, TextInput, View, Dimensions, SafeAreaView, TouchableOpacity,
    StyleSheet,
    ScrollView,
    StatusBar,
    FlatList,
    Image
} from 'react-native';

import ViewDetail from '../components/ViewDetail'

function DetailsScreen({ route, navigation }) {
    const { itemId } = route.params;
    const [username, setUsername] = useState(itemId);
    const [state, setState] = useState([]);

    const LoadAPI = () => {
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
        LoadAPI()
    }, []);

    return (
        <View style={styles.container}>
            <ViewDetail data={state}></ViewDetail>
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>  
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});


export default DetailsScreen