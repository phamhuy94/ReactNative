import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ViewDNTTCanDuyet from '../../components/DeNghiThanhToan/ViewDNTTCanDuyet';
import ViewDNTTCanThanhToan from '../../components/DeNghiThanhToan/ViewDNTTCanThanhToan';
import ViewDNTTDaThanhToan from '../../components/DeNghiThanhToan/ViewDNTTDaThanhToan';
import ViewDNTTDaHuy from '../../components/DeNghiThanhToan/ViewDNTTDaHuy';
import DropDownDNTT from '../../components/DeNghiThanhToan/DropdownDNTT';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DNTT = ({navigation}) => {
  const [page, setPage] = useState('daThanhToan');

  //lay username
  const [username, setUsername] = useState();

  //useState
  const [isadmin, setIsadmin] = useState(false);
  const [maphongban, setMaphongban] = useState('');
  const [chucvu, setChucvu] = useState('');
  const [macongty, setMacongty] = useState();
  const [tukhoa, setTukhoa] = useState('');
  const [tukhoa2, setTukhoa2] = useState('');
  const [tukhoa3, setTukhoa3] = useState('');
  const [tukhoa4, setTukhoa4] = useState('');
  const [tukhoa5, setTukhoa5] = useState('');
  const [sotrang, setSotrang] = useState(1);
  const [sobanghi, setSobanghi] = useState(15);

  const getToken = async () => {
    const username = await AsyncStorage.getItem('userToken');
    const macongty = await AsyncStorage.getItem('maCongTy');
    setUsername(username);
    setMacongty(macongty);
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <View style={styles.container}>
      {page === 'canDuyet' && (
        <ViewDNTTCanDuyet
          isadmin={isadmin}
          username={username}
          maphongban={maphongban}
          chucvu={chucvu}
          macongty={macongty}
          tukhoa={tukhoa}
          tukhoa2={tukhoa2}
          tukhoa3={tukhoa3}
          tukhoa4={tukhoa4}
          tukhoa5={tukhoa5}
          sotrang={sotrang}
          sobanghi={sobanghi}
          navigation={navigation}
        />
      )}

      {page === 'canThanhToan' && (
        <ViewDNTTCanThanhToan
          isadmin={isadmin}
          username={username}
          maphongban={maphongban}
          chucvu={chucvu}
          macongty={macongty}
          tukhoa={tukhoa}
          tukhoa2={tukhoa2}
          tukhoa3={tukhoa3}
          tukhoa4={tukhoa4}
          tukhoa5={tukhoa5}
          sotrang={sotrang}
          sobanghi={sobanghi}
          navigation={navigation}
        />
      )}

      {page === 'daThanhToan' && (
        <ViewDNTTDaThanhToan
          isadmin={isadmin}
          username={username}
          maphongban={maphongban}
          chucvu={chucvu}
          macongty={macongty}
          tukhoa={tukhoa}
          tukhoa2={tukhoa2}
          tukhoa3={tukhoa3}
          tukhoa4={tukhoa4}
          tukhoa5={tukhoa5}
          sotrang={sotrang}
          sobanghi={sobanghi}
          navigation={navigation}
        />
      )}

      {page === 'daHuy' && (
        <ViewDNTTDaHuy
          isadmin={isadmin}
          username={username}
          maphongban={maphongban}
          chucvu={chucvu}
          macongty={macongty}
          tukhoa={tukhoa}
          tukhoa2={tukhoa2}
          tukhoa3={tukhoa3}
          tukhoa4={tukhoa4}
          tukhoa5={tukhoa5}
          sotrang={sotrang}
          sobanghi={sobanghi}
          navigation={navigation}
        />
      )}
      <DropDownDNTT page={page} setPage={setPage} />
    </View>
  );
};

export default DNTT;
const styles = StyleSheet.create({
  // header: {
  //     flex:1,
  // },
  container: {
    flex: 1,

  },
});
