import React, {useEffect, useState, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getBaoCaoTong, UpdateDonGiao} from '../../redux/BCT/action';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  ScrollView,
  Modal,
  TextInput,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Swipeout from 'react-native-swipeout';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

const ItemBaoCaoTong = ({data, onRefresh}) => {
  const dispatch = useDispatch();
  const [formatGhiChu, setFormatGhiChu] = useState(data.GHI_CHU_GIAO_NHAN);
  const [modal, setModal] = useState(false);

  const swipeoutBtn = [
    {
      component: (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}>
          <Icon
            name="ios-sync-circle"
            size={30}
            color={'#fff'}
            style={{padding: 3}}
          />
          <Text style={styles.white}>Update</Text>
        </View>
      ),
      onPress: () => setModal(true),
      backgroundColor: '#4752BB',
      icon: 'trash',
      color: '#fff',
      fontSize: 20,
    },
  ];
  const updateGhiChu = async () => {
    await dispatch(UpdateDonGiao(data.MA_VACH, formatGhiChu, data.LOAI));
 
  };
//   console.log(formatGhiChu)
  const checkGiaoHang = (
    HINH_THUC_GIAO_HANG,
    BEN_XE,
    GUI_xE,
    SDT_NHA_XE,
    XE_XUAT_BEN,
  ) => {
    if (
      HINH_THUC_GIAO_HANG == 'Gửi xe khách' ||
      HINH_THUC_GIAO_HANG == 'Gửi xe ôm' ||
      HINH_THUC_GIAO_HANG == 'Gửi tàu'
    ) {
      return (
        <View
          style={{
            flexDirection: 'row',
            flexShrink: 1,

            flexWrap: 'wrap',
          }}>
          <View style={{flexDirection: 'row', flexShrink: 1, minWidth: 200}}>
            <View>
              <Text style={styles.value}>Bến xe:</Text>
              <Text>{BEN_XE}</Text>

              <Text style={styles.value}>Nhà xe:</Text>
              <Text>{GUI_xE}</Text>
            </View>

            <View>
              <Text style={styles.value}>SĐT nhà xe:</Text>
              <Text>{SDT_NHA_XE}</Text>

              <Text style={styles.value}>Xe xuất bến:</Text>
              <Text>{XE_XUAT_BEN}</Text>
            </View>
          </View>
        </View>
      );
    }
  };

  const checkNgayGioKhach = (
    NGAY_GIO_KHACH_KY_NHAN,
    NGAY_XAC_NHAN_GIAO_HANG,
  ) => {
    if (NGAY_GIO_KHACH_KY_NHAN !== null) {
      return <Icon name="ios-flag" size={22} style={styles.iconStatusWait} />;
    }
    if (NGAY_GIO_KHACH_KY_NHAN === null && NGAY_XAC_NHAN_GIAO_HANG !== null) {
      return <Icon name="ios-bus" size={22} style={styles.iconStatusWait} />;
    }
    if (NGAY_GIO_KHACH_KY_NHAN === null && NGAY_XAC_NHAN_GIAO_HANG === null) {
      return (
        <Icon
          name="ios-navigate-sharp"
          size={22}
          style={styles.iconStatusWait}
        />
      );
    }
  };

  return (
    <View >
      <Swipeout
        right={swipeoutBtn}
        close={true}
        style={{backgroundColor: '#f5f6f6'}}>
        <View
          style={[
            styles.homeLayout,
            {
              backgroundColor:
                data.NGAY_GIO_KHACH_KY_NHAN === null &&
                data.NGAY_XAC_NHAN_GIAO_HANG !== null ?
                '#fff93d' : '#fff'
            },
          ]}>
          <View style={styles.timesheet}>
            <Text style={styles.title}>Mã giao:</Text>
            <Text style={styles.value}>{data.MA_VACH}</Text>
            <Text style={styles.titleXe}>
              {checkNgayGioKhach(
                data.NGAY_GIO_KHACH_KY_NHAN,
                data.NGAY_XAC_NHAN_GIAO_HANG,
              )}
            </Text>
            {/* <Text>{setLoai(loai)}</Text> */}
          </View>
          <View style={[styles.timesheet, {justifyContent: 'flex-start'}]}>
            <Text style={styles.title}>Số lượng đơn:</Text>
            <Text style={styles.titleXe}>{data.TONG_DON}</Text>
    
          </View>
          <View style={[styles.timesheet, {justifyContent: 'flex-start'}]}>
            <Text style={styles.title}>Địa chỉ:</Text>
            <View style={styles.address}>
              <Text style={styles.titleXe}>
                {checkGiaoHang(
                  data.HINH_THUC_GIAO_HANG,
                  data.BEN_XE,
                  data.GUI_xE,
                  data.SDT_NHA_XE,
                  data.XE_XUAT_BEN,
                )}
              </Text>
            </View>
          </View>
          <View style={styles.timesheet}>
            <Text style={styles.title}>Time Start:</Text>
            {data.NGAY_XAC_NHAN_GIAO_HANG !== null ? (
              <Text style={styles.value}>
                {moment(data.NGAY_XAC_NHAN_GIAO_HANG).format(
                  'DD/MM/YYYY HH:mm:ss',
                )}
              </Text>
            ) : (
              <Text></Text>
            )}
          </View>
          <View style={styles.timesheet}>
            <Text style={styles.title}>Time End:</Text>
            {data.NGAY_XAC_NHAN_GIAO_HANG !== null ? (
              <Text style={styles.value}>
                {moment(data.NGAY_GIO_KHACH_KY_NHAN).format(
                  'DD/MM/YYYY HH:mm:ss',
                )}
              </Text>
            ) : (
              <Text></Text>
            )}
          </View>
          <View style={[styles.timesheet, {justifyContent: 'flex-start'}]}>
            <Text style={styles.title}>Thời gian giao:</Text>
            <View>
              {data.NGAY_GIO_KHACH_KY_NHAN !== null ||
              data.NGAY_XAC_NHAN_GIAO_HANG !== null ? (
                <Text style={styles.value}>
                  {(
                    (moment(data.NGAY_GIO_KHACH_KY_NHAN) -
                      moment(data.NGAY_XAC_NHAN_GIAO_HANG)) /
                    60000
                  ).toFixed(0)}
                  &nbsp;phút
                </Text>
              ) : (
                <Text></Text>
              )}
              <Text>
                {(
                  (moment(data.NGAY_GIO_KHACH_KY_NHAN) -
                    moment(data.NGAY_XAC_NHAN_GIAO_HANG)) /
                  60000
                ).toFixed(0) < 15 ? (
                  <Text
                    style={{
                      color: 'red',
                      flexShrink: 1,
                      textAlign: 'left',
                    }}>
                    Cần xác nhận lại thời gian giao hàng
                  </Text>
                ) : (
                  ''
                )}
              </Text>
            </View>
          </View>

          <Text
              onChangeText={setFormatGhiChu}
            style={{
              fontSize: 14,
              color: 'blue',
              fontStyle: 'italic',
            }}>
              {data.GHI_CHU_GIAO_NHAN}
    
          </Text>
        </View>
      </Swipeout>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal(!modal);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <View style={styles.timesheet}>
            <Text style={styles.title}>Mã giao:</Text>
            <Text style={styles.value}>{data.MA_VACH}</Text>
            <Text style={styles.titleXe}>
              {checkNgayGioKhach(
                data.NGAY_GIO_KHACH_KY_NHAN,
                data.NGAY_XAC_NHAN_GIAO_HANG,
              )}
            </Text>
            {/* <Text>{setLoai(loai)}</Text> */}
          </View>
            <View style={[styles.timesheet, {alignItems: 'center'}]}>
              
              <TextInput
                multiline={true}
                onChangeText={setFormatGhiChu}
                style={styles.modalText}>
                    {formatGhiChu}
              </TextInput>
            </View>
            <View style={styles.flexCenter}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModal(!modal);
                  updateGhiChu();
                  onRefresh();
                }}>
                <Text style={styles.textStyle}>Save</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModal(!modal)}>
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default ItemBaoCaoTong;
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  flexDatePicker: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorHeader: {
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: Platform.OS === 'ios' ? 0 : 0.2,
    backgroundColor: 'transparent',
    elevation: 1,
  },
  textHeader: {
    color: '#2179A9',
    width: '100%',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 18,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'left',
    flexShrink: 1,
    width: '100%',
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
    margin: 15,
    padding: 10,
    borderRadius: 5,
   
    shadowColor: Platform.OS === 'ios' ? '#f5f5f5' : 'transparent',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 5.25,
    shadowRadius: 3.84,
    elevation: 4,
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
    marginBottom: 5,
    flexShrink: 1,
  },
  address: {
    flexDirection: 'row',
    textAlign: 'left',
    justifyContent: 'flex-start',
  },
  titleXe: {
    textAlign: 'left',

    textTransform: 'capitalize',
    color: '#444',
    fontSize: 16,
  },
  title: {
    textAlign: 'left',
    textTransform: 'capitalize',
    color: '#444',
    fontSize: 16,
    minWidth: 120,
  },
  value: {
    color: '#444',
    fontSize: 16,
    flex: 1,
    textAlign: 'left',
    flexShrink: 1,
  },
  textDate: {
    color: '#444',
    fontSize: 16,
  },
  valueGhichu: {
    color: '#000',
    fontSize: 16,
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
  buttonClose: {
    backgroundColor: '#1566D5',
  },
  white: {
    color: '#fff',
    fontSize: 16,
  },
});
