import React, {useEffect, useState,useCallback} from 'react';
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
} from 'react-native';
import Modal from 'react-native-modal';
import {CheckBox} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {ReactNativeNumberFormat} from '../../components/FormatNumber';
import {Picker} from '@react-native-community/picker';
import AsyncStorage from '@react-native-community/async-storage';
import {getListDaNhan, noteNoiDung} from '../../redux/GiaoNhan/action';
import Icon from 'react-native-vector-icons/Ionicons';
import {Appbar} from 'react-native-paper';
const listSuCo = ['Sai mã', 'Thiếu mã', 'Thừa mã'];

const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

function DanhSachDaNhanScreen({navigation}) {
  const dispatch = useDispatch();

  const [username, setUsername] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState('');
  const [suCo, setSuCo] = useState('Sai mã');
  const [noiDungSuCo, setNoiDungSuCo] = useState();

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

  const getToken = async () => {
    const username = await AsyncStorage.getItem('userToken');
    setUsername(username);
  };

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
    dispatch(getListDaNhan());
  },[]);

  useEffect(() => {
    dispatch(getListDaNhan());
    getToken();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Đang nhận" />
      </Appbar.Header>
      <ScrollView 
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          >
   <FlatList
        data={listDaNhan}
        renderItem={({index, item}) => (
          <View
            style={[
              styles.item,
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
                <Icon
                  name="ios-location-outline"
                  size={20}
                  style={styles.icon}
                />
                <Text style={styles.header}>{item.DIA_CHI_GIAO_HANG}</Text>
              </View>
            ) : null}

            {item.LOAI === 'GIAO_HANG' ? (
              <View style={styles.note}>
                <Icon name="md-logo-euro" size={20} style={styles.icon} />
                <Text style={styles.header}>{item.HINH_THUC_THANH_TOAN}</Text>
                {item.HINH_THUC_THANH_TOAN === 'Tiền mặt' && (
                  <ReactNativeNumberFormat
                    string="Tổng tiền:"
                    value={item.TONG_TIEN}
                  />
                )}
              </View>
            ) : (
              <View style={styles.note}>
                <Icon name="ios-business-sharp" size={20} style={styles.icon} />
                <Text style={styles.header}>Đại diện: {item.NOI_LAY_HANG}</Text>
                <ReactNativeNumberFormat
                  string="Tổng tiền:"
                  value={item.TONG_TIEN}
                />
              </View>
            )}
            <View>
              <Text style={styles.header}>{item.GHI_CHU}</Text>
            </View>
            <View style={styles.buttonNote}>
              <Icon.Button
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
          onPress={() =>
            navigation.navigate('Đề nghị thanh toán', {
              listSelectDaNhan: listSelectDaNhan,
            })
          }>
          Tạo ĐNTT
        </Icon.Button>
        <Text>&nbsp;&nbsp;&nbsp;</Text>
        <Icon.Button
          name="ios-checkbox"
          onPress={() =>
            navigation.navigate('Xác nhận giao hàng', {
              listSelectDaNhan: listSelectDaNhan,
            })
          }>
          Xác nhận
        </Icon.Button>

        {/* <Button title="Quay lại" onPress={() => navigation.goBack()} /> */}
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
            placeholderTextColor="black"
          />
          <View style={styles.flexCheck}>
            <Icon.Button onPress={() => pressNoteNoiDung()} name="ios-save">
              Lưu
            </Icon.Button>
            <Icon.Button name="ios-exit" onPress={toggleModal}>
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
  },

  flexCheck: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
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
    color: '#000',
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
    color: '#aaa',
    fontSize: 16,
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
    flexDirection: 'row',
    alignSelf: 'flex-start',
    fontSize: 18,
  },
  button: {
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center',
  },
  input: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});
export default DanhSachDaNhanScreen;
