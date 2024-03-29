import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import moment from 'moment';
import {
  width,
  height,
  widthScale,
  heightScale,
  moderateScale,
} from '../../js/size';
const XacNhanTable = ({data, checkIcon}) => {
  return (
    <View style={styles.container}>
      <View style={styles.listWrapper}>
        <Text style={[styles.rowHeader, {width: 140}]}>Ngày</Text>
        <Text style={[styles.rowHeader, {width: 140}]}>Ngày xác nhận</Text>
        <Text style={[styles.rowHeader, {width: 495}]}>Nội dung</Text>
      </View>
      <FlatList
        // initialNumToRender={6}
        data={data}
        renderItem={({item, index}) => (
          <View style={styles.listWrapper}>
            <Text style={[styles.row, {width: 140}]}>{moment(item.NGAY_LAM_DON).format('DD/MM/YYYY')}</Text>
            <Text style={[styles.row, {width: 140}]}>{item.NGAY_CAN_XAC_NHAN}</Text>
            <Text style={[styles.row, {width: 495}]}>{item.NOI_DUNG_CAN_XAC_NHAN}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default XacNhanTable;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    maxHeight: heightScale(500),
  },
  listWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  row: {
    backgroundColor: '#fff',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    fontSize: 16,
    flexShrink: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: '#444',
  },
  row1: {
    backgroundColor: '#fff',
    width: 400,
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
