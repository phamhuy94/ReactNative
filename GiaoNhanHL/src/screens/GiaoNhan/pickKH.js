import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Picker, Form,Text,View} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
const PickKH = ({listKhachHangNhan, onValueChange}) => {
    return(
        <Form style={styles.contact}>
            <View style={styles.flex}>
            
            <Picker
                mode="dropdown"
                style={[styles.textHeader,{marginRight:5,}]}
                iosHeader="Chọn liên hệ"
                placeholder="Chọn liên hệ "
                placeholderStyle={{color:'#000'}}
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
            </View>
            
        </Form>
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
      flex: {
          flexDirection:'row'
      }
})