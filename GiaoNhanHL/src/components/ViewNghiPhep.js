import React, {useState, useEffect,useCallback } from 'react';
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
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

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
  const getToken = async () => {
    const username = await AsyncStorage.getItem('userToken');
    setUsername(username);
  };

  //useState
  const [macongty, setMacongty] = useState('HOPLONG');
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
  }, [username, sotrang]);

  useEffect(() => {
    getToken();
  }, []);

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
  }, [username,sotrang]);

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
  }, [username]);
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

  //   const buttonAlert = (id) => {
  //       Alert.alert(
  //           'Bạn đã nghĩ kỹ chưa?',
  //           [
  //               {
  //                   text: 'Cancel',
  //                   onPress: () => console.log('Cancel'),
  //                   style: 'cancel'
  //               },
  //               {
  //                   text: 'OK', onPress: () => deleteDNP(id)
  //               }
  //           ],
  //           { cancelable: false }
  //       )
  //   }

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
          <Button onPress={() => deleteDNP(id)} title="press">
            <Icon name="trash" size={26} style={styles.iconStatusWait} />
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
          <Appbar.Content title="Đơn xin nghỉ phép" color={'#fff'} />
          <Button
            title="Click"
            onPress={() => navigation.navigate('Tạo đơn nghỉ phép')}
            >
            {/* <Icon name="ios-add-circle-outline" size={26} style={styles.iconAdd} /> */}
          </Button>
        </Appbar.Header>
        <Card>
          <View style={styles.flex}>
            <Text style={styles.textHeader}>Tổng số ngày nghỉ trong năm:</Text>
            <Text>&nbsp;&nbsp;</Text>
            <Text style={styles.textHeader}>
              {getTongSoNgayNghiNV.length == 0
                ? '0'
                : getTongSoNgayNghiNV[0].TONG_SO_NGAY_NGHI}
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
        data={getListDonXinNghiNV}
        renderItem={({item, index}) => (
      
            <View>
              <Card>
                <Card.Title style={styles.flex}>
                  {checkIcon(
                    item.TRUONG_PHONG_DA_DUYET,
                    item.TRUONG_PHONG_HUY_DUYET,
                    item.MA_SO_XIN_NGHI,
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
                  <Text style={styles.textHeader}>{item.LOAI_NGHI_PHEP}</Text>
                </View>
                <View style={styles.flex}>
                  <Icon name="ios-time-outline" size={26} style={styles.icon} />
                  <Text style={styles.textHeader}>{item.THOI_GIAN_NGHI}</Text>
                </View>

                <View style={styles.flex}>
                  <Icon name="ios-file-tray" size={26} style={styles.icon} />
                  <Text style={styles.textHeader}>
                    {item.TONG_SO_NGAY_NGHI}
                  </Text>
                </View>
                <View style={styles.flex}>
                  <Icon
                    name="ios-chatbox-outline"
                    size={26}
                    style={styles.icon}
                  />
                  <Text style={styles.textHeader}>{item.LY_DO_XIN_NGHI}</Text>
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
            {
              backgroundColor:
                sotrang > parseFloat(getTongSoNgayNghiNV) / 15 ? '#aaa' : '#00B4FF',
            },
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
const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height

export default ViewNghiPhep;

const styles = StyleSheet.create({
  // header: {
  //     flex:1,
  // },
  container: {
    flex:1,
},
  flexCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textHeader: {
    color: '#000',
    fontSize: 20,
    flexShrink: 1,
  },
  colorHeader: {
    backgroundColor: '#00B4FF',
  },
  icon: {
    marginRight: 10,
    color: '#000',
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
  iconAdd: {
    color: '#fff',
  },
  iconPage: {
    color:'#fff'
},
  flex: {
    flexDirection: 'row',
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
