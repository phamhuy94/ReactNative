import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPayRoll} from '../redux/user/action';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
} from 'react-native';

import {Appbar} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

export default function ViewPayRoll() {
  const dispatch = useDispatch();

  const payRoll = useSelector((store) => store.user.payRoll);

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
    dispatch(getPayRoll('thangth'));
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
        <Appbar.Content title="Bảng Lương" color={'#fff'} />
      </Appbar.Header>
      <FlatList
        inverted
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
                <Text style={styles.value}>{item.PHU_CAP_THUONG_DOANH_SO}</Text>
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
                <Text style={styles.value}>{item.BAO_HIEM_NHAN_VIEN_DONG}</Text>
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
                  {(item.LUONG_LAM_THEM_CONG_NGAY_THUONG).toFixed(2)}
                </Text>
              </View>
              <View style={styles.timesheet}>
                <Text style={styles.title}>Số tiền</Text>
                <Text style={styles.value}>
                  {(item.LUONG_LAM_THEM_TIEN_CONG_NGAY_THUONG).toFixed(2)}
                </Text>
              </View>
              <View style={styles.timesheet}>
                <Text style={styles.title}>Công ngày nghỉ</Text>
                <Text style={styles.value}>
                  {(item.LUONG_LAM_THEM_CONG_NGAY_NGHI).toFixed(2)}
                </Text>
              </View>
              <View style={styles.timesheet}>
                <Text style={styles.title}>Số tiền</Text>
                <Text style={styles.value}>
                  {(item.LUONG_LAM_THEM_TIEN_CONG_NGAY_NGHI).toFixed(2)}
                </Text>
              </View>
              <View style={styles.timesheet}>
                <Text style={styles.title}>Công ngày lễ</Text>
                <Text style={styles.value}>
                  {(item.LUONG_LAM_THEM_CONG_NGAY_LE).toFixed(2)}
                </Text>
              </View>
              <View style={styles.timesheet}>
                <Text style={styles.title}>Số tiền</Text>
                <Text style={styles.value}>
                  {item.LUONG_LAM_THEM_TIEN_CONG_NGAY_LE}
                </Text>
              </View>
            </View>
            <Text style={styles.border}></Text>
            <View style={styles.timesheet}>
              <Text style={styles.title}>Tổng thu nhập</Text>
              <Text style={styles.value}>{item.TONG_THU_NHAP}</Text>
            </View>
            <Text style={styles.border}></Text>
            <View style={styles.timesheet}>
              <Text style={styles.title}>Tạm ứng</Text>
              <Text style={styles.value}>{item.TAM_UNG}</Text>
            </View>

            <View style={styles.timesheet}>
              <Text style={styles.title}>Vay tín dụng</Text>
              <Text style={styles.value}>{item.VAY_TIN_DUNG}</Text>
            </View>

            <View>
              <Text style={styles.border}></Text>
              <Text style={styles.titleCenter}>Phạt đi trễ</Text>

              <View style={styles.timesheet}>
                <Text style={styles.title}>Số giờ </Text>
                <Text style={styles.value}>
                  {(item.GIO_DI_TRE).toFixed(2)}
                </Text>
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
              <Text style={styles.title}>Thực lĩnh</Text>
              <Text style={styles.value}>{item.THUC_LINH}</Text>
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
    flex:1
  },
  textHeader: {
    color: '#000',
    width: '100%',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 24,
  },
  colorHeader: {
    backgroundColor: '#00B4FF',
  },
  homeLayout: {
    margin: 15,
    marginBottom: 15,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'rgba(0,0,0, 0.3)',
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
    color: '#000',
    fontSize: 20,
  },
  titleCenter: {
    color: '#000',
    fontSize: 20,
    textAlign: 'center',
  },
  border: {
    borderBottomColor: 'red',
    borderBottomWidth: 1,
  },
  value: {
    color: '#000',
    fontSize: 20,
    flex: 3,
    flexWrap: 'wrap',
    textAlign: 'right',
  },
  valueLeft: {
    textAlign: 'left',
    color: '#000',
    fontSize: 20,
  },
  valueGhichu: {
    color: '#000',
    fontSize: 20,
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
