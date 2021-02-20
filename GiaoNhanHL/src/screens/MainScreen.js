import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import HomeScreen from './HomeScreen'
import DetailsScreen from './DetailsScreen';
import DanhSachCanNhanScreen from './GiaoNhan/DanhSachCanNhanScreen';
import DanhSachDaNhanScreen from './GiaoNhan/DanhSachDaNhanScreen';
import XacNhanScreen from './GiaoNhan/XacNhanScreen';
import DNTTScreen from './GiaoNhan/DNTTScreen';
import ViewTaoDonNghiPhep from '../components/ViewTaoDonNghiPhep';
import ViewTaoDonXacNhan from '../components/ViewTaoDonXacNhan';
import ViewTaoDNTT from '../components/DeNghiThanhToan/ViewTaoDNTT';
import CreateTamUng from '../components/tamUng/createTamUng';

const Stack = createStackNavigator();

const MainScreen = () => {

    return (
      <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Chi tiết nhân viên" component={DetailsScreen} />
        <Stack.Screen name="Danh sách cần nhận" component={DanhSachCanNhanScreen} />
        <Stack.Screen name="Danh sách đã nhận" component={DanhSachDaNhanScreen} />
        <Stack.Screen name="Xác nhận giao hàng" component={XacNhanScreen} />
        <Stack.Screen name="Đề nghị thanh toán" component={DNTTScreen} />
        <Stack.Screen name="Tạo đơn nghỉ phép" component={ViewTaoDonNghiPhep} />
        <Stack.Screen name="Tạo đơn xác nhận" component={ViewTaoDonXacNhan} />
        <Stack.Screen name="Tạo đề nghị thanh toán" component={ViewTaoDNTT} />
        <Stack.Screen name="Tạo tạm ứng" component={CreateTamUng} />
      </Stack.Navigator>
    );
  }

  export default MainScreen;