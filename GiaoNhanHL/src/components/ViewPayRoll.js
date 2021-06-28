import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPayRoll, getUserDetail} from '../redux/user/action';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  FlatList,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';

import {Appbar} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import md5 from 'md5';

export default function ViewPayRoll() {
  const dispatch = useDispatch();

  const payRoll = useSelector((store) => store.user.payRoll);
  const UserDetail = useSelector((store) => store.user.UserDetail);

  //lay username
  const [username, setUsername] = useState();
  const [password, setPassword] = useState('');
  const [xacNhan, setXacNhan] = useState(false);
  const getToken = async () => {
    const username = await AsyncStorage.getItem('userToken');
    setUsername(username);
  };
  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    dispatch(getPayRoll(username));
    dispatch(getUserDetail(username));
  }, [username]);

  const buttonConfirm = () => {
    if (UserDetail.MA_XAC_NHAN.toLowerCase() === md5(password).toLowerCase()) {
      setXacNhan(true);
    } else {
      Alert.alert('Sai mật khẩu');
    }
  };
  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.colorHeader}>
        <Appbar.Action
          icon="currency-usd-circle-outline"
          color={'#2179A9'}
          size={30}
        />
        <Appbar.Content
          title="Bảng Lương"
          color={'#2179A9'}
          style={{marginLeft: -15}}
        />
      </Appbar.Header>
      {xacNhan ? (
        <FlatList
          data={payRoll}
          renderItem={({item, index}) => (
            <View style={styles.homeLayout}>
              <Text style={styles.textHeader}>{item.THANG_LUONG}</Text>
              <View style={styles.timesheet}>
                <Text style={styles.title}>Lương cơ bản</Text>
                <Text style={styles.value}>{item.LUONG_CO_BAN}</Text>
              </View>
              <View style={styles.timesheet}>
                <Text style={styles.title}>Lương bảo hiểm</Text>
                <Text style={styles.value}>{item.LUONG_BAO_HIEM}</Text>
              </View>
              <View>
                <Text style={styles.border}></Text>
                <Text style={styles.titleCenter}>Phụ cấp</Text>

                <View style={styles.timesheet}>
                  <Text style={styles.title}>Ăn trưa</Text>
                  <Text style={styles.value}>{item.PHU_CAP_AN_TRUA}</Text>
                </View>
                <View style={styles.timesheet}>
                  <Text style={styles.title}>Đi lại/ĐT</Text>
                  <Text style={styles.value}>
                    {item.PHU_CAP_DI_LAI_DIEN_THOAI}
                  </Text>
                </View>
                <View style={styles.timesheet}>
                  <Text style={styles.title}>DS/CB</Text>
                  <Text style={styles.value}>
                    {item.PHU_CAP_THUONG_DOANH_SO}
                  </Text>
                </View>
                <View style={styles.timesheet}>
                  <Text style={styles.title}>Trách nhiệm</Text>
                  <Text style={styles.value}>{item.PHU_CAP_TRACH_NHIEM}</Text>
                </View>
                <View style={styles.timesheet}>
                  <Text style={styles.title}>Khác</Text>
                  <Text style={styles.value}>{item.PHU_CAP_THEM}</Text>
                </View>
              </View>
              <View style={styles.timesheet}>
                <Text style={styles.title}>Công cơ bản</Text>
                <Text style={styles.value}>{item.CONG_CO_BAN}</Text>
              </View>
              <View>
                <Text style={styles.border}></Text>
                <Text style={styles.titleCenter}>Lương cơ bản</Text>

                <View style={styles.timesheet}>
                  <Text style={styles.title}>Ngày</Text>
                  <Text style={styles.value}>{item.LUONG_CO_BAN_NGAY}</Text>
                </View>
                <View style={styles.timesheet}>
                  <Text style={styles.title}>Giờ</Text>
                  <Text style={styles.value}>{item.LUONG_CO_BAN_GIO}</Text>
                </View>
              </View>
              <View>
                <Text style={styles.border}></Text>
                <Text style={styles.titleCenter}>Bảo hiểm</Text>

                <View style={styles.timesheet}>
                  <Text style={styles.title}>Công ty đóng</Text>
                  <Text style={styles.value}>{item.BAO_HIEM_CONG_TY_DONG}</Text>
                </View>
                <View style={styles.timesheet}>
                  <Text style={styles.title}>Nhân viên đóng</Text>
                  <Text style={styles.value}>
                    {item.BAO_HIEM_NHAN_VIEN_DONG}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={styles.border}></Text>
                <Text style={styles.titleCenter}>Lương thực tế</Text>

                <View style={styles.timesheet}>
                  <Text style={styles.title}>Công đi làm thực </Text>
                  <Text style={styles.value}>
                    {item.LUONG_THUC_TE_CONG_LAM_THUC}
                  </Text>
                </View>
                <View style={styles.timesheet}>
                  <Text style={styles.title}>Số tiền</Text>
                  <Text style={styles.value}>{item.LUONG_THUC_TE_SO_TIEN}</Text>
                </View>
              </View>

              <View>
                <Text style={styles.border}></Text>
                <Text style={styles.titleCenter}>Lương làm thêm</Text>

                <View style={styles.timesheet}>
                  <Text style={styles.title}>Công ngày thường</Text>
                  <Text style={styles.value}>
                    {item.LUONG_LAM_THEM_CONG_NGAY_THUONG.toFixed(2)}
                  </Text>
                </View>
                <View style={styles.timesheet}>
                  <Text style={styles.title}>Số tiền</Text>
                  <Text style={styles.value}>
                    {item.LUONG_LAM_THEM_TIEN_CONG_NGAY_THUONG.toFixed(2)}
                  </Text>
                </View>
                <View style={styles.timesheet}>
                  <Text style={styles.title}>Công ngày nghỉ</Text>
                  <Text style={styles.value}>
                    {item.LUONG_LAM_THEM_CONG_NGAY_NGHI.toFixed(2)}
                  </Text>
                </View>
                <View style={styles.timesheet}>
                  <Text style={styles.title}>Số tiền</Text>
                  <Text style={styles.value}>
                    {item.LUONG_LAM_THEM_TIEN_CONG_NGAY_NGHI.toFixed(2)}
                  </Text>
                </View>
                <View style={styles.timesheet}>
                  <Text style={styles.title}>Công ngày lễ</Text>
                  <Text style={styles.value}>
                    {item.LUONG_LAM_THEM_CONG_NGAY_LE.toFixed(2)}
                  </Text>
                </View>
                <View style={styles.timesheet}>
                  <Text style={styles.title}>Số tiền</Text>
                  <Text style={styles.value}>
                    {item.LUONG_LAM_THEM_TIEN_CONG_NGAY_LE}
                  </Text>
                </View>
              </View>

              <View style={styles.timesheet}>
                <Text style={styles.title}>Tạm ứng</Text>
                <Text style={styles.value}>{item.TAM_UNG}</Text>
              </View>

              <View style={styles.timesheet}>
                <Text style={styles.title}>Vay tín dụng</Text>
                <Text style={styles.value}>{item.VAY_TIN_DUNG}</Text>
              </View>
              <View style={styles.timesheet}>
                <Text style={styles.title}>Tổng thu nhập</Text>
                <Text style={styles.value}>{item.TONG_THU_NHAP}</Text>
              </View>

              <View>
                <Text style={styles.border}></Text>
                <Text style={styles.titleCenter}>Phạt đi trễ</Text>

                <View style={styles.timesheet}>
                  <Text style={styles.title}>Số giờ </Text>
                  <Text style={styles.value}>{item.GIO_DI_TRE.toFixed(2)}</Text>
                </View>
                <View style={styles.timesheet}>
                  <Text style={styles.title}>Số tiền</Text>
                  <Text style={styles.value}>{item.PHAT_DI_TRE}</Text>
                </View>
              </View>

              <View style={styles.timesheet}>
                <Text style={styles.title}>Phạt</Text>
                <Text style={styles.value}>{item.PHAT_QUEN_DEO_THE}</Text>
              </View>

              <View style={styles.timesheet}>
                <Text style={styles.title}>Quỹ công đoàn</Text>
                <Text style={styles.value}>{item.CONG_DOAN}</Text>
              </View>
              <View style={styles.timesheet}>
                <Text style={styles.title}>Lương lao công</Text>
                <Text style={styles.value}>{item.LUONG_LAO_CONG}</Text>
              </View>
              <View style={styles.timesheet}>
                <Text style={[styles.title, {color: '#2179A9'}]}>
                  Thực lĩnh
                </Text>
                <Text style={[styles.value, {color: '#2179A9'}]}>
                  {item.THUC_LINH}
                </Text>
              </View>
            </View>
          )}
          keyExtractor={(item2, index) => index.toString()}
        />
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textHeader: {
    color: '#2179A9',
    width: '100%',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 18,
  },
  colorHeader: {
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: Platform.OS === 'ios' ? 0 : 0.2,
    backgroundColor: 'transparent',
    elevation: 1,
  },
  input: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    flexShrink: 1,
    width: '100%',
  },
  homeLayout: {
    margin: 15,
    marginBottom: 15,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#f4f4f4',
    shadowOffset: {width: 2, height: 5},
    borderColor: '#eee',
    shadowColor: '#ddd',
    borderWidth: 1,
    shadowOpacity: 0.8,
    elevation: 4,
  },

  timesheet: {
    flex: 2,
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
  },
  titleCenter: {
    color: '#2179A9',
    fontSize: 18,
    textAlign: 'center',
  },
  border: {
    borderBottomColor: '#2179A9',
    borderBottomWidth: 1,
    flex: 1,
    width: 200,
    textAlign: 'center',

    alignSelf: 'center',
    flexDirection: 'row',
    marginHorizontal: 'auto',
    marginVertical: 0,
  },
  value: {
    color: '#444',
    fontSize: 16,
    flex: 3,
    flexWrap: 'wrap',
    textAlign: 'right',
  },
  valueLeft: {
    textAlign: 'left',
    color: '#444',
    fontSize: 1,
  },
  valueGhichu: {
    color: '#444',
    fontSize: 16,
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textConfirm: {
    fontSize: 16,
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
