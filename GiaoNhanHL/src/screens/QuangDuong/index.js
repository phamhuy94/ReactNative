import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {
  getQuangDuong,
  postKmDau,
  postKmCuoi,
} from '../../redux/quangDuong/action';
import {Appbar, IconButton} from 'react-native-paper';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Platform,
  TextInput,
  Button,
} from 'react-native';
import {Button as ButtonAction} from 'native-base';
import DatePicker from '../../components/datePicker';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import moment from 'moment';
import {tr} from 'date-fns/locale';

const dateTime = moment(new Date()).format('DD/MM/YYYY');
const QuangDuong = () => {
  const dispatch = useDispatch();

  const listQuangDuong = useSelector(
    (store) => store.quangDuong.listQuangDuong,
  );

  const [username, setUsername] = useState();
  const [macongty, setMaCongTy] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [maphongban, setMaphongban] = useState('');
  const [date, setDate] = useState(new Date());
  const [tukhoa1, setTuKhoa1] = useState('');
  const [tukhoa2, setTuKhoa2] = useState('');
  const [soDau, setSoDau] = useState('');
  const [soCuoi, setSoCuoi] = useState('');
  const [id, setID] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible1, setModalVisible1] = useState(false);
  const [disable, setDisable] = useState(true);
  const [disable1, setDisable1] = useState(true);

  const getToken = async () => {
    const username = await AsyncStorage.getItem('userToken');
    const macongty = await AsyncStorage.getItem('maCongTy');
    setUsername(username);
    setMaCongTy(macongty);
  };
  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    dispatch(
      getQuangDuong(
        macongty,
        username,
        maphongban,
        isAdmin,
        date,
        tukhoa1,
        tukhoa2,
      ),
    );
  }, [username, macongty, date]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModal1 = () => {
    setModalVisible1(!isModalVisible1);
  };

  const saveSoDau = async () => {
    await dispatch(postKmDau(username, soDau));
    await dispatch(
      getQuangDuong(
        macongty,
        username,
        maphongban,
        isAdmin,
        date,
        tukhoa1,
        tukhoa2,
      ),
    );
    await toggleModal();
  };

  const saveSoCuoi = async (id, username, soCuoi) => {
    await dispatch(postKmCuoi(id, username, soCuoi));
    await dispatch(
      getQuangDuong(
        macongty,
        username,
        maphongban,
        isAdmin,
        date,
        tukhoa1,
        tukhoa2,
      ),
    );
    await toggleModal1();
  };

  useEffect(() => {
    if (soDau != '') {
      setDisable(false);
    }
    if (soDau == '') {
      setDisable(true);
    }
    if (soCuoi != '') {
      setDisable1(false);
    }
    if (soCuoi == '') {
      setDisable1(true);
    }
  }, [soDau, soCuoi]);
  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.colorHeader}>
      <Appbar.Action icon="map-marker-radius" color={'#2179A9'} size={30} />
        <Appbar.Content title="Quản lý quãng đường" color={'#2179A9'}  style={{marginLeft: -15}}/>
      </Appbar.Header>
      <View style={styles.flex}>
        <DatePicker
          onPress={(text) => setDate(text)}
          maxDate={new Date()}
          style={styles.datepicker}
        />
        {dateTime == moment(date).format('DD/MM/YYYY') ? (
          <View style={styles.buttonNote}>
            <ButtonAction
              disabled={listQuangDuong.length > 0 ? true : false}
              style={
                listQuangDuong.length == 0
                  ? styles.buttonAddEnable
                  : styles.buttonAddDisable
              }
              onPress={() => toggleModal()}>
              <Icon name="ios-add-circle-outline" size={24} color={'#fff'} />
              <Text style={{color: '#fff'}}>Thêm</Text>
            </ButtonAction>
          </View>
        ) : (
          <View></View>
        )}
      </View>

      <FlatList
        data={listQuangDuong}
        renderItem={({item, index}) => (
          <View style={styles.homeLayout}>
            <Text style={styles.textHeader}>{item.HO_VA_TEN}</Text>
            <View style={styles.margin}>
            <View style={styles.timesheet}>
              <Text style={styles.title}>Số đầu: </Text>
              <Text style={styles.value}>{item.SO_DAU}</Text>
            </View>
            <View style={styles.timesheet}>
              <Text style={styles.title}>Số cuối: </Text>
              <Text style={styles.value}>{item.SO_CUOI}</Text>
            </View>
            {item.SO_CUOI ? (
              <View style={styles.timesheet}>
                <Text style={styles.title}>Số Km: </Text>
                <Text style={styles.value}>{item.SO_CUOI - item.SO_DAU} km</Text>
              </View>
            ) : (
              <View></View>
            )}
            </View>
        

            {/* Button them so cuoi */}
            <View style={styles.buttonNote}>
              <ButtonAction
                onPress={() => {
                  toggleModal1();
                  setID(item.ID);
                }}
                style={styles.buttonAddEnable}>
                <Icon name="ios-add-circle-outline" size={24} color={'#fff'} />
                <Text style={{color: '#fff'}}>Thêm</Text>
              </ButtonAction>
            </View>
          </View>
        )}
      />

      {/* Modal them so dau */}
      <Modal isVisible={isModalVisible}>
        <View style={{backgroundColor: 'white', padding: 15}}>
          <TextInput
            keyboardType={'numeric'}
            style={styles.input}
            onChangeText={setSoDau}
            value={soDau}
            placeholder="Số công tơ đầu"
            placeholderTextColor="#ccc"
          />
          <View style={styles.flexCheck}>
            <ButtonAction
              onPress={() => saveSoDau()}
              disabled={disable}
              // style={styles.buttonAdd}
              style={disable ? styles.buttonAdd : styles.buttonClose}
              >
              <Icon name="ios-add-circle-outline" size={24} color={'#fff'} />
              <Text style={{color: '#fff'}}>Lưu</Text>
            </ButtonAction>

            <ButtonAction onPress={toggleModal} style={styles.buttonClose}>
              <Icon name="ios-exit" size={24} color={'#fff'} />
              <Text style={{color: '#fff'}}>Đóng</Text>
            </ButtonAction>
          </View>
        </View>
      </Modal>

      {/* Modal them so cuoi */}
      <Modal isVisible={isModalVisible1}>
        <View style={{backgroundColor: 'white', padding: 15}}>
          <TextInput
            keyboardType={'numeric'}
            style={styles.input}
            onChangeText={setSoCuoi}
            value={soCuoi}
            placeholder="Số công tơ cuối"
            placeholderTextColor="#ccc"
          />
          <View style={styles.flexCheck}>
            <ButtonAction
              onPress={() => saveSoCuoi(id, username, soCuoi)}
              disabled={disable1}
              style={disable1 ? styles.buttonAdd : styles.buttonClose}>
              <Icon name="ios-add-circle-outline" size={24} color={'#fff'} />
              <Text style={{color: '#fff'}}>Tạo</Text>
            </ButtonAction>
            <ButtonAction onPress={toggleModal1} style={styles.buttonClose}>
              <Icon name="ios-exit" size={24} color={'#fff'} />
              <Text style={{color: '#fff'}}>Đóng</Text>
            </ButtonAction>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default QuangDuong;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  colorHeader: {
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: Platform.OS === 'ios' ? 0 : 0.2,
    backgroundColor: 'transparent',
    elevation: 1,
  },
  datepicker: {
    color: '#444',
  },
  margin: {
    marginHorizontal:20,
  },
  buttonAddEnable: {
    justifyContent: 'center',
    backgroundColor: '#2179A9',
    paddingHorizontal: 10,
    width: 120,
    borderRadius: 50,
    height: 35,
  },
  buttonAddDisable: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc',
    paddingHorizontal: 10,
    width: 120,
    borderRadius: 50,
    height: 35,
  },
  input: {
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  buttonAdd: {
    justifyContent: 'center',
   
    height: 30,
    width: 100,
    paddingHorizontal: 10,
    borderRadius: 50,
  },
  buttonClose: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: '#2179A9',
    width: 100,
    height: 30,
  },
  homeLayout: {
    margin: 15,
    flex: 1,
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
  textHeader: {
    color: '#2179A9',
    width: '100%',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 18,
  },
  timesheet: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  buttonNote: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  flexCheck: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
