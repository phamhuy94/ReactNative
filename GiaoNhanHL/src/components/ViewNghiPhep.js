import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  GetDonXinNghiNV,
  GetTongSoNgayNghiNV,
  DeleteDonNghiPhep,
} from '../redux/nghiPhep/action';

import {
  Text,
  View,
  StyleSheet,
  RefreshControl,
  FlatList,
  Dimensions,
  ScrollView,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Card} from 'react-native-elements';
import {Appbar} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const ViewNghiPhep = ({navigation}) => {
  const dispatch = useDispatch();

  const getListDonXinNghiNV = useSelector(
    (store) => store.nghiPhep.getListDonXinNghiNV,
  );

  const getTongSoNgayNghiNV = useSelector(
    (store) => store.nghiPhep.getTongSoNgayNghiNV,
  );

  //lay username
  const [username, setUsername] = useState();

  //useState
  const [macongty, setMacongty] = useState();
  const [isadmin, setIsadmin] = useState(false);
  const [tukhoa, setTukhoa] = useState('');
  const [tukhoa2, setTukhoa2] = useState('');
  const [sotrang, setSotrang] = useState(1);
  const [sobanghi, setSobanghi] = useState(15);
  const [maphongban, setMaphongban] = useState('');
  const [thang, setThang] = useState('');
  const [nam, setNam] = useState(new Date().getFullYear());
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
    dispatch(
      GetDonXinNghiNV(
        macongty,
        username,
        isadmin,
        tukhoa,
        tukhoa2,
        sotrang,
        sobanghi,
      ),
    );
  }, []);

  const getToken = async () => {
    const username = await AsyncStorage.getItem('userToken');
    const macongty = await AsyncStorage.getItem('maCongTy');
    setUsername(username);
    setMacongty(macongty);
  };

  useEffect(() => {
    getToken();
  }, []);

  const data = {
    username: username,
    macongty: macongty,
  };

  useEffect(() => {
    dispatch(
      GetDonXinNghiNV(
        macongty,
        username,
        isadmin,
        tukhoa,
        tukhoa2,
        sotrang,
        sobanghi,
      ),
    );
  }, [username, macongty]);

  useEffect(() => {
    dispatch(
      GetTongSoNgayNghiNV(
        macongty,
        isadmin,
        username,
        maphongban,
        thang,
        nam,
        tukhoa,
      ),
    );
  }, [username, macongty]);
  const deleteDNP = async (id) => {
    await dispatch(DeleteDonNghiPhep(id));
    await dispatch(
      GetDonXinNghiNV(
        macongty,
        username,
        isadmin,
        tukhoa,
        tukhoa2,
        sotrang,
        sobanghi,
      ),
    );
  };
 console.log(getTongSoNgayNghiNV.length);
  const checkIcon = (
    TRUONG_PHONG_DA_DUYET,
    TRUONG_PHONG_HUY_DUYET,
    id,
    NGAY_LAM_DON,
  ) => {
    if (TRUONG_PHONG_DA_DUYET === true && TRUONG_PHONG_HUY_DUYET === false) {
      return (
        <View style={{flexDirection: 'row'}}>
          <Icon
            name="ios-checkmark-circle"
            size={24}
            style={styles.iconStatusCheck}
          />
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
          }}>
                  <View style={{left: 50}}>
            <Icon
              name="ios-refresh-circle"
              size={24}
              style={styles.iconStatusWait}
            />
          </View>
          <Text style={[styles.textHeader, {left: 50,}]}>
            {moment(NGAY_LAM_DON).format('DD/MM/YYYY')}
          </Text>
          <View style={{marginLeft:150}}>
            <TouchableOpacity onPress={() => deleteDNP(id)}>
              <Icon name="trash" size={24} style={styles.iconStatusWait} />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    if (TRUONG_PHONG_HUY_DUYET !== false) {
      return (
        <View style={{flexDirection:'row'}}>
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
          <Appbar.Action
            icon="newspaper-variant-outline"
            color={'#2179A9'}
            size={30}
          />
          <Appbar.Content
            title="Đơn xin nghỉ phép"
            color={'#2179A9'}
            style={{marginLeft: -15}}
          />
          <TouchableOpacity
            title="Click"
            onPress={() => navigation.navigate('Tạo đơn nghỉ phép', {data})}>
            <Icon name="ios-add-circle" size={30} style={styles.iconAdd} />
          </TouchableOpacity>
        </Appbar.Header>

        <View style={styles.flexTitle}>
          <Text style={[styles.textHeader, {color: '#2179A9'}]}>
            Tổng số ngày nghỉ trong năm:
          </Text>
          <Text>&nbsp;&nbsp;</Text>
          <Text style={[styles.textHeader, {color: '#2179A9'}]}>
            {getTongSoNgayNghiNV.length == 0
              ? '0'
              : getTongSoNgayNghiNV[0].TONG_SO_NGAY_NGHI}
          </Text>
          {/* <Text style={styles.textHeader}>{item.TONG_SO_NGAY_NGHI_TRONG_NAM}</Text> */}
        </View>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <FlatList
          data={getListDonXinNghiNV}
          renderItem={({item, index}) => (
            <View style={styles.card}>
              <Card.Title>
                <View style={styles.icon}>
                  {checkIcon(
                    item.TRUONG_PHONG_DA_DUYET,
                    item.TRUONG_PHONG_HUY_DUYET,
                    item.MA_SO_XIN_NGHI,
                    item.NGAY_LAM_DON,
                  )}
                </View>
              </Card.Title>

              <View style={styles.flex}>
                <Icon name="ios-bookmark-sharp" size={24} style={styles.icon} />
                <Text style={styles.textHeader}>{item.LOAI_NGHI_PHEP}</Text>
              </View>
              <View style={styles.flex}>
                <Icon name="ios-time" size={24} style={styles.icon} />
                <Text style={styles.textHeader}>{item.THOI_GIAN_NGHI}</Text>
              </View>
              <View style={styles.flex}>
                <Icon name="md-alert-circle" size={24} style={styles.icon} />
                <Text style={styles.textHeader}>{item.TONG_SO_NGAY_NGHI}</Text>
              </View>
              <View style={styles.flex}>
                <Icon name="ios-reader" size={24} style={styles.icon} />
                <Text style={styles.textHeader}>{item.LY_DO_XIN_NGHI}</Text>
              </View>
            </View>
          )}
        />

        {/* Phan trang */}
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
                  sotrang > parseFloat(getListDonXinNghiNV.length) / 15
                    ? '#aaa'
                    : '#2179A9',
              },
            ]}
            disabled={sotrang > parseFloat(getListDonXinNghiNV.length) / 15}
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
const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height

export default ViewNghiPhep;

const styles = StyleSheet.create({
  position: {
    zIndex: 1,
    flex: 3,
    left: 0,
  },
  header: {},
  container: {
    flex: 1,
    backgroundColor: '#f0f2f2',
  },
  flexCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'space-between',
  },
  textHeader: {
    color: '#444',
    fontSize: 16,
    flexShrink: 1,
  },
  flexTitle: {
    flexDirection: 'row',
    margin: 20,
    marginTop: 10,
    color: '#2179A9',
  },
  flex: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 5,
  },
  colorHeader: {
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: 0.2,
    backgroundColor: 'transparent',
    elevation: 1,
  },

  icon: {
    marginRight: 5,
    color: '#2179A9',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconAdd: {
    color: '#2179A9',
  },
  iconStatusCheck: {
    color: 'green',
  },
  iconStatusWait: {
    color: '#2179A9',
  },
  iconStatusCancel: {
    color: 'red',
  },

  iconPage: {
    color: '#fff',
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
    shadowOpacity: 5.25,
    shadowRadius: 3.84,
    elevation: 6,
  },
});
