import React, { useEffect, useState } from 'react';
import { View, Text, Button, SafeAreaView, StyleSheet, FlatList, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { useDispatch, useSelector } from 'react-redux'
import { InputFormatNumber } from '../../components/FormatNumber'
import { getListDaNhan,saveUpdateGiaoHang } from '../../redux/GiaoNhan/action'

function XacNhanScreen({ route, navigation }) {
    const { listSelectDaNhan } = route.params;
    const dispatch = useDispatch();

    const [username,setUsername] = useState();
    const [noiDungDeNghi, setNoiDungDeNghi] = useState();
    const [soTien, setSoTien] = useState();

    const updateGiaoHang = async () => {
        let nd = ""
        for(let i = 0;i<listSelectDaNhan.length;i++){
            if(nd == ""){
                nd = listSelectDaNhan[i].SO_CHUNG_TU
            }else{
                nd += "," + listSelectDaNhan[i].SO_CHUNG_TU
            }
        }
        let data = {
            NGUOI_DN: username,
            NOI_DUNG_DNTT: listSelectDaNhan[0].TEN_CONG_TY + "-" + nd + "-" + noiDungDeNghi,
            TONG_TIEN: soTien,
            NGUOI_LAP_PHIEU: username,
            TRUC_THUOC: 'HOPLONG',
        }
        // const response = await dispatch(saveUpdateGiaoHang(data))
        // if(response.indexOf("Thành công")>=0){
        //     Alert.alert(response)
        //     dispatch(getListDaNhan());
        //     navigation.navigate('Danh sách đã nhận')
        // }else{
        //     Alert.alert("Thất bại")
        // }      
    }

    const getToken = async () => { 
        const username = await AsyncStorage.getItem('userToken');
        setUsername(username)
    }

    useEffect(() => {
        getToken()
    }, [])

    return (
        <View>
            <Text>Đề nghị thanh toán</Text>
            <Text>{listSelectDaNhan[0].TEN_CONG_TY}</Text>
            <TextInput
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={setNoiDungDeNghi}
                    value={noiDungDeNghi}
                    placeholder="Nội dung đề nghị"
                    placeholderTextColor="black"/>
            <InputFormatNumber value={soTien} action={setSoTien}></InputFormatNumber>
            {/* <TextInput
                onChangeText={setsoTien}
                value={soTien}
                placeholder="Số tiền"
                placeholderTextColor="black"
            /> */}
            <Button title="Lưu" onPress={() => log()} />
            <Button title="Quay lại" onPress={() => navigation.goBack()} />
        </View>
    );
}

export default XacNhanScreen