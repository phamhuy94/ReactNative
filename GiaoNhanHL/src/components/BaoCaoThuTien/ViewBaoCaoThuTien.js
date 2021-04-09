import React, {useEffect, useState, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getListBaoCaoThuTien} from '../../redux/BCTT/action';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  ScrollView,
  Platform,
} from 'react-native';
import {Appbar} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import DatePicker from '../../components/datePicker';
import Icon from 'react-native-vector-icons/Ionicons';
const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export default function ViewBaoCaoThuTien() {
  const dispatch = useDispatch();

  const listBaoCaoThuTien = useSelector(
    (store) => store.baoCaoThuTien.listBaoCaoThuTien,
  );
  const [macongty, setMaCongTy] = useState('');
  const [username, setUsername] = useState('');
  const [isadmin, setIsadmin] = useState(false);
  const [tukhoa1, setTukhoa1] = useState('');
  const [tukhoa2, setTukhoa2] = useState('');
  const [tukhoa3, setTukhoa3] = useState('');
  const [date, setDate] = useState(new Date());
  const [sotrang, setSotrang] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  // console.log(date);

  const getToken = async () => {
    const username = await AsyncStorage.getItem('userToken');
    const macongty = await AsyncStorage.getItem('maCongTy');
    setUsername(username);
    setMaCongTy(macongty);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
    dispatch(
      getListBaoCaoThuTien(
        macongty,
        username,
        isadmin,
        tukhoa1,
        tukhoa2,
        tukhoa3,
        date,
        sotrang,
      ),
    );
  }, []);

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    dispatch(
      getListBaoCaoThuTien(
        macongty,
        username,
        isadmin,
        tukhoa1,
        tukhoa2,
        tukhoa3,
        date,
        sotrang,
      ),
    );
  }, [macongty, username, isadmin, tukhoa1, tukhoa2, tukhoa3, date, sotrang]);
  console.log(listBaoCaoThuTien);
  return (
    <View style={styles.container}>
      <View>
        <Appbar.Header style={styles.colorHeader}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Appbar.Action icon="link-box-outline" color={'#fff'} size={30} />
            <Appbar.Content
              title="Báo cáo thu tiền"
              color={'#fff'}
              style={{marginLeft: -15}}
            />
          </View>
        </Appbar.Header>
        <View style={styles.flexTime}>
          <View style={[styles.flexDatePicker, {marginHorizontal: 15}]}>
            <Text style={styles.textDate}>Ngày: </Text>

            <DatePicker
              onPress={(text) => setDate(text)}
              maxDate={new Date()}
              style={styles.datepicker}
            />
          </View>
        </View>
      </View>
      <View>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <FlatList
            data={listBaoCaoThuTien}
            renderItem={({item, index}) => (
              <View style={styles.homeLayout}>
                <View style={styles.timesheet}>
                  <Text style={styles.title}>Số PXK</Text>
                  <Text style={styles.value}>{item.SO_CHUNG_TU}</Text>
                </View>
                <View style={styles.timesheet}>
                  <Text style={styles.title}>Khách hàng</Text>
                  <Text style={styles.value}>{item.TEN_CONG_TY}</Text>
                </View>
                <View style={styles.timesheet}>
                  <Text style={styles.title}>Tổng tiền</Text>

                  <Text style={styles.value}>
                    {item.TONG_TIEN.toString().replace(
                      /(\d)(?=(\d\d\d)+(?!\d))/g,
                      '$1,',
                    )}
                    đ
                  </Text>
                </View>
                <View style={styles.timesheet}>
                  <Text style={styles.title}>Người giao</Text>
                  <Text style={styles.value}>{item.TEN_NGUOI_GIAO_HANG}</Text>
                </View>
                <View style={styles.timesheet}>
                  <Text style={styles.title}>Trạng thái</Text>
                  <Text style={styles.value}>
                    {item.DA_THU_TIEN_HANG == true ? 'Đã thu tiền' : ''}
                  </Text>
                </View>
              </View>
            )}
          />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    marginTop: 50,
  },
  flex: {
    flex: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: '#000',
  },
  flexDate: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  colorHeader: {
    shadowColor: '#000',
    flexDirection: 'column',
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: Platform.OS === 'ios' ? 0 : 0.2,
    backgroundColor: '#2179A9',
    elevation: 1,
    height: 100,

  },
  flexDatePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
  },
  flexTime: {
    margin:80,
      flexDirection: 'column',
    marginTop: 0,
    justifyContent:'center',

    borderRadius: 5,
    height: 60,
    top: -30,
    backgroundColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 5.25,
    shadowRadius: 3.84,
    elevation: 4,
  },

  textHeader: {
    color: '#2179A9',
    width: '100%',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 18,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 30,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 6,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  homeLayout: {
    margin: 10,
    flex: 1,
    padding: 10,
    shadowOffset: {width: 2, height: 2},
    borderColor: '#ddd',
    shadowOpacity: 0.5,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  datepicker: {
    color: '#444',
  },
  flexCenter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  timesheet: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    textTransform: 'capitalize',
    color: '#444',
    fontSize: 16,
    minWidth: 100,
  },
  value: {
    color: '#444',
    fontSize: 16,
    flex: 3,
    flexWrap: 'wrap',
    textAlign: 'left',
  },
  valueGhichu: {
    color: '#000',
    fontSize: 16,
  },
  border: {
    borderBottomColor: '#2179A9',
    borderBottomWidth: 1,
    flex: 1,
    width: 200,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    top: -10,
    alignSelf: 'center',
    flexDirection: 'row',
    marginHorizontal: 'auto',
    marginVertical: 0,
  },
  button: {
    borderRadius: 20,
    minWidth: 100,
    alignSelf: 'center',
    height: 35,
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1166D5',
  },
});
