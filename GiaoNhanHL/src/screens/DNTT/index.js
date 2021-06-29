import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import ViewDNTTCanDuyet from '../../components/DeNghiThanhToan/ViewDNTTCanDuyet';
import ViewDNTTCanThanhToan from '../../components/DeNghiThanhToan/ViewDNTTCanThanhToan';
import ViewDNTTDaThanhToan from '../../components/DeNghiThanhToan/ViewDNTTDaThanhToan';
import ViewDNTTDaHuy from '../../components/DeNghiThanhToan/ViewDNTTDaHuy';
import DropDownDNTT from '../../components/DeNghiThanhToan/DropdownDNTT';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Appbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

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
  const [sobanghi, setSobanghi] = useState(15);
  const [showList, setShowList] = useState(false);

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
        <Appbar.Header style={styles.colorHeader}>
        <Appbar.Action icon="powershell" color={'#2179A9'} size={30} />
        <Appbar.Content
          title="Đề nghị thanh toán"
          color={'#2179A9'}
          style={{marginLeft: -15}}
        />
        <TouchableOpacity
          title="Click"
          onPress={() => navigation.navigate('Tạo đề nghị thanh toán')}>
          <Icon
            name="ios-add-circle"
            size={30}
            style={styles.iconAdd}
          />
        </TouchableOpacity>
      </Appbar.Header>
      <View style={styles.subTitle}>
        <DropDownDNTT page={page} setPage={setPage} />
        <View>
          <TouchableOpacity
            style={styles.btnEye}
            onPress={() => setShowList(!showList)}>
              {showList ? (  <Icon
              name={'ios-grid-outline'}
          
              size={22}
              color={'#2179A9'}
            />) : (  <Icon
              
              name={'ios-list-outline'}
              size={22}
              color={'#2179A9'}
            />)}
            </TouchableOpacity>
          </View>
      </View>
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
          sobanghi={sobanghi}
          navigation={navigation}
          showList={showList}
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
          sobanghi={sobanghi}
          navigation={navigation}
          showList={showList}
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
          sobanghi={sobanghi}
          navigation={navigation}
          showList={showList}
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
          sobanghi={sobanghi}
          navigation={navigation}
          showList={showList}
        />
      )}
    </View>
  );
};

export default DNTT;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  subTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
  }
});
