import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList,Dimensions} from 'react-native';
import moment from 'moment';
import {width, height, widthScale, heightScale, moderateScale } from '../../js/size';
const NghiPhepTable = ({data, checkIcon}) => {
    return(

      <View style={styles.container}>
          <View style={styles.listWrapper}>
            <Text style={[styles.rowHeader,{width:140}]}>Ngày</Text>
            <Text style={[styles.rowHeader,{width:100}]}>Số ngày</Text>
            <Text style={[styles.rowHeader,{width:150}]}>Loại nghỉ phép</Text>
            <Text style={[styles.rowHeader,{width:250}]}>Thời gian nghỉ</Text>
            <Text style={[styles.rowHeader,{width:400}]}>Lý do</Text>
          </View>
          <FlatList
            data={data}
            renderItem={({item, index}) => (
                <View style={styles.listWrapper}>
                    <Text style={[styles.row,{width:140}]}>{moment(item.NGAY_LAM_DON).format('DD/MM/YYYY')}</Text>
                    <Text style={[styles.row,{width:100}]}>{item.TONG_SO_NGAY_NGHI}</Text>
                    <Text style={[styles.row,{width:150}]}>{item.LOAI_NGHI_PHEP}</Text>
                    <Text style={[styles.row,{width:250}]}>{item.THOI_GIAN_NGHI}</Text>
                    <Text style={[styles.row,{width:400}]}>{item.LY_DO_XIN_NGHI}</Text>
                </View>
            )}
          />
      </View>

    )
};

export default NghiPhepTable;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      maxHeight:heightScale(500)
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
      fontSize: moderateScale(16),
      flexShrink:1,
      padding: moderateScale(10),
      
      color: '#444',
    },

    rowHeader: {
      backgroundColor: '#2179A9',
      color: '#fff',
      padding: moderateScale(10),
      fontSize: moderateScale(16),
      flexShrink: 1,
    },
  });