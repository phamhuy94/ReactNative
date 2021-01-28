import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  Button,
  SafeAreaView,
  RefreshControl,
  StyleSheet,
  FlatList,
  TextInput,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import {CheckBox} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {ReactNativeNumberFormat} from '../../components/FormatNumber';
import {Picker} from '@react-native-community/picker';
import AsyncStorage from '@react-native-community/async-storage';
import {
  getListDaNhan,
  noteNoiDung,
  huyDonHang,
} from '../../redux/GiaoNhan/action';
import Icon from 'react-native-vector-icons/Ionicons';
import {Appbar} from 'react-native-paper';
const listSuCo = ['Sai mã', 'Thiếu mã', 'Thừa mã'];

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

function DanhSachDaNhanScreen({navigation}) {
  const dispatch = useDispatch();

  const [username, setUsername] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState('');
  const [suCo, setSuCo] = useState('Sai mã');
  const [noiDungSuCo, setNoiDungSuCo] = useState();

  const [macongty, setMaCongTy] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [maphongban, setMaphongban] = useState('');
  const [disabled, setDisabled] = useState(false);

  const getToken = async () => {
    const username = await AsyncStorage.getItem('userToken');
    const macongty = await AsyncStorage.getItem('maCongTy');
    setUsername(username);
    setMaCongTy(macongty);
  };
  useEffect(() => {
    getToken();
  }, []);

  const data = {
    macongty: macongty,
    username: username,
    isadmin: isAdmin,
    maphongban: maphongban,
  };

  const listDaNhan = useSelector((store) => store.giaoNhan.listDaNhan);
  const listSelectDaNhan = useSelector(
    (store) => store.giaoNhan.listSelectDaNhan,
  );

  const toggleModal = (state) => {
    setSelected(state.SO_CHUNG_TU);
    setModalVisible(!isModalVisible);
  };

  const pressNoteNoiDung = async () => {
    if (suCo === '' || suCo === undefined) {
      Alert.alert('Chưa chọn loại sự cố');
      return;
    }
    if (noiDungSuCo === '' || noiDungSuCo === undefined) {
      Alert.alert('Chưa điền nội dung sự cố');
      return;
    }
    let dataSuCo = {
      SO_CHUNG_TU: selected,
      NOI_DUNG_GHI_CHU: noiDungSuCo,
      SU_CO: suCo,
      NGUOI_GHI_CHU: username,
    };
    const response = await dispatch(noteNoiDung(dataSuCo));
    if (response.indexOf('Thành công') >= 0) {
      Alert.alert(response);
      setModalVisible(false);
      setSuCo('Sai mã');
      setNoiDungSuCo('');
    } else {
      Alert.alert('Note thất bại');
    }
  };

  const press = (state) => {
    if (listSelectDaNhan.length === 0) {
      dispatch({
        type: 'SELECT_DA_NHAN',
        state: state,
      });
    } else {
      if (listSelectDaNhan[0].TEN_CONG_TY === state.TEN_CONG_TY) {
        dispatch({
          type: 'SELECT_DA_NHAN',
          state: state,
        });
      } else {
        Alert.alert('Bạn không thể gộp 2 khách hàng khác nhau');
      }
    }
  };

  let arrayListDaNhan = [];
  for (let item = 0; item < listSelectDaNhan.length; item++) {
    let dataList = {
      SO_CHUNG_TU: listSelectDaNhan[item].SO_CHUNG_TU,
      LOAI: listSelectDaNhan[item].LOAI,
    };
    arrayListDaNhan.push(dataList);
  }

  useEffect(() => {
    dispatch(getListDaNhan(data));
  }, [username, macongty]);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
    dispatch(getListDaNhan(data));
  }, [username, macongty]);

  const functionHuyDonHang = () => {
    dispatch(huyDonHang(arrayListDaNhan, data));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.colorHeader}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Đang nhận" color={'#2179A9'} />
      </Appbar.Header>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <FlatList
          data={listDaNhan}
          renderItem={({index, item}) => (
            <View
              style={[
                styles.item,
                styles.card,
                {backgroundColor: index % 2 == 0 ? '#f2f2f2' : '#fff'},
              ]}>
              <View style={styles.flexCheck}>
                <CheckBox
                  style={styles.checkbox}
                  onPress={() => press(item)}
                  checked={item.isSelected}
                />
                <Text style={styles.header}>{item.SO_CHUNG_TU}</Text>
              </View>

              <Text style={styles.company}>{item.TEN_CONG_TY}</Text>

              {item.DIA_CHI_GIAO_HANG ? (
                <View style={styles.flex}>
                  <View style={styles.icon}>
                  <Icon name="ios-location"  size={20} style={styles.iconImg}/>
                  </View>
                  
                  <Text style={styles.name}>{item.DIA_CHI_GIAO_HANG}</Text>
                </View>
              ) : null}

              {item.LOAI === 'GIAO_HANG' ? (
                <View style={styles.note}>
                  <View style={styles.flex}>
                    <View style={styles.icon} > 
                    <Icon style={styles.iconImg} name="ios-logo-yen" size={20} />
                    </View>
                   
                    <Text style={styles.name}>{item.HINH_THUC_THANH_TOAN}</Text>
                  </View>
                  <View>
                    {item.HINH_THUC_THANH_TOAN === 'Tiền mặt' && (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          alignContent: 'center',
                        }}>
                          <View style={styles.icon}> 
                          <Icon name="md-logo-euro" style={styles.iconImg} size={20} />
                          </View>
                       
                        <ReactNativeNumberFormat
                          string="Tổng tiền:"
                          value={item.TONG_TIEN}
                        />
                      </View>
                    )}
                  </View>
                </View>
              ) : (
                <View style={styles.note}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}>
                    <Icon name="ios-business-sharp" style={styles.icon} />
                    <Text style={styles.name}>
                      Đại diện: {item.NOI_LAY_HANG}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}>
                    <Icon name="ios-logo-html5" size={20} style={styles.icon} />
                    <ReactNativeNumberFormat
                      string="Tổng tiền:"
                      value={item.TONG_TIEN}
                    />
                  </View>
                </View>
              )}
              <View>
                <Text style={styles.header}>{item.GHI_CHU}</Text>
              </View>
              <View style={styles.buttonNote}>
                <Icon.Button
                  style={{backgroundColor: '#2179A9'}}
                  name="ios-reader-outline"
                  onPress={() => toggleModal(item)}>
                  Note
                </Icon.Button>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>

      <View style={styles.button}>
        <Icon.Button
          name="ios-add-circle"
          style={{backgroundColor: '#2179A9'}}
          onPress={() =>
            navigation.navigate('Tạo đề nghị thanh toán', {
              listSelectDaNhan: listSelectDaNhan,
            })
          }>
          Tạo ĐNTT
        </Icon.Button>
        <Text>&nbsp;&nbsp;&nbsp;</Text>
        <Icon.Button
          name="ios-checkmark-circle"
          style={
            listSelectDaNhan.length == 0
              ? {backgroundColor: '#bbb'}
              : {backgroundColor: '#2179A9'}
          }
          disabled={listSelectDaNhan.length == 0 ? true : false}
          onPress={() =>
            navigation.navigate('Xác nhận giao hàng', {
              listSelectDaNhan: listSelectDaNhan,
            })
          }>
          Xác nhận
        </Icon.Button>
        <Text>&nbsp;&nbsp;&nbsp;</Text>
        <Icon.Button
          name="ios-close-circle-sharp"
          style={
            listSelectDaNhan.length == 0
              ? {backgroundColor: '#bbb'}
              : {backgroundColor: '#2179A9'}
          }
          onPress={() => functionHuyDonHang()}>
          Hủy nhận
        </Icon.Button>
      </View>
      <Modal isVisible={isModalVisible}>
        <View style={{backgroundColor: 'white', padding: 15}}>
          <Picker selectedValue={suCo} onValueChange={setSuCo}>
            {listSuCo.map((item, index) => {
              return <Picker.Item label={item} value={item} key={index} />;
            })}
          </Picker>
          <TextInput
            multiline={true}
            style={styles.input}
            numberOfLines={4}
            onChangeText={setNoiDungSuCo}
            value={noiDungSuCo}
            placeholder="Nhập nội dung sự cố"
            placeholderTextColor="#ccc"
          />
          <View style={styles.flexCheck}>
            <Icon.Button
              onPress={() => pressNoteNoiDung()}
              name="ios-save-sharp"
              style={{backgroundColor: '#2179A9'}}>
              Lưu
            </Icon.Button>
            <Icon.Button
              name="ios-exit"
              onPress={toggleModal}
              style={{backgroundColor: '#2179A9'}}>
              Đóng
            </Icon.Button>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flexDirection: 'row',

    alignItems: 'center',
    marginBottom:10,
  },
  card: {
    marginVertical:10,
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
    shadowOffset: {width: 1, height: 3},
    shadowColor: Platform.OS === 'ios' ? ('#ccc') : ('transparent'),
    elevation: 6,
  },
  flexCheck: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  textHeader: {
    color: '#444',
    fontSize: 16,
    flexShrink: 1,
  },
  colorHeader: {
    shadowColor: '#000',
    shadowOpacity: Platform.OS === 'ios' ? 0 : 0.2 ,
    backgroundColor: 'transparent',
    elevation: 1,
  },
  item: {
    flex: 1,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 18,
    color: '#2179A9',
    paddingHorizontal: 10,
    flex: 1,
  },
  company: {
    fontSize: 18,
    color: '#000',
    marginVertical: 10,
    marginHorizontal: 10,
    textAlign: 'center',
  },
  name: {
    color: '#444',
    fontSize: 16,
    flexShrink: 1,
  },
  phone: {
    color: '#aaa',
    fontSize: 16,
  },

  checkbox: {
    marginRight: 10,
    width: 25,
    height: 25,
    borderRadius: 50,
  },

  buttonNote: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  note: {
    fontSize: 16,
  },
  button: {
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center',
  },
  input: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    flexShrink: 1,
    width: '100%',
  },
  icon: {
    marginRight: 10,
    fontSize: 20,
    backgroundColor: '#eee',
    borderRadius: 35 / 2,
    height: 35,
    width: 35,
    alignItems:'center',
    alignContent:'center',
    textAlignVertical:'center',
  },
  iconImg: {
    color: '#2179A9',
    lineHeight:35,
  }
});
export default DanhSachDaNhanScreen;
