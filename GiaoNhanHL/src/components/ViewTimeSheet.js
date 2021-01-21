import React, {useEffect, useState, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getTimeSheet} from '../redux/user/action';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';

// import Icon from 'react-native-vector-icons/FontAwesome5'

import {Appbar} from 'react-native-paper';
import {Tile, List, ListItem, Card, Icon} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
export default function ViewTimeSheet() {
  const dispatch = useDispatch();

  const timeSheet = useSelector((store) => store.user.timeSheet);

  //lay username
  const [username, setUsername] = useState();
  const getToken = async () => {
    const username = await AsyncStorage.getItem('userToken');
    setUsername(username);
  };
  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    dispatch(getTimeSheet(username));
  }, [username]);

  //   const data = useMemo(() => {
  //       if(timeSheet.length == 0) {
  //           return null;
  //       }
  //       return timeSheet
  //   }, [timeSheet]);
  //   if(data === null) return null

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.colorHeader}>
        <Appbar.Content title="Bảng Chấm Công" color={'#fff'} />
      </Appbar.Header>
      <FlatList
        inverted
        data={timeSheet}
        renderItem={({item, index}) => (
          <View style={styles.homeLayout}>
            <Text style={styles.textHeader}>{item.THANG_CHAM_CONG}</Text>
            <View style={styles.timesheet}>
              <Text style={styles.title}>Ngày chuẩn</Text>
              <Text style={styles.value}>{item.NGAY_CHUAN}</Text>
            </View>
            <View style={styles.timesheet}>
              <Text style={styles.title}>Giờ đi muộn</Text>
              <Text style={styles.value}>{item.GIO_DI_MUON}</Text>
            </View>
            <View style={styles.timesheet}>
              <Text style={styles.title}>Giờ về sớm</Text>
              <Text style={styles.value}>{item.GIO_VE_SOM}</Text>
            </View>
            <View style={styles.timesheet}>
              <Text style={styles.title}>Tăng ca ngày thường</Text>
              <Text style={styles.value}>{item.TANG_CA_NGAY_THUONG}</Text>
            </View>
            <View style={styles.timesheet}>
              <Text style={styles.title}>Tăng ca ngày lễ</Text>
              <Text style={styles.value}>{item.TANG_CA_NGAY_LE}</Text>
            </View>
            <View style={styles.timesheet}>
              <Text style={styles.title}>Số lần quên chấm</Text>
              <Text style={styles.value}>{item.SO_LAN_QUEN_CHAM}</Text>
            </View>
            <View style={styles.timesheet}>
              <Text style={styles.title}>Số ngày nghỉ</Text>
              <Text style={styles.value}>{item.SO_NGAY_NGHI}</Text>
            </View>
            <View style={styles.timesheet}>
              <Text style={styles.title}>Công thực tế</Text>
              <Text style={styles.value}>{item.CONG_THUC_TE}</Text>
            </View>
            <View style={styles.timesheet}>
              <Text style={styles.title}>Vay tín dụng</Text>
              <Text style={styles.value}>{item.VAY_TIN_DUNG}</Text>
            </View>
            <View style={styles.timesheet}>
              <Text style={styles.title}>Ứng lương</Text>
              <Text style={styles.value}>{item.UNG_LUONG}</Text>
            </View>
            <View style={styles.timesheet}>
              <Text style={styles.valueGhichu}>{item.GHI_CHU}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item2, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  textHeader: {
    color: '#000',
    width: '100%',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 24,
  },
  colorHeader: {
    backgroundColor: '#00B4FF',
  },
  homeLayout: {
    margin: 15,
    marginBottom: 15,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'rgba(0,0,0, 0.3)',
  },

  timesheet: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    textTransform: 'capitalize',
    color: '#000',
    fontSize: 20,
  },
  value: {
    color: '#000',
    fontSize: 20,
    flex: 3,
    flexWrap: 'wrap',
    textAlign: 'right',
  },
  valueGhichu: {
    color: '#000',
    fontSize: 20,
  },
});
