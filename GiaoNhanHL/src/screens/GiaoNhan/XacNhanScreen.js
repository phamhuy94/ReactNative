import { CheckBox } from 'native-base';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, SafeAreaView, StyleSheet, FlatList, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { useDispatch, useSelector } from 'react-redux'
import { getListDaNhan,saveUpdateGiaoHang } from '../../redux/GiaoNhan/action'

function XacNhanScreen({ route, navigation }) {
    const { listSelectDaNhan } = route.params;
    const dispatch = useDispatch();

    const [username,setUsername] = useState();
    const [nguoiNhanHang, setNguoiNhanHang] = useState();
    const [sdtNguoiNhanHang, setSdtNguoiNhanHang] = useState();
    const [ghiChu, setGhiChu] = useState();
    const [chuyenLoaiThanhToan, setChuyenLoaiThanhToan] = useState();
    const [daGiaoHang, setDaGiaoHang] = useState();
    const [daLayHang, setDaLayHang] = useState();

    const updateGiaoHang = async () => {
        let data = {
            ChiTiet: listSelectDaNhan,
            DA_GIAO_HANG: daGiaoHang,
            DA_LAY_HANG: daLayHang,
            TEN_KHACH_KY_NHAN: nguoiNhanHang,
            SDT_KHACH_KY_NHAN: sdtNguoiNhanHang,
            DA_THU_TIEN_HANG: !chuyenLoaiThanhToan,
            CHUYEN_LOAI_THANH_TOAN: chuyenLoaiThanhToan,
            GHI_CHU: ghiChu,
            username : username
        }
        const response = await dispatch(saveUpdateGiaoHang(data))
        if(response.indexOf("Thành công")>=0){
            Alert.alert(response)
            dispatch(getListDaNhan());
            navigation.navigate('Danh sách đã nhận')
        }else{
            Alert.alert("Thất bại")
        }
        
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
            <Text>Xác nhận giao/lấy hàng</Text>
            <Text>{listSelectDaNhan[0].TEN_CONG_TY}</Text>
            <TextInput
                onChangeText={setNguoiNhanHang}
                value={nguoiNhanHang}
                placeholder="Người nhận hàng"
                placeholderTextColor="black"
            />
            <TextInput
                onChangeText={setSdtNguoiNhanHang}
                value={sdtNguoiNhanHang}
                placeholder="SDT Người nhận hàng"
                placeholderTextColor="black"
            />
            <TextInput
                onChangeText={setGhiChu}
                value={ghiChu}
                placeholder="Ghi chú"
                placeholderTextColor="black"
            />
            <View style={{ flexDirection: 'row' }}>
                <Text>Chuyển loại thanh toán</Text>
                <CheckBox
                    onPress={() => setChuyenLoaiThanhToan(!chuyenLoaiThanhToan)}
                    checked={chuyenLoaiThanhToan}
                />
            </View>
            {
                listSelectDaNhan[0].LOAI === 'GIAO_HANG' && 
                (
                    <View style={{ flexDirection: 'row' }}>
                        <Text>Xác nhận giao hàng</Text>
                        <CheckBox
                            onPress={() => setDaGiaoHang(!daGiaoHang)}
                            checked={daGiaoHang}
                        />
                    </View>
                )
            }
            {
                (listSelectDaNhan[0].LOAI != 'GIAO_HANG') && 
                (
                    <View style={{ flexDirection: 'row' }}>
                        <Text>Xác nhận lấy hàng</Text>
                        <CheckBox
                            onPress={() => setDaLayHang(!daLayHang)}
                            checked={daLayHang}
                        />
                    </View>
                )
            }
            <Button title="Lưu" onPress={() => updateGiaoHang()} />
            <Button title="Quay lại" onPress={() => navigation.goBack()} />
        </View>
    );
}

export default XacNhanScreen