import React from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList,Dimensions } from 'react-native';
import moment from 'moment';

const XacNhanTable = ({data, checkIcon}) => {
    return (
        <ScrollView horizontal={true}>
            <View style={styles.container}>
                <View style={styles.listWrapper}>
                    <Text style={[styles.rowHeader,{width:140}]}>Ngày</Text>
                    <Text style={[styles.rowHeader,{width:140}]}>Ngày xác nhận</Text>
                    <Text style={[styles.rowHeader,{width:400}]}>Nội dung</Text>
                </View>
                <FlatList
                    // initialNumToRender={6}
                    data={data}
                    renderItem={({item, index}) => (
                        <View style={styles.listWrapper}>
                            <Text style={[styles.row,{width:140}]}>{moment(item.NGAY_LAM_DON).format('DD/MM/YYYY')}</Text>
                            <Text style={[styles.row,{width:140}]}>{item.NGAY_CAN_XAC_NHAN}</Text>
                            <Text style={[styles.row,{width:400}]}>{item.NOI_DUNG_CAN_XAC_NHAN}</Text>
                        </View> 
                    )}
                />
            </View>
        </ScrollView>
    )
};

export default XacNhanTable;
const height = Dimensions.get('window').height; //full height
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        height:height * 0.68
    },
    listWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderBottomWidth: 1,
    borderBottomColor:'#ccc'
    },
    row: {
        backgroundColor: '#fff',
        flexWrap:'wrap',
        flexDirection:'row',
        justifyContent:'flex-start',
        fontSize: 16,
        flexShrink:1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        color: '#444',
    },
    row1: {
        backgroundColor: '#fff',
        width:400,
        flex: 1,
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 10,
        color: '#444',
    },
    rowHeader: {
        backgroundColor: '#2179A9',
        color: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 10,
        fontSize: 16,
        flexShrink: 1,
    }
});