import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
import moment from 'moment';

const NghiPhepTable = ({data, checkIcon}) => {
    return(
    <ScrollView horizontal={true}>
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
    </ScrollView>

    )
};

export default NghiPhepTable;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
    listWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderBottomWidth: 0.5
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
    },
  });