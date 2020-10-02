import React, { useState } from 'react';
import {
    Alert, Button, Text, TextInput, View, Dimensions, SafeAreaView, TouchableOpacity,
    StyleSheet,
    ScrollView,
    StatusBar,
    FlatList,
    Image,
    ImageBackground
} from 'react-native';
import {Picker} from '@react-native-community/picker';

export default function SelectPhongBan({ data,action }) {
    
    const ListPhongBan = [
        {MA_PHONG_BAN:'INTE_HL',TEN_PHONG_BAN:'IT'},
        {MA_PHONG_BAN:'PURC_HL',TEN_PHONG_BAN:'Mua hàng'},
        {MA_PHONG_BAN:'WALO_HL',TEN_PHONG_BAN:'Kho vận'},
        {MA_PHONG_BAN:'SALE_HL',TEN_PHONG_BAN:'Sale'}
    ]

    return(
        <Picker
            selectedValue={data}
            onValueChange={(itemValue, itemIndex) => action(itemValue)}
        >
            {ListPhongBan.map((item, index) => {
                return (<Picker.Item label={item.TEN_PHONG_BAN} value={item.MA_PHONG_BAN} key={index}/>) 
            })}
        </Picker> 
    )   
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'red'
    },
})