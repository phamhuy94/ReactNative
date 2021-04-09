import React, {useEffect, useState, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getBaoCaoTong, UpdateDonGiao} from '../../redux/BCT/action';

import {
  Text,
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  ScrollView,
  Platform,
} from 'react-native';
import {Appbar} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import DatePicker from '../../components/datePicker';
import Swipeout from 'react-native-swipeout';
import Icon from 'react-native-vector-icons/Ionicons';
import ItemBaoCaoTong from '../BaoCaoTong/ItemBaoCaoTong';
const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export default function ViewBaoCaoTong() {
  const dispatch = useDispatch();

  const listBaoCaoTong = useSelector(
    (store) => store.baoCaoTong.listBaoCaoTong,
  );

  const [macongty, setMaCongTy] = useState('');
  const [username, setUsername] = useState('');
  const [isadmin, setIsadmin] = useState(false);
  const [date, setDate] = useState(new Date());
  const [diaChi, setDiaChi] = useState('');
  const [ngayXacNhanGiaoHang, setNgayXacNhanGiaoHang] = useState('');
  const [ngayGioKhachKyNhan, setNgayGioKhachKyNhan] = useState('');
  const [mavach, setMaVach] = useState('');
  const [loaixuatkho, setLoaiXuatKho] = useState('GIAO_HANG');
  const [ghiChuGiaoNhan, setGhiChuGiaoNhan] = useState('');
  const [modal, setModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const getToken = async () => {
    const username = await AsyncStorage.getItem('userToken');
    const macongty = await AsyncStorage.getItem('maCongTy');
    setUsername(username);
    setMaCongTy(macongty);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
    dispatch(getBaoCaoTong(macongty, username, isadmin, date, loaixuatkho));
  }, [macongty, username, date, loaixuatkho]);

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    dispatch(
      getBaoCaoTong(macongty, username, isadmin, date, loaixuatkho, mavach),
    );
  }, [macongty, username, isadmin, date, loaixuatkho, mavach]);

  const checkLoaiGiaoHang = (loaixuatkho) => {
    if (loaixuatkho == 'GIAO_HANG') {
      return <Icon name="ios-caret-forward-circle" size={24} color="green" />;
    }
    if (loaixuatkho == 'LAY_HANG_NCC' || loai == 'LAY_HANG_KH') {
      return <Icon name="ios-caret-back-circle" size={24} color="red" />;
    }
  };
  // console.log(date, loai);
  return (
    <View style={styles.container}>
      <View style={{position: 'relative'}}>
        <Appbar.Header style={styles.colorHeader}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Appbar.Action icon="link-box-outline" color={'#fff'} size={30} />
            <Appbar.Content
              title="Báo cáo tổng"
              color={'#fff'}
              style={{marginLeft: -15}}
            />
          </View>
        </Appbar.Header>
        <View style={styles.flexTime}>
          <View style={[styles.flexDatePicker, {marginHorizontal: 15}]}>
            <Text style={styles.textDate}>Ngày: </Text>
            <View style={[styles.flexDatePicker]}>
              <DatePicker
                onPress={(text) => setDate(text)}
                maxDate={new Date()}
                style={styles.datepicker}
              />
            </View>
          </View>
          <View style={[styles.flexDatePicker, {marginHorizontal: 15}]}>
            <Text style={styles.textDate}>Trạng thái: </Text>
            <View>
              <Text onChangeText={setLoaiXuatKho}>
                {checkLoaiGiaoHang(loaixuatkho)}
              </Text>
            </View>
          </View>
        </View>
      </View>

      
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <FlatList
            data={listBaoCaoTong}
            renderItem={({item, index}) => (
              <ItemBaoCaoTong data={item} onRefresh={onRefresh} />
            )}
            keyExtractor={(item2, index) => index.toString()}
          />
        </ScrollView>
     
    </View>
  );
}

const styles = StyleSheet.create({

  flex: {
    flex: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: '#000',
  },
  flexDate: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  flexDatePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexTime: {
    flexDirection: 'row',
    top: 0,
    margin: 20,
    marginTop: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop:-40,
    height:80,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 5.25,
    shadowRadius: 3.84,
    elevation: 4,
  },
  colorHeader: {
    shadowColor: '#000',
    flexDirection: 'column',
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: Platform.OS === 'ios' ? 0 : 0.2,
    backgroundColor: '#2179A9',
    elevation: 1,
    height: 100,
  },
  datepicker: {
    color: '#444',
  },

  textDate: {
    color: '#444',
    fontSize: 16,
  },
});
