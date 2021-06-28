import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  GetDonXacNhanNV,
  PostDonXacNhanNV,
  DemDonXacNhanNV,
  DeleteDonXacNhan,
} from '../redux/xacNhan/action';
import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  FlatList,
  ScrollView,
  Button,
  TouchableOpacity,
  Platform,
} from 'react-native';
import moment from 'moment';

import {Card} from 'react-native-elements';
import {Appbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {_deleteDonXacNhan} from '../api/xacNhan/xacNhan';
import XacNhanTask from './xacNhan/xacNhanTask';
import XacNhanTable from './xacNhan/xacNhanTable';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const ViewXacNhan = ({navigation}) => {
  const dispatch = useDispatch();

  const getDonXacNhanNV = useSelector((store) => store.xacNhan.getDonXacNhanNV);
  const demDonXacNhanNV = useSelector((store) => store.xacNhan.demDonXacNhanNV);
  //lay username
  const [username, setUsername] = useState();

  //useState
  const [macongty, setMacongty] = useState();
  const [isadmin, setIsadmin] = useState(false);
  const [maphongban, setMaphongban] = useState('');
  const [chucvu, setChucvu] = useState('');
  const [tukhoa, setTukhoa] = useState('');
  const [sotrang, setSotrang] = useState(1);
  const [sobanghi, setSobanghi] = useState(15);
  const [showList, setShowList] = useState(false);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
    dispatch(
      GetDonXacNhanNV(
        macongty,
        username,
        isadmin,
        maphongban,
        chucvu,
        tukhoa,
        sotrang,
        sobanghi,
      ),
    );
  }, [macongty, username, sotrang]);

  const getToken = async () => {
    const username = await AsyncStorage.getItem('userToken');
    const macongty = await AsyncStorage.getItem('maCongTy');
    setUsername(username);
    setMacongty(macongty);
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    dispatch(
      GetDonXacNhanNV(
        macongty,
        username,
        isadmin,
        maphongban,
        chucvu,
        tukhoa,
        sotrang,
        sobanghi,
      ),
    );
  }, [macongty, username, sotrang, refreshing]);
  useEffect(() => {
    dispatch(
      DemDonXacNhanNV(
        macongty,
        username,
        isadmin,
        maphongban,
        chucvu,
        tukhoa,
        sotrang,
        sobanghi,
      ),
    );
  }, [macongty, username, sotrang, refreshing]);

  const deleteDXN = async (id) => {
    await dispatch(DeleteDonXacNhan(id));
    await dispatch(
      GetDonXacNhanNV(
        macongty,
        username,
        isadmin,
        maphongban,
        chucvu,
        tukhoa,
        sotrang,
        sobanghi,
      ),
    );
  };
  const checkIcon = (
    TRUONG_PHONG_DA_DUYET,
    TRUONG_PHONG_HUY_DUYET,
    id,
    NGAY_LAM_DON,
  ) => {
    if (TRUONG_PHONG_DA_DUYET === true && TRUONG_PHONG_HUY_DUYET === false) {
      return (
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              alignContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
              width: 30,
            }}>
            <Icon
              name="ios-checkmark-circle"
              size={24}
              style={styles.iconStatusCheck}
            />
          </View>

          <Text style={styles.textHeader}>
            {moment(NGAY_LAM_DON).format('DD/MM/YYYY')}
          </Text>
        </View>
      );
    }
    if (TRUONG_PHONG_DA_DUYET === false && TRUONG_PHONG_HUY_DUYET === false) {
      return (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignContent: 'center',
            alignSelf: 'center',
          }}>
          <View style={{left: 105, flex: 1}}>
            <Icon
              name="ios-refresh-circle"
              size={24}
              style={styles.iconStatusWait}
            />
          </View>
          <Text style={[styles.textHeader, {left: 105}]}>
            {moment(NGAY_LAM_DON).format('DD/MM/YYYY')}
          </Text>
          <View style={{marginLeft: 200}}>
            <TouchableOpacity onPress={() => deleteDXN(id)}>
              <Icon name="ios-trash" size={24} style={styles.iconStatusWait} />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    if (TRUONG_PHONG_HUY_DUYET !== false) {
      return (
        <View
          style={{
            left: 40,
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>
            <Icon
              name="ios-close-circle-sharp"
              size={24}
              style={styles.iconStatusCancel}
            />
          </Text>

          <Text style={styles.textHeader}>
            {moment(NGAY_LAM_DON).format('DD/MM/YYYY')}
          </Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Appbar.Header style={styles.colorHeader}>
          <Appbar.Action icon="check-circle" color={'#2179A9'} size={30} />
          <Appbar.Content
            title="List đơn xác nhận"
            color={'#2179A9'}
            style={{marginLeft: -15}}
          />
          <TouchableOpacity
            title="Click"
            onPress={() => navigation.navigate('Tạo đơn xác nhận')}>
            <Icon name="ios-add-circle" size={30} style={styles.iconAdd} />
          </TouchableOpacity>
        </Appbar.Header>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.flexTitle}>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.textHeader, {color: '#2179A9'}]}>
              Tổng số đơn xác nhận trong năm:
            </Text>
            <Text>&nbsp;&nbsp;</Text>
            <Text style={[styles.textHeader, {color: '#2179A9'}]}>
              {demDonXacNhanNV.length == 0 ? '0' : demDonXacNhanNV}
            </Text>
          </View>
          <View>
            <TouchableOpacity
              style={styles.btnEye}
              onPress={() => setShowList(!showList)}>
              {showList ? (
                <Icon name={'ios-grid-outline'} size={22} color={'#2179A9'} />
              ) : (
                <Icon name={'ios-list-outline'} size={22} color={'#2179A9'} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        {showList ? (
          <XacNhanTable data={getDonXacNhanNV} checkIcon={checkIcon}/>
        ) : (
          <XacNhanTask data={getDonXacNhanNV} checkIcon={checkIcon}/>
        )}
      
        <View style={styles.flexCenter}>
          <TouchableOpacity
            style={[
              styles.button,
              {backgroundColor: sotrang <= 1 ? '#aaa' : '#2179A9'},
            ]}
            disabled={sotrang <= 1}
            onPress={() => {
              setSotrang(sotrang - 1);
            }}>
            <Icon name="ios-chevron-back" size={24} style={styles.iconPage} />
          </TouchableOpacity>
          <Text>&nbsp;&nbsp;</Text>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor:
                  sotrang > parseFloat(demDonXacNhanNV) / 15
                    ? '#aaa'
                    : '#2179A9',
              },
            ]}
            disabled={sotrang > parseFloat(demDonXacNhanNV) / 15}
            onPress={() => {
              setSotrang(sotrang + 1);
            }}>
            <Icon
              name="ios-chevron-forward"
              size={24}
              style={styles.iconPage}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ViewXacNhan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flexDirection: 'row',
  },
  colorHeader: {
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: Platform.OS === 'ios' ? 0 : 0.2,
    backgroundColor: 'transparent',
    elevation: 1,
  },
  flexTitle: {
    flexDirection: 'row',
    margin: 20,
    marginTop: 10,
    color: '#2179A9',
    justifyContent: 'space-between'
  },
  iconAdd: {
    color: '#2179A9',
  },
  flexCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'space-between',
    height:50,
    alignItems:'center'
  },
  icon: {
    marginRight: 5,
    color: '#2179A9',
  },
  iconPage: {
    color: '#fff',
  },
  textHeader: {
    color: '#444',
    fontSize: 16,
    flexShrink: 1,
  },
  iconStatusCheck: {
    marginRight: 5,
    color: 'green',
  },
  iconStatusWait: {
    color: '#2179A9',
  },
  iconStatusCancel: {
    color: 'red',
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginTop: 0,
    margin: 15,
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: Platform.OS === 'ios' ? '#ccc' : 'transparent',
    shadowOpacity: 5.25,
    shadowRadius: 3.84,
    elevation: 6,
  },
});
