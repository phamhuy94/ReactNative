import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Picker, Form} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
const PickKH = ({listKhachHangNhan, onValueChange}) => {
    if(listKhachHangNhan != undefined) {
        return(
            <Form style={styles.contact}>
                <Picker
                    mode="dropdown"
                    style={[styles.textHeader,{marginRight:5,}]}
                    iosHeader="Chọn liên hệ"
                    iosIcon={<Icon name="arrow-down" />}
                    selectedValue={listKhachHangNhan}
                    onValueChange={onValueChange}
                    >
                        <Picker.Item label="Chọn liên hệ"/>
                    {listKhachHangNhan.map((item, index) => {
                        return (
                            <Picker.Item label={`${item.TEN_NGUOI_GIAO_NHAN} - ${item.SDT_NGUOI_GIAO_NHAN}`} value={item} key={index} />
                        );
                    })}
                </Picker>
            </Form>
        )
    }
    return (
        <View></View>
    )
};

export default PickKH;
const styles = StyleSheet.create({
    textHeader: {
        flexShrink:1,
        fontSize: 16,
        color: '#444',
        lineHeight:25,
      },
})