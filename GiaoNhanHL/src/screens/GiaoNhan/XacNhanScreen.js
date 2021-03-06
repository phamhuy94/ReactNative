import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform
} from 'react-native';
import {Button, CheckBox} from 'native-base';
import {Appbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {saveUpdateGiaoHang, khachHangNhan} from '../../redux/GiaoNhan/action';
import PickKH from './pickKH';

function XacNhanScreen({route, navigation}) {
  const {listSelectDaNhan} = route.params;
  const {dataUser} = route.params;
  const dispatch = useDispatch();
  const listKhachHangNhan = useSelector((store) => store.giaoNhan.listKhachHangNhan);
  const [username, setUsername] = useState();
  const [nguoiNhanHang, setNguoiNhanHang] = useState('');
  const [sdtNguoiNhanHang, setSdtNguoiNhanHang] = useState('');
  const [ghiChu, setGhiChu] = useState();
  const [chuyenLoaiThanhToan, setChuyenLoaiThanhToan] = useState();
  const [daGiaoHang, setDaGiaoHang] = useState();
  const [daLayHang, setDaLayHang] = useState();
  const [link, setLink] = useState('');
  const [tuKhoa, setTuKhoa] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if(nguoiNhanHang != '' && sdtNguoiNhanHang != '') {
      setDisabled(false);
    }
    if(nguoiNhanHang == '' || sdtNguoiNhanHang == '') {
      setDisabled(true);
    }
  }, [nguoiNhanHang, sdtNguoiNhanHang]);
  
  const updateGiaoHang = async () => {
    let data = {
      ChiTiet: listSelectDaNhan,
      DA_GIAO_HANG: daGiaoHang,
      DA_LAY_HANG: daLayHang,
      TEN_KHACH_KY_NHAN: nguoiNhanHang,
      SDT_KHACH_KY_NHAN: sdtNguoiNhanHang,
      DA_THU_TIEN_HANG: !chuyenLoaiThanhToan,
      CHUYEN_LOAI_THANH_TOAN: chuyenLoaiThanhToan,
      GHI_CHU: ghiChu,
      username: username,
    };
    const response = await dispatch(saveUpdateGiaoHang(data, dataUser));
    if (response.indexOf('Thành công') >= 0) {
      Alert.alert(response);
      // dispatch(getListDaNhan());
      navigation.navigate('Danh sách đã nhận');
    } else {
      Alert.alert('Thất bại');
    }
  };

  const getToken = async () => {
    const username = await AsyncStorage.getItem('userToken');
    setUsername(username);
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if(listSelectDaNhan[0].KHACH_HANG != null) {
            // // chon Api, NCC => NguoiGiaoNhanNCC, KHH => NguoiGiaoNhanKH
    if(listSelectDaNhan[0].KHACH_HANG.indexOf('NCC') == -1){
      // setLink('NguoiGiaoNhanKH')
      dispatch(khachHangNhan(listSelectDaNhan[0].KHACH_HANG, tuKhoa, 'NguoiGiaoNhanKH'))
    } else {
      // setLink('NguoiGiaoNhanNCC')
      dispatch(khachHangNhan(listSelectDaNhan[0].KHACH_HANG, tuKhoa, 'NguoiGiaoNhanNCC'))
    }
    }
  }, [listSelectDaNhan])

  // useEffect(() => {
  //   dispatch(khachHangNhan(listSelectDaNhan[0].KHACH_HANG, tuKhoa, link))
  // }, [listSelectDaNhan, tuKhoa, link])

  const selectKH = (value) => {
    if (value) {
      setNguoiNhanHang(value.TEN_NGUOI_GIAO_NHAN);
      setSdtNguoiNhanHang(value.SDT_NGUOI_GIAO_NHAN);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Appbar.Header style={styles.colorHeader}>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Content
              title="Xác nhận giao/lấy hàng"
              color={'#2179A9'}
              style={{marginLeft: -15}}
            />
          </Appbar.Header>
        </View>
        <View style={styles.card}>
          <View style={styles.flex}>
            <View style={styles.icon}>
              <Icon name="ios-business" size={20} style={styles.iconImg} />
            </View>
            <Text style={styles.text}>{listSelectDaNhan[0].TEN_CONG_TY}</Text>
          </View>

          <View style={styles.flex1}>
            
            <PickKH listKhachHangNhan={listKhachHangNhan} onValueChange={selectKH}/>
          </View>

          <View style={styles.flex}>
          <View style={styles.icon}>
              <Icon name="ios-person" size={22} style={styles.iconImg} />
            </View>
            <TextInput
              onChangeText={setNguoiNhanHang}
              value={nguoiNhanHang}
              placeholder="Người nhận hàng"
              style={styles.input}
              placeholderTextColor="#ccc"
            />
          </View>
          <View style={styles.flex}>
            <View style={styles.icon}>
              <Icon name="ios-call" size={22} style={styles.iconImg} />
            </View>
            <TextInput
              onChangeText={setSdtNguoiNhanHang}
              value={sdtNguoiNhanHang}
              style={styles.input}
              placeholder="SDT Người nhận hàng"
              placeholderTextColor="#ccc"
            />
          </View>
          <View style={styles.flex}>
          <View style={styles.icon}>
              <Icon name="ios-bookmark-sharp" size={22} style={styles.iconImg} />
            </View>
            <TextInput
              onChangeText={setGhiChu}
              value={ghiChu}
              style={styles.input}
              placeholder="Ghi chú"
              placeholderTextColor="#ccc"
            />
          </View>
          
          <View style={{flexDirection: 'row',alignItems:'center',marginBottom:20}}>
            <View style={{position:'absolute',zIndex:9,marginRight:29,paddingRight:29}}>
            <CheckBox
              onPress={() => setChuyenLoaiThanhToan(!chuyenLoaiThanhToan)}
              checked={chuyenLoaiThanhToan}
              style={styles.checkBox}
            />
            </View>
            
            <Text style={[styles.left,{marginLeft:20}]}>Chuyển loại thanh toán</Text>
          </View>
          <View>
            {listSelectDaNhan[0].LOAI === 'GIAO_HANG' && (
              <View style={{flexDirection: 'row',alignItems:'center'}}>
                <View style={{position:'absolute',zIndex:9}}>
                <CheckBox
                  onPress={() => setDaGiaoHang(!daGiaoHang)}
                  checked={daGiaoHang}
                  style={styles.checkBox}
                />
                </View>
                
                <Text style={[styles.left,{marginLeft:20}]}>Xác nhận giao hàng</Text>
              </View>
            )}
            {listSelectDaNhan[0].LOAI != 'GIAO_HANG' && (
              <View style={{flexDirection: 'row',alignItems:'center'}}>
                 <View style={{position:'absolute',zIndex:9}}>
                <CheckBox
                  onPress={() => setDaLayHang(!daLayHang)}
                  checked={daLayHang}
                  style={styles.checkBox}
                />
                </View>
                <Text style={[styles.left,{marginLeft:20}]}>Xác nhận lấy hàng</Text>
              </View>
            )}
          </View>

          {/* <Button title="Lưu" onPress={() => updateGiaoHang()} /> */}
        </View>
        <Button 
          disabled={disabled} 
          onPress={() => updateGiaoHang()}
          style={disabled ? styles.buttonNotSave : styles.buttonSave}>
          <Icon name="ios-add" size={26} color={'#fff'} />
          <Text style={{color: '#fff'}}>Lưu</Text>
        </Button>
      </View>
    </ScrollView>
  );
}

export default XacNhanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  flex1: {
    // flexDirection: 'row',
    marginBottom: 30,
  },
  colorHeader: {
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 3},
    // shadowOpacity: 0.2,
    shadowOpacity: Platform.OS === 'ios' ? 0 : 0.2,
    backgroundColor: 'transparent',
    elevation: 1,
  },
  text: {
    flexShrink: 1,
  },
  left: {
    paddingLeft:30,
    paddingRight:15,
  },
  card: {
    marginVertical:10,
    margin: 15,
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 5.25,
    shadowRadius: 3.84,
    shadowColor: Platform.OS === 'ios' ? ('#ccc') : ('transparent'),
    elevation: 6,
  },
  buttonSave: {
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
  buttonNotSave: {
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
  },
  input: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,

    flexShrink: 1,
    width: '100%',
  },
  icon: {
    marginRight: 10,
    fontSize: 20,
    backgroundColor: '#ddd',
    borderRadius: 35 / 2,
    height: 35,
    width: 35,
    alignItems:'center',
    alignContent:'center',
    textAlignVertical:'center',
  },
  iconImg: {
    color: '#2179A9',
    lineHeight:35,
  },
  checkBox: {
    marginRight: 10,
    width: 25,
    height: 25,
    borderRadius: 50,
  }
});
