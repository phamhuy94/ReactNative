import React from 'react';
import {
    StyleSheet,
} from 'react-native';
import {Picker} from 'native-base';

export default function SelectPhongBan({ data,action }) {
    
    const ListPhongBan = [
        {MA_PHONG_BAN:'INTE_HL',TEN_PHONG_BAN:'IT'},
        {MA_PHONG_BAN:'PURC_HL',TEN_PHONG_BAN:'Mua hàng'},
        {MA_PHONG_BAN:'WALO_HL',TEN_PHONG_BAN:'Kho vận'},
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