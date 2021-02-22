import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import ListTamUng from '../../components/tamUng/listTamUng';
import {Appbar} from 'react-native-paper';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const TamUng = ({navigation}) => {
  const [username, setUsername] = useState();
  const [isadmin, setIsadmin] = useState(false);
  const [maphongban, setMaphongban] = useState('');
  const [chucvu, setChucvu] = useState('');
  const [macongty, setMacongty] = useState();
  const [tukhoa, setTukhoa] = useState('');
  const [tukhoa1, setTukhoa1] = useState('');
  const [tukhoa2, setTukhoa2] = useState('');
  const [tukhoa3, setTukhoa3] = useState('');
  const [tukhoa4, setTukhoa4] = useState('0');
  const [dongia, setDongia] = useState('');
  const [exp, setExp] = useState('>=');
  const [sotrang, setSotrang] = useState(1);
  const [sobanghi, setSobanghi] = useState(15);
  const [state, setState] = useState([]);

  const getToken = async () => {
    const username = await AsyncStorage.getItem('userToken');
    const macongty = await AsyncStorage.getItem('maCongTy');
    setUsername(username);
    setMacongty(macongty);
  };
  useEffect(() => {
    getToken();
  }, []);

  const load = async () => {
    AsyncStorage.getItem('userToken').then((result) => {
      LoadAPI(result);
    });
  };
  const LoadAPI = (username) => {
    const url =
      'http://sales.hoplong.com/api/Api_NhanVien/GetChiTietNhanVien/' +
      username;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setState(res);
        setMaphongban(res.MA_PHONG_BAN);
      })
      .catch((error) => {});
  };
  useEffect(() => {
    load();
  }, []);

  const body = {
    isadmin: isadmin,
    username: username,
    maphongban: maphongban,
    chucvu: chucvu,
    macongty: macongty,
    tukhoa: tukhoa,
    tukhoa1: tukhoa1,
    tukhoa2: tukhoa2,
    tukhoa3: tukhoa3,
    tukhoa4: tukhoa4,
    dongia: dongia,
    exp: exp,
    sotrang: sotrang,
    sobanghi: sobanghi,
  };
  return (
    <View>
      <Appbar.Header style={styles.colorHeader}>
        <Appbar.Action icon="check-circle" color={'#2179A9'} size={30} />
        <Appbar.Content
          title="List tạm ứng"
          color={'#2179A9'}
          style={{marginLeft: -15}}
        />
        <TouchableOpacity
          title="Click"
          onPress={() => navigation.navigate('Tạo tạm ứng', {body})}>
          <Icon name="ios-add-circle" size={30} style={styles.iconAdd} />
        </TouchableOpacity>
      </Appbar.Header>
      <ListTamUng body={body} />
    </View>
  );
};

export default TamUng;
const styles = StyleSheet.create({
  colorHeader: {
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: Platform.OS === 'ios' ? 0 : 0.2,
    backgroundColor: 'transparent',
    elevation: 1,
  },
  iconAdd: {
    color: '#2179A9',
  },
})
