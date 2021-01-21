import AsyncStorage from '@react-native-community/async-storage';
import React, {useState, useEffect,useCallback} from 'react';
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
} from 'react-native';
import moment from 'moment';

import {Card} from 'react-native-elements';
import {Appbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {_deleteDonXacNhan} from '../api/xacNhan/xacNhan';

const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const ViewXacNhan = ({navigation}) => {
  const dispatch = useDispatch();

  const getDonXacNhanNV = useSelector((store) => store.xacNhan.getDonXacNhanNV);
  const demDonXacNhanNV = useSelector((store) => store.xacNhan.demDonXacNhanNV);
  //lay username
  const [username, setUsername] = useState();
  const getToken = async () => {
    const username = await AsyncStorage.getItem('userToken');
    setUsername(username);
  };
  const hieunm = 'hieunm';
  console.log(demDonXacNhanNV);
  //useState
  const [macongty, setMacongty] = useState('HOPLONG');
  const [isadmin, setIsadmin] = useState(false);
  const [maphongban, setMaphongban] = useState('');
  const [chucvu, setChucvu] = useState('');
  const [tukhoa, setTukhoa] = useState('');
  const [sotrang, setSotrang] = useState(1);
  const [sobanghi, setSobanghi] = useState(15);

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
  }, [username, sotrang]);

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
  }, [username, sotrang]);
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
  }, [username]);

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
  const checkIcon = (TRUONG_PHONG_DA_DUYET, TRUONG_PHONG_HUY_DUYET, id) => {
    if (TRUONG_PHONG_DA_DUYET === true && TRUONG_PHONG_HUY_DUYET === false) {
      return (
        <Icon
          name="ios-checkmark-circle"
          size={26}
          style={styles.iconStatusCheck}
        />
      );
    }
    if (TRUONG_PHONG_DA_DUYET === false && TRUONG_PHONG_HUY_DUYET === false) {
      return (
        <View>
          <Icon
            name="ios-refresh-circle"
            size={26}
            style={styles.iconStatusWait}
          />
          <Button onPress={() => deleteDXN(id)} title="press">
            <Icon
              name="ios-trash-outline"
              size={26}
              style={styles.iconStatusWait}
            />
          </Button>
        </View>
      );
    }
    if (TRUONG_PHONG_HUY_DUYET !== false) {
      return (
        <Icon
          name="ios-close-circle-sharp"
          size={26}
          style={styles.iconStatusCancel}
        />
      );
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Appbar.Header style={styles.colorHeader}>
          <Appbar.Content title="List đơn xác nhận" color={'#fff'} />
          <Button
            title="Click"
            onPress={() => navigation.navigate('Tạo đơn xác nhận')}>
            {/* <Icon name="ios-add-circle-outline" size={26} style={styles.iconAdd} /> */}
          </Button>
        </Appbar.Header>
        <Card>
          <View style={styles.flex}>
            <Text style={styles.textHeader}>
              Tổng số đơn xác nhận trong năm:
            </Text>
            <Text>&nbsp;&nbsp;</Text>
            <Text style={styles.textHeader}>
              {demDonXacNhanNV.length == 0 ? '0' : demDonXacNhanNV}
            </Text>
            {/* <Text style={styles.textHeader}>{item.TONG_SO_NGAY_NGHI_TRONG_NAM}</Text> */}
          </View>
        </Card>
      </View>
      <ScrollView 
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          >
      <FlatList
        data={getDonXacNhanNV}
        renderItem={({item, index}) => (
       
            <View>
              <Card>
                <Card.Title style={styles.flex}>
                  {checkIcon(
                    item.TRUONG_PHONG_DA_DUYET,
                    item.TRUONG_PHONG_HUY_DUYET,
                    item.MA_SO_XAC_NHAN,
                  )}
                  <Text style={styles.textHeader}>
                    {moment(item.NGAY_LAM_DON).format('DD/MM/YYYY')}
                  </Text>
                </Card.Title>
                <View style={styles.flex}>
                  <Icon
                    name="ios-reader-outline"
                    size={26}
                    style={styles.icon}
                  />
                  <Text style={styles.textHeader}>
                    {item.NOI_DUNG_CAN_XAC_NHAN}
                  </Text>
                </View>
                {item.LY_DO_HUY ? (
                  <View style={styles.flex}>
                    <Icon
                      name="ios-time-outline"
                      size={26}
                      style={styles.icon}
                    />
                    <Text style={styles.textHeader}>{item.LY_DO_HUY}</Text>
                  </View>
                ) : (
                  <Text></Text>
                )}

                <View style={styles.flex}>
                  <Icon name="ios-time-outline" size={26} style={styles.icon} />
                  <Text style={styles.textHeader}>
                    {item.NGAY_CAN_XAC_NHAN}
                  </Text>
                </View>
              </Card>
            </View>
       
        )}
      />
      <View style={styles.flexCenter}>
        <TouchableOpacity
          style={[
            styles.button,
            {backgroundColor: sotrang <= 1 ? '#aaa' : '#00B4FF'},
          ]}
          disabled={sotrang <= 1}
          onPress={() => {
            setSotrang(sotrang - 1);
          }}>
          <Icon name="ios-chevron-back" size={26} style={styles.iconPage} />
        </TouchableOpacity>
        <Text>&nbsp;&nbsp;</Text>
          <TouchableOpacity
            style={[
              styles.button,
              {backgroundColor: sotrang > parseFloat(demDonXacNhanNV) / 15 ? '#aaa' : '#00B4FF'},
            ]}
            onPress={() => {
                setSotrang(sotrang + 1);
            }}>
            <Icon name="ios-chevron-forward" size={26} style={styles.iconPage} />
          </TouchableOpacity>
      </View>
      </ScrollView>
    </View>
  );
};

export default ViewXacNhan;

const styles = StyleSheet.create({
  container: {
      flex:1,
  },
  flex: {
    flexDirection: 'row',
    
  },
  colorHeader: {
    backgroundColor: '#00B4FF',
  },
  flexCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 10,
    color: '#000',
  },
  iconPage: {
      color:'#fff'
  },
  textHeader: {
    color: '#000',
    fontSize: 20,
    flexShrink: 1,
  },
  iconStatusCheck: {
    color: 'green',
  },
  iconStatusWait: {
    color: 'deepskyblue',
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
});
