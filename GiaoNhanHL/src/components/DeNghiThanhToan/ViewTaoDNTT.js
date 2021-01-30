import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView
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

  const DropDownTienMat = ({hinhThucThanhToan, setHinhThucThanhToan}) => {
    return (
      <Form style={styles.container}>
        <Picker
          mode="dropdown"
          iosHeader="Tiền mặt"
          iosIcon={<Icon name="arrow-down" />}
          placeholder="Hình thức thanh toán"
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
  const [trucThuoc, setTrucThuoc] = useState();
  const [hinhThucThanhToan, setHinhThucThanhToan] = useState('Tiền mặt');
  const [thanhToanTheoCongTy, setThanhToanTheoCongTy] = useState('');
  const [soTK, setSoTK] = useState('');
  const [nganHang, setNganHang] = useState('');
  const [chiNhanhNganHang, setChiNhanhNganHang] = useState('');
  const [nguoiThuHuong, setNguoiThuHuong] = useState('');
  const [loaiTaiKhoan, setLoaiTaiKhoan] = useState('');
  const [disable, setDisable] = useState(true);

  const getToken = async () => {
    const username = await AsyncStorage.getItem('userToken');
    const trucThuoc = await AsyncStorage.getItem('maCongTy');
    setUsername(username);
    setTrucThuoc(trucThuoc);
  };
  useEffect(() => {
    getToken();
  }, []);

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

  useEffect(() => {
    if (noiDungDNTT != '' && thanhTien != '') {
      setDisable(false);
    }
    if (noiDungDNTT == '' || thanhTien == '') {
      setDisable(true);
    }
  }, [noiDungDNTT, thanhTien]);

  return (
    <ScrollView>
  <View style={styles.container}>
      <View style={styles.header}>
      <Appbar.Header style={styles.colorHeader}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}>
            <Icon
              name="ios-chevron-back-outline"
              size={30}
              color={'#2179A9'}
              style={styles.iconPage}
            />
          </TouchableOpacity>
          <Appbar.Content
            title="Tạo đề nghị thanh toán"
            color={'#2179A9'}
            style={{marginLeft: -15}}
            ></Appbar.Content>
        </Appbar.Header>
      </View>
      <View>
      <View style={styles.card}>

          <View style={styles.flex}>
          <View style={styles.icon}>
                <Icon name="ios-reader-sharp" size={22} style={styles.iconImg} />
              </View>
            <TextInput
              style={styles.input}
              onChangeText={setNoiDungDNTT}
              placeholder="Nhập nội dung cần xác nhận"
              multiline={true}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.flex}>
          <View style={styles.icon}>
                <Icon name="ios-cash" size={22} style={styles.iconImg} />
              </View>
            <DropDownTienMat
              hinhThucThanhToan={hinhThucThanhToan}
              setHinhThucThanhToan={setHinhThucThanhToan}
            />
          </View>
          <View style={styles.flex}>
          <View style={styles.icon}>
                <Icon name="ios-chatbox-sharp" size={22} style={styles.iconImg} />
            </View>
            <TextInput
              style={styles.input}
              onChangeText={setDienGiai}
              placeholder="Nhập diễn giải"
              multiline={true}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.flex}>
          <View style={styles.icon}>
                <Icon name="ios-logo-html5" size={22} style={styles.iconImg} />
            </View>
            <TextInput
              style={styles.input}
              onChangeText={setThanhTien}
              placeholder="Số tiền"
              multiline={true}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.flex}>
          <View style={styles.icon}>
                <Icon name="ios-newspaper" size={22} style={styles.iconImg} />
              </View>
            <TextInput
              style={styles.input}
              onChangeText={setGhiChu}
              placeholder="Ghi chú"
              multiline={true}
              underlineColorAndroid="transparent"
            />
          </View>
        </View>
        <Button
          disabled={disable}
          onPress={() => buttonCreate()}
          style={disable ? (styles.buttonAddDisable) : (styles.buttonAddEnable)}>
          <Icon name="ios-add" size={26} color={'#fff'} />
          <Text style={{color: '#fff'}}>Tạo</Text>
        </Button>
      </View>
    </View>
    </ScrollView>
  
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
    marginBottom: 30,
  },
  flexTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  iconPage: {
    marginRight: 5,
  },
  card: {
    marginTop: 20,
    margin: 15,
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: Platform.OS === 'ios' ? ('#ccc') : ('transparent'),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 5.25,
    shadowRadius: 3.84,
    elevation: 6,
  },
  colorHeader: {
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: Platform.OS === 'ios' ? 0 : 0.2,
    backgroundColor: 'transparent',
    elevation: 1,
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
  buttonAddEnable: {
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
    backgroundColor:'#2179A9'
  },
  buttonAddDisable: {
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
});
