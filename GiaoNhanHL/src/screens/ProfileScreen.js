import React, {useEffect, useState, useContext, useCallback} from 'react';
import {
  Button,
  View,
  StyleSheet,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import ViewDetail from '../components/ViewDetail';
import ViewTimeSheet from '../components/ViewTimeSheet';
import ViewPayRoll from '../components/ViewPayRoll';
import ViewKPI from '../components/ViewKPI';
import ViewNghiPhep from '../components/ViewNghiPhep';
import ViewXacNhan from '../components/ViewXacNhan';
import DNTT from '../screens/DNTT/index';
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
      'http://sales.hoplong.com/api/Api_NhanVien/GetChiTietNhanVien/' +
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

  function Details({navigation}) {
    return (
      <View style={{}}>
        <ViewDetail data={state}></ViewDetail>
        <Button title="Sign out" onPress={signOut} />
      </View>
    );
  }

  const Drawer = createDrawerNavigator();

  return (
    <View style={styles.container}>
      <Drawer.Navigator initialRouteName="Home" style={styles.sidebar}>
        <Drawer.Screen name="Thông tin" component={Details} />
        <Drawer.Screen name="Bảng chấm công" component={ViewTimeSheet} />
        <Drawer.Screen name="Bảng lương" component={ViewPayRoll} />
        <Drawer.Screen name="KPI" component={ViewKPI} />
        <Drawer.Screen name="Xin nghỉ phép" component={ViewNghiPhep} />
        <Drawer.Screen name="Xin xác nhận" component={ViewXacNhan} />
        <Drawer.Screen name="Đề nghị thanh toán" component={DNTT} />
      </Drawer.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sidebar: {},
});

export default ProfileScreen;
