import React, {useEffect, useState, useContext, useCallback} from 'react';
import {Button, View, StyleSheet, Text,TouchableOpacity,ScrollView} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ViewDetail from '../components/ViewDetail';
import ViewTimeSheet from '../components/ViewTimeSheet';
import ViewPayRoll from '../components/ViewPayRoll';
import LuongDs from '../components/luongDs/luongDs';
import ViewKPI from '../components/ViewKPI';
import ViewNghiPhep from '../components/ViewNghiPhep';
import ViewXacNhan from '../components/ViewXacNhan';
import DNTT from '../screens/DNTT/index';
import TamUng from '../screens/TamUng/index';
import QuangDuong from '../screens/QuangDuong/index';
import BaoCaoTong from '../components/BaoCaoTong/ViewBaoCaoTong';
import BaoCaoThuTien from '../components/BaoCaoThuTien/ViewBaoCaoThuTien';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../redux/authentication/action';
import {createDrawerNavigator} from '@react-navigation/drawer';

const ProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [state, setState] = useState([]);

  const load = async () => {
    AsyncStorage.getItem('userToken').then((result) => {
      LoadAPI(result);
    });
  };

  const signOut = useCallback(() => {
    dispatch(logout());
  });

  const LoadAPI = (username) => {
    const url =
      'http://app.hoplong.com/api/Api_NhanVien/GetChiTietNhanVien/' +
      username;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setState(res);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    load();
  }, []);

  // console.log(state)
  function Details({navigation}) {
    return (
      <ScrollView style={{flex:1,}}>
        <ViewDetail data={state}></ViewDetail>

        <TouchableOpacity onPress={signOut} style={styles.button}>
          <Text style={{color: '#fff'}}>Sign out</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  const Drawer = createDrawerNavigator();

  return (
    <View style={styles.container}>
      <Drawer.Navigator initialRouteName="Home" style={styles.sidebar}>
        <Drawer.Screen name="Thông tin" component={Details} />
        <Drawer.Screen name="Bảng chấm công" component={ViewTimeSheet} />
        <Drawer.Screen name="Bảng lương" component={ViewPayRoll} />
        <Drawer.Screen name='LuongDs' component={LuongDs}/>
        <Drawer.Screen name="Xin nghỉ phép" component={ViewNghiPhep} />
        <Drawer.Screen name="Xin xác nhận" component={ViewXacNhan} />
        <Drawer.Screen name="Đề nghị thanh toán" component={DNTT} />
        <Drawer.Screen name="Tạm ứng" component={TamUng} />
        <Drawer.Screen name="QL quãng đường" component={QuangDuong} />
        <Drawer.Screen name="KPI" component={ViewKPI} />
        <Drawer.Screen name="Báo cáo tổng" component={BaoCaoTong} />
        <Drawer.Screen name="Báo cáo thu tiền" component={BaoCaoThuTien} />
      </Drawer.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    textAlign: 'center',
    alignSelf: 'center',
    borderRadius: 50,
    marginTop: 20,
    width: 350,
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2179A9',
  },
});

export default ProfileScreen;
