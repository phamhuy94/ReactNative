import React, {useEffect, useState, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getTimeSheet} from '../redux/user/action';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';

const setting = require('../images/setting.png');
const clock = require('../images/clock.png');
// import Icon from 'react-native-vector-icons/FontAwesome5'

import {Appbar} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
export default function ViewTimeSheet() {
  const dispatch = useDispatch();

  const timeSheet = useSelector((store) => store.user.timeSheet);

  //lay username
  const [username, setUsername] = useState();
  const getToken = async () => {
    const username = await AsyncStorage.getItem('userToken');
    setUsername(username);
  };
  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    dispatch(getTimeSheet(username));
  }, [username]);

  //   const data = useMemo(() => {
  //       if(timeSheet.length == 0) {
  //           return null;
  //       }
  //       return timeSheet
  //   }, [timeSheet]);
  //   if(data === null) return null

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.colorHeader}>
        <Appbar.Content title="Bảng Chấm Công" color={'#2179A9'} />
      </Appbar.Header>
      <FlatList
        data={timeSheet}
        renderItem={({item, index}) => (
          <View style={styles.homeLayout}>
            <View>
              <Text style={styles.textHeader}>{item.THANG_CHAM_CONG}</Text>
              <View style={[styles.card4]}>
                <View>
                  <View style={styles.flex}>
                    <View style={styles.number}>
                      <Image source={setting} style={styles.setting} resizeMode="center"/>
                      <View>
                        <Text style={styles.titleHeader}>Ngày chuẩn</Text>
                        <Text style={styles.date}>{item.NGAY_CHUAN} ngày</Text>
                      </View>
                    </View>

                    <View style={styles.number}>
                      <Image source={clock} style={styles.setting} resizeMode="center"/>
                      <View>
                        <Text style={styles.titleHeader}>Công thực tế</Text>
                        <Text style={styles.date}>{item.CONG_THUC_TE} ngày</Text>
                      </View>
                    </View>
                  </View>

                  {/* <View style={styles.number}>
                      <Text>Số ngày nghỉ:</Text>
                      <Text>&nbsp;&nbsp;</Text>
                      <Text>{item.SO_NGAY_NGHI}</Text>
                    </View>
                  <View style={styles.flex}>
                    <View style={styles.number}>
                      <Text>Ứng lương:</Text>
                      <Text>&nbsp;&nbsp;</Text>
                      <Text>{item.UNG_LUONG}</Text>
                    </View>
                    <View style={styles.number}>
                      <Text>Số lần quên chấm:</Text>
                      <Text>&nbsp;&nbsp;</Text>
                      <Text>{item.SO_LAN_QUEN_CHAM}</Text>
                    </View>
                  </View>  */}
                </View>
              </View>
            </View>

            <View style={[styles.flex]}>
              <View style={[styles.card, {width: '45%'}]}>
                <View>
                  <Text style={styles.text}>Thời gian vi phạm</Text>
                </View>

                <View style={styles.timesheet}>
                  <Text style={styles.title}>Giờ đi muộn:</Text>
                  <Text style={styles.value}>{item.GIO_DI_MUON}</Text>
                </View>
                <View style={styles.timesheet}>
                  <Text style={styles.title}>Giờ về sớm:</Text>
                  <Text style={styles.value}>{item.GIO_VE_SOM}</Text>
                </View>
              </View>
              <View style={[styles.card1, {width: '45%'}]}>
                <View>
                  <Text style={styles.text}>Thời gian tăng ca</Text>
                </View>
                <View style={styles.timesheet}>
                  <Text style={styles.title}>Ngày thường:</Text>
                  <Text style={styles.value}>{item.TANG_CA_NGAY_THUONG}</Text>
                </View>
                <View style={styles.timesheet}>
                  <Text style={styles.title}>Ngày lễ:</Text>
                  <Text style={styles.value}>{item.TANG_CA_NGAY_LE}</Text>
                </View>
              </View>
            </View>

            <View style={[styles.flex]}>
              <View style={[styles.card2, {width: '45%'}]}>
                <View>
                  <Text style={styles.text}>Ngày vi phạm</Text>
                </View>

                <View style={styles.timesheet}>
                  <Text style={styles.title}>Quên chấm công:</Text>
                  <Text style={styles.value}>{item.SO_LAN_QUEN_CHAM}</Text>
                </View>
                <View style={styles.timesheet}>
                  <Text style={styles.title}>Số ngày nghỉ:</Text>
                  <Text style={styles.value}>{item.SO_NGAY_NGHI}</Text>
                </View>
              </View>
              <View style={[styles.card3, {width: '45%'}]}>
                <View>
                  <Text style={styles.text}>Ứng lương</Text>
                </View>
                <View style={styles.timesheet}>
                  <Text style={styles.title}>Vay tín dụng:</Text>
                  <Text style={styles.value}>{item.VAY_TIN_DUNG}</Text>
                </View>
                <View style={styles.timesheet}>
                  <Text style={styles.title}>Ứng lương:</Text>
                  <Text style={styles.value}>{item.UNG_LUONG}</Text>
                </View>
              </View>
            </View>

            <View>

                <View style={[styles.timesheet,{padding:10,}]}>
                  <Text style={styles.valueGhichu}>Ghi chú: {item.GHI_CHU}</Text>
                </View>
              
            </View>
          </View>
        )}
        keyExtractor={(item2, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flex: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  text: {
    fontWeight: '700',
    fontSize: 17,
    marginBottom: 10,
    color: '#626262',
  },
  card: {
    padding: 10,
    margin: 10,
    backgroundColor: '#FDEFEE',
    borderRadius: 5,
  },
  card1: {
    padding: 10,
    margin: 10,
    backgroundColor: '#FEF6EB',
    borderRadius: 5,
  },
  card2: {
    padding: 10,
    margin: 10,
    backgroundColor: '#E2FAFE',
    borderRadius: 5,
  },
  card3: {
    padding: 10,
    margin: 10,
    backgroundColor: '#FAEBFE',
    borderRadius: 5,
  },
  card4: {
    paddingHorizontal:10,
    paddingVertical:20,
    margin: 10,
    color:'#0089FD',
    backgroundColor:'#f2f2f2',
  },
  setting: {
    width: 50,
    height: 50,
    marginRight:10,

  },
  timesheet: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  number: {
    flexDirection: 'row',
  },
  textHeader: {
    color:'#0089FD',
    width: '100%',
    textAlign: 'center',
    fontSize: 20,
    fontWeight:'700'
  },
  colorHeader: {
    shadowColor: '#000',
    
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: 0.2,
    backgroundColor: 'transparent',
    elevation: 1,
  },
  homeLayout: {
    marginBottom: 15,
    borderRadius: 10,
  },
  homeLayout: {
    margin: 10,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#f2f2f2',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 5.25,
    shadowRadius: 3.84,
    elevation: 6,
  },
  titleHeader: {
    fontSize:17,
    color:'#0089FD'
  },
  date: {
    fontSize:17,
    color:'#0089FD'
  },
  title: {
    color: '#626262',
    fontSize: 15,
  },
  value: {
    color: '#626262',
    fontSize: 15,
    flex: 3,
    flexWrap: 'wrap',
    textAlign: 'right',
  },
  valueGhichu: {
    color: '#444',
    fontSize: 16,
    color:'#0089FD',
    fontStyle:'italic'
  },
});
