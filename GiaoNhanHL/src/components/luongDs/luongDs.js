import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getLuongDs, getUserDetail} from '../../redux/user/action';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  FlatList,
  Platform,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Appbar} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import md5 from 'md5';
import Icon from 'react-native-vector-icons/Ionicons';
import {Card} from 'react-native-elements';

const LuongDs = () => {
  const dispatch = useDispatch();
  const luongDs = useSelector((store) => store.user.luongDs);
  const UserDetail = useSelector((store) => store.user.UserDetail);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState('');
  const [xacNhan, setXacNhan] = useState(false);
  const [showList, setShowList] = useState(false);

  const getToken = async () => {
    const username = await AsyncStorage.getItem('userToken');
    setUsername(username);
  };
  useEffect(() => {
    getToken();
  }, []);
  useEffect(() => {
    dispatch(getLuongDs(username));
    dispatch(getUserDetail(username));
  }, [username]);
  const buttonConfirm = () => {
    if (UserDetail.MA_XAC_NHAN.toLowerCase() === md5(password).toLowerCase()) {
      setXacNhan(true);
    } else {
      Alert.alert('Sai mật khẩu');
    }
  };
  //   console.log(luongDs)
  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.colorHeader}>
        <Appbar.Action
          icon="currency-usd-circle-outline"
          color={'#2179A9'}
          size={30}
        />
        <Appbar.Content
          title="Bảng lương doanh số"
          color={'#2179A9'}
          style={{marginLeft: -15}}
        />
        <TouchableOpacity
          style={styles.horizontal15}
          onPress={() => setShowList(!showList)}>
          {showList ? (
            <Icon name={'ios-grid-outline'} size={22} color={'#2179A9'} />
          ) : (
            <Icon name={'ios-list-outline'} size={22} color={'#2179A9'} />
          )}
        </TouchableOpacity>
      </Appbar.Header>

      {xacNhan ? (
        <ScrollView style={styles.scrollView}>
          {showList ? (
            <ViewTable data={luongDs} />
          ) : (
            <ViewTask data={luongDs} />
          )}
        </ScrollView>
      ) : (
        <View style={styles.m15}>
          <Text style={styles.textConfirm}>Nhập mã xác nhận</Text>
          <TextInput
            label="Nhập mật khẩu"
            value={password}
            onChangeText={(text) => setPassword(text)}
            underlineColorAndroid="transparent"
            secureTextEntry={true}
            style={styles.input}
          />
                 <View style={styles.btnSuccess}>
            <TouchableOpacity
              onPress={() => buttonConfirm()}
              style={styles.button}>
              <Text style={styles.textSuccess}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
   
        </View>
      )}
    </View>
  );
};

const ViewTask = ({data}) => {
  const convert = (item) => {
    return item.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');
  };
  return (
    <FlatList
      data={data}
      renderItem={({item, index}) => (
        <View style={styles.card}>
          <Card.Title style={[styles.flex, {marginBottom: 0}]}>
            <Text>{item.THANG}</Text>
          </Card.Title>
          <View style={styles.flex}>
            <Text style={styles.textHeader}>{item.HO_VA_TEN}</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.title}>Thâm niên:</Text>
            <Text style={styles.value}>{item.THAM_NIEN}</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.title}>Doanh số CN:</Text>
            <Text style={styles.value}>{item.DOANH_SO}</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.title}>Hiệu suất:</Text>
            <Text style={styles.value}>{item.HIEU_SUAT}</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.title}>Số Km:</Text>
            <Text style={styles.value}>{item.SO_KM}</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.title}>Lương năng suất:</Text>
            <Text style={styles.value}>{convert(item.LUONG_NANG_SUAT)}</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.title}>Thưởng KPI:</Text>
            <Text style={styles.value}>{convert(item.THUONG_KPIS)}</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.title}>Lương thâm niên:</Text>
            <Text style={styles.value}>{convert(item.LUONG_THAM_NIEN)}</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.title}>Phụ cấp:</Text>
            <Text style={styles.value}>{convert(item.PHU_CAP)}</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.title}>Tiền xăng:</Text>
            <Text style={styles.value}>{convert(item.TIEN_XANG_XE)}</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.title}>Trừ lỗi:</Text>
            <Text style={styles.value}>{convert(item.TIEN_TRU_LOI)}</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.title}>Tổng lương DS:</Text>
            <Text style={styles.value}>
              {convert(item.TONG_LUONG_DOANH_SO)}
            </Text>
          </View>
        </View>
      )}
    />
  );
};

const ViewTable = ({data}) => {
  const convert = (item) => {
    return item.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');
  };
  return (
    <ScrollView horizontal={true}>
      <View style={styles.container}>
        <View style={styles.listWrapper}>
          <Text style={[styles.rowHeader, {width: 140}]}>Tháng</Text>
          <Text style={[styles.rowHeader, {width: 200}]}>Họ và tên</Text>
          <Text style={[styles.rowHeader, {width: 150}]}>Thâm niên</Text>
          <Text style={[styles.rowHeader, {width: 150}]}>Doanh sô CN</Text>
          <Text style={[styles.rowHeader, {width: 150}]}>Hiệu suất</Text>
          <Text style={[styles.rowHeader, {width: 150}]}>Số Km</Text>
          <Text style={[styles.rowHeader, {width: 150}]}>Lương năng suất</Text>
          <Text style={[styles.rowHeader, {width: 150}]}>Thưởng KPI</Text>
          <Text style={[styles.rowHeader, {width: 150}]}>Lương thâm niên</Text>
          <Text style={[styles.rowHeader, {width: 150}]}>Phụ cấp</Text>
          <Text style={[styles.rowHeader, {width: 150}]}>Tiền xăng</Text>
          <Text style={[styles.rowHeader, {width: 150}]}>Trừ lỗi</Text>
          <Text style={[styles.rowHeader, {width: 150}]}>Tổng lương DS</Text>
        </View>
        <FlatList
          data={data}
          renderItem={({item, index}) => (
            <View style={styles.listWrapper}>
              <Text style={[styles.row, {width: 140}]}>{item.THANG}</Text>
              <Text style={[styles.row, {width: 200}]}>{item.HO_VA_TEN}</Text>
              <Text style={[styles.row, {width: 150}]}>{item.THAM_NIEN}</Text>
              <Text style={[styles.row, {width: 150}]}>{item.DOANH_SO}</Text>
              <Text style={[styles.row, {width: 150}]}>{item.HIEU_SUAT}</Text>
              <Text style={[styles.row, {width: 150}]}>{item.SO_KM}</Text>
              <Text style={[styles.row, {width: 150}]}>
                {convert(item.LUONG_NANG_SUAT)}
              </Text>
              <Text style={[styles.row, {width: 150}]}>
                {convert(item.THUONG_KPIS)}
              </Text>
              <Text style={[styles.row, {width: 150}]}>
                {convert(item.LUONG_THAM_NIEN)}
              </Text>
              <Text style={[styles.row, {width: 150}]}>
                {convert(item.PHU_CAP)}
              </Text>
              <Text style={[styles.row, {width: 150}]}>
                {convert(item.TIEN_XANG_XE)}
              </Text>
              <Text style={[styles.row, {width: 150}]}>
                {convert(item.TIEN_TRU_LOI)}
              </Text>
              <Text style={[styles.row, {width: 150}]}>
                {convert(item.TONG_LUONG_DOANH_SO)}
              </Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default LuongDs;
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
  horizontal15: {
    marginHorizontal: 15,
  },
  card: {
    marginTop: 0,
    margin: 15,
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: Platform.OS === 'ios' ? '#ccc' : 'transparent',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 5.25,
    shadowRadius: 3.84,
    elevation: 6,
  },
  input: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    flexShrink: 1,
    width: '100%',
  },
  textHeader: {
    color: '#2179A9',
    width: '100%',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 18,
  },
  title: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    textTransform: 'capitalize',
    color: '#444',
    fontSize: 16,
  },
  textConfirm: {
    fontSize: 16,
  },
  value: {
    color: '#444',
    fontSize: 16,
    flex: 3,
    flexWrap: 'wrap',
    textAlign: 'right',
  },
  listWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderBottomWidth: 0.5,
  },
  row: {
    backgroundColor: '#fff',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    fontSize: 16,
    flexShrink: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: '#444',
  },
  row1: {
    backgroundColor: '#fff',
    width: 400,
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: '#444',
  },
  rowHeader: {
    backgroundColor: '#2179A9',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 16,
    flexShrink: 1,
  },
  m15: {
    marginHorizontal: 15,
    textAlign: 'center',
  },
  textSuccess: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  button: {
    width: 80,
    backgroundColor: '#2179A9',
    padding: 5,
    borderRadius: 5,
    marginTop: 10,
    textAlign: 'center',
  },
  btnSuccess: {
    textAlign:'center',
    justifyContent:'center',
    flexDirection:'row'
  }
});
