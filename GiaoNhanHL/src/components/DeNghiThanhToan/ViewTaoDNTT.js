import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Card} from 'react-native-elements';
import {Appbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button, Picker, Form} from 'native-base';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import {PostDeNghiTT} from '../../redux/DNTT/action';

const ViewTaoDNTT = ({navigation}) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState();
  const getToken = async () => {
    const username = await AsyncStorage.getItem('userToken');
    setUsername(username);
  };
  useEffect(() => {
    getToken();
  }, []);

  const DropDownTienMat = ({hinhThucThanhToan, setHinhThucThanhToan}) => {
    return (
      <Form style={styles.container}>
        <Picker
          mode="dropdown"
          iosHeader=""
          iosIcon={<Icon name="arrow-down" />}
          style={styles.picker}
          selectedValue={hinhThucThanhToan}
          onValueChange={setHinhThucThanhToan}>
          <Picker.Item label="Tiền mặt" value="tienMat" />
        </Picker>
      </Form>
    );
  };

  //useState
  // const [nguoiDeNghi, setNguoiDeNghi] = useState('');
  const [noiDungDNTT, setNoiDungDNTT] = useState('');
  // const [tongTien, setTongTien] = useState('');
  const [dienGiai, setDienGiai] = useState('');
  const [thanhTien, setThanhTien] = useState('');
  const [ghiChu, setGhiChu] = useState('');
  // const [nguoiLapPhieu, setNguoiLapPhieu] = useState('');
  const [trucThuoc, setTrucThuoc] = useState('HOPLONG');
  const [hinhThucThanhToan, setHinhThucThanhToan] = useState('Tiền mặt');
  const [thanhToanTheoCongTy, setThanhToanTheoCongTy] = useState('');
  const [soTK, setSoTK] = useState('');
  const [nganHang, setNganHang] = useState('');
  const [chiNhanhNganHang, setChiNhanhNganHang] = useState('');
  const [nguoiThuHuong, setNguoiThuHuong] = useState('');
  const [loaiTaiKhoan, setLoaiTaiKhoan] = useState('');

  const buttonCreate = () => {
    dispatch(
      PostDeNghiTT(
          username,
          noiDungDNTT,
          thanhTien,
          dienGiai,
          thanhTien,
          ghiChu,
          username,
          trucThuoc,
          hinhThucThanhToan,
          thanhToanTheoCongTy,
          soTK,
          nganHang,
          chiNhanhNganHang,
          nguoiThuHuong,
          loaiTaiKhoan,
      ),
    )
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Appbar.Header>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}>
            <Icon
              name="ios-chevron-back-outline"
              size={26}
              style={styles.iconPage}
            />
          </TouchableOpacity>
          <Appbar.Content
            title="Tạo đề nghị thanh toán"
            color={'#fff'}></Appbar.Content>
        </Appbar.Header>
      </View>
      <View>
        <Card>
          <View style={styles.flex}>
            <Icon name="ios-copy-outline" size={26} style={styles.icon} />
            <Text>{username}</Text>
         
          </View>
          <View style={styles.flex}>
            <Icon name="ios-copy-outline" size={26} style={styles.icon} />
            <TextInput
              style={styles.input}
              onChangeText={setNoiDungDNTT}
              placeholder="Nhập nội dung cần xác nhận"
              multiline={true}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.flex}>
            <Icon name="ios-copy-outline" size={26} style={styles.icon} />
            <DropDownTienMat
              hinhThucThanhToan={hinhThucThanhToan}
              setHinhThucThanhToan={setHinhThucThanhToan}
            />
          </View>
          <View style={styles.flex}>
            <Icon name="ios-copy-outline" size={26} style={styles.icon} />
            <TextInput
              style={styles.input}
              onChangeText={setDienGiai}
              placeholder="Nhập diễn giải"
              multiline={true}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.flex}>
            <Icon name="ios-copy-outline" size={26} style={styles.icon} />
            <TextInput
              style={styles.input}
              onChangeText={setThanhTien}
              placeholder="Số tiền"
              multiline={true}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.flex}>
            <Icon name="ios-copy-outline" size={26} style={styles.icon} />
            <TextInput
              style={styles.input}
              onChangeText={setGhiChu}
              placeholder="Ghi chú"
              multiline={true}
              underlineColorAndroid="transparent"
            />
          </View>

          <Button
            onPress={() => buttonCreate() }>
          
            <Icon name="ios-add" size={26} />
            <Text>Tạo</Text>
          </Button>
        </Card>
      </View>
    </View>
  );
};

export default ViewTaoDNTT;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textHeader: {
    color: '#000',
    fontSize: 20,
    flexShrink: 1,
  },
  flex: {
    flexDirection: 'row',
  },
  flexTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    marginRight: 10,
    alignSelf: 'center',
  },
  iconPage: {
    color: '#fff',
  },
  colorHeader: {
    backgroundColor: '#00B4FF',
  },
  input: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    flexShrink: 1,
    width: '100%',
  },
  dropdown: {
    width: '100%',
    height: 45,
    borderBottomColor: '#cccccc59',
    borderBottomWidth: 1,
    flexShrink: 1,
    fontSize: 20,
  },
  datepicker: {
    color: '#000',
    fontSize: 20,
  },
  button: {
    flexDirection: 'row',
    color: '#fff',
  },
});
