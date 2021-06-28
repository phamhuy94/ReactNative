import React, {useEffect, useState,useCallback} from 'react';
import {
  View,
  Text,
  Button,
  SafeAreaView,
  RefreshControl,
  Dimensions,
  StyleSheet,
  FlatList,
  ScrollView,
  Platform,
  Alert
} from 'react-native';
import {CheckBox} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {getListCanNhan, xacNhanGiaoHang, getDaNhan} from '../../redux/GiaoNhan/action';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconIon from 'react-native-vector-icons/Ionicons';
import {Appbar} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';


const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

function DanhSachCanNhanScreen({navigation}) {
  const dispatch = useDispatch();

  const listCanNhan = useSelector((store) => store.giaoNhan.listCanNhan);
  const listSelect = useSelector((store) => store.giaoNhan.listSelect);
  const slDaNhan = useSelector((store) => store.giaoNhan.slDaNhan);
  const loaiGiaoHang = useSelector((store) => store.giaoNhan.loaiGiaoHang);

  const [username, setUsername] = useState();
  const [macongty, setMaCongTy] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [maphongban, setMaphongban] = useState('');

  const getToken = async () => {
    const username = await AsyncStorage.getItem('userToken');
    const macongty = await AsyncStorage.getItem('maCongTy');
    setUsername(username);
    setMaCongTy(macongty)
  };
  useEffect(() => {
    getToken();
  }, []);

  const data = {
    macongty: macongty,
    username: username,
    isadmin : isAdmin,
    maphongban: maphongban
  };

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
    dispatch(getListCanNhan(data));
  },[username, macongty]);

  const press = (state, index) => {
    if(listSelect.length === 0){
        dispatch({
          type: 'SELECT_CAN_NHAN',
          MA_VACH: state.MA_VACH,
          isSelected: state.isSelected,
          loaiGiaoHang: state.LOAI,
    });  
    } else {
      if(listSelect[0].MA_VACH === state.MA_VACH){
        dispatch({
          type: 'SELECT_CAN_NHAN',
          MA_VACH: state.MA_VACH,
          isSelected: state.isSelected,
          loaiGiaoHang: state.LOAI,
        });  
      } else {
        Alert.alert('Bạn không thể chọn 2 khách hàng khác nhau');
      }
    }
  };
  const xacNhan = async () => {
    await dispatch(xacNhanGiaoHang(loaiGiaoHang, listSelect, data));
  };

  useEffect(() => {
    dispatch(getListCanNhan(data));
  }, [username, macongty]);

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.colorHeader}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Cần nhận" color={'#2179A9'}/>
      </Appbar.Header>
      <ScrollView 
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          >
      <FlatList
        data={listCanNhan}
        renderItem={({index, item}) => (
          
          <View
            style={[
              styles.item,
              styles.card,
              {backgroundColor: item.LOAI === 'GIAO_HANG' ? '#fff' : '#0a7cf521'},
            ]}>
            <View style={styles.flexCheck}>
              {slDaNhan > 0 ? (
                <CheckBox style={styles.checkbox} />
              ) : (
                <CheckBox
                  style={styles.checkbox}
                  onPress={() => press(item, index)}
                  checked={item.isSelected}
                />

              )}
              <Text style={styles.header}>{item.MA_VACH}</Text>
            </View>

            <View>
              <Text style={styles.company}>{item.TEN_CONG_TY}</Text>
              {/* <Text>{item.DIA_CHI_GIAO_HANG}</Text> */}
              <View style={styles.flex}>
                <View style={styles.flex1}>
                  <IconIon name="ios-location" size={18} style={styles.icon} />
              <Text style={styles.name}>{item.DIA_CHI_GIAO_HANG}</Text>
                </View>
              </View>
              <View style={styles.flex}>
                <View style={styles.flex1}>
                  <Icon name="user" size={16} style={styles.icon} />
                  <Text style={styles.name}>{item.HO_VA_TEN}</Text>
                </View>
                <View style={styles.flex1}>
                  <Icon name="phone" size={16} style={styles.icon} />
                  <Text style={styles.name}>{item.SDT}</Text>
                </View>
              </View>
            </View>
            <FlatList
              data={item.data}
              renderItem={({item}) => (
                <Text style={styles.title}>{item.DIA_CHI_GIAO_HANG}</Text>
              )}
              keyExtractor={(item2, index) => index.toString()}
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      </ScrollView>
      <View style={styles.center}>
        <Icon.Button name="check" onPress={() => xacNhan()} style={styles.button}>
          Bắt đầu đi giao
        </Icon.Button>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#f0f2f2',
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginBottom: 5
  },
  flexCheck: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  flex1: {
    flexDirection: 'row',
  },
  item: {
    flex: 1,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
  icon: {
    color: '#000000ab',
    marginRight: 5,
  },
  textHeader: {
    color: '#444',
    fontSize: 16,
    flexShrink: 1,
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
    shadowColor: Platform.OS === 'ios' ? ('#ccc') : ('transparent'),
    shadowOpacity: 5.25,
    shadowRadius: 3.84,

    elevation: 0,
  },
  colorHeader: {
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: Platform.OS === 'ios' ? 0 : 0.2,
    backgroundColor: 'transparent',
    elevation: 1,
  },
  header: {
    fontSize: 18,
    color: '#2179A9',
    paddingHorizontal: 10,
    flex: 1,
  },
  company: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  name: {
    color: '#000000ab',
    fontSize: 16,
    flexShrink:1,
  },
  phone: {
    color: '#000000ab',
    fontSize: 16,
  },
  left: {
    textAlign: 'left',
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
  },
  checkbox: {
    marginRight: 10,
    width: 25,
    height: 25,
    borderRadius: 50,
  },
  center: {
    flexDirection: 'row',
    justifyContent: 'center',

  },
  button: {
    backgroundColor:'#2179A9'
  }
});
export default DanhSachCanNhanScreen;
