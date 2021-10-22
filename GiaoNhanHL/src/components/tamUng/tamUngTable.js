import React from 'react';
import { View, Text, StyleSheet,Dimensions, ScrollView, FlatList} from 'react-native';
import moment from 'moment';

const TamUngTable = ({data, body}) => {
    const checkStatus = (
        DA_DUYET,
        DA_THANH_TOAN,
        TRUONG_PHONG_DA_DUYET,
        TRUONG_PHONG_HUY_DUYET,
        DA_HUY,
        MA_SO_DN,
      ) => {
        if (
          DA_THANH_TOAN === false &&
          ((TRUONG_PHONG_DA_DUYET === false && TRUONG_PHONG_HUY_DUYET === true) ||
            (DA_DUYET === false && DA_HUY === true) ||
            (TRUONG_PHONG_DA_DUYET === true && DA_HUY === true))
        ) {
          return (
              <Text sstyle={[styles.row,{width:200}]}>Đã hủy</Text>
          );
        } else if (DA_THANH_TOAN === true) {
          return (
              <Text style={[styles.row,{width:200}]}>Đã thanh toán</Text>
          );
        } else if (
          DA_THANH_TOAN === false &&
          TRUONG_PHONG_DA_DUYET === true &&
          TRUONG_PHONG_HUY_DUYET == false &&
          DA_DUYET == true &&
          DA_HUY == false
        ) {
          return (
              <Text style={[styles.row,{width:200}]}>Cần thanh toán</Text>
          );
        } else
          return (
              <Text style={[styles.row,{width:200}]}>Cần duyệt</Text>
          );
      };

    return (
      <ScrollView horizontal={true}>
             <View style={styles.container}>
                <View style={styles.listWrapper}>
                    <Text style={[styles.rowHeader,{width:140}]}>Ngày</Text>
                    <Text style={[styles.rowHeader,{width:150}]}>Số tiền</Text>
                    <Text style={[styles.rowHeader,{width:200}]}>Số tiền bằng chữ</Text>
                    <Text style={[styles.rowHeader,{width:400}]}>Nội dung</Text>
                    <Text style={[styles.rowHeader,{width:200}]}>Trạng thái</Text>
                </View>
                <FlatList
                  // initialNumToRender={6}
                  data={data}
                  renderItem={({item, index}) => (
                  <View style={styles.listWrapper}>
                      <Text style={[styles.row,{width:140}]}>{moment(item.NGAY_DE_NGHI).format('DD/MM/YYYY')}</Text>
                      <Text style={[styles.row,{width:150}]}>{item.SO_TIEN_DE_NGHI.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g,'$1,',)} đ</Text>
                      <Text style={[styles.row,{width:200}]}>{`${item.SO_TIEN_BANG_CHU} đồng`}</Text>
                      <Text style={[styles.row,{width:400}]}>{item.LY_DO_DN}</Text>
                      {checkStatus(
                          item.DA_DUYET,
                          item.DA_THANH_TOAN,
                          item.TRUONG_PHONG_DA_DUYET,
                          item.TRUONG_PHONG_HUY_DUYET,
                          item.DA_HUY,
                          item.MA_SO_DN,
                      )}
                  </View>
                    )}
                />
            </View>
        </ScrollView>
       
       
    )
};

export default TamUngTable;
const height = Dimensions.get('window').height; //full height
const styles = StyleSheet.create({
    container: {
      flex: 1,
      maxHeight: height * 1
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
    rowHeader: {
        backgroundColor: '#2179A9',
        color: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 10,
        fontSize: 16,
        flexShrink: 1,
    }
  });