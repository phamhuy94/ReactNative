import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform
} from 'react-native';
import {Card} from 'react-native-elements';
import {Appbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from '../components/datePicker';
import {Button} from 'native-base';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import {PostDonXacNhanNV} from '../redux/xacNhan/action';


const ViewTaoDonXacNhan = ({navigation}) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState();

  //useState
  const [dateTime, setDateTime] = useState(
    moment(new Date()).format('DD/MM/YYYY'),
  );
  const [noiDungCanXacNhan, setNoiDungCanXacNhan] = useState('');
  const [ngayCanXacNhan, setNgayCanXacNhan] = useState(new Date());
  const [trucThuoc, setTrucThuoc] = useState();
  const [disable, setDisable] = useState(true);

  const getToken = async () => {
    const username = await AsyncStorage.getItem('userToken');
    const trucThuoc = await AsyncStorage.getItem('maCongTy');
    setUsername(username);
    setTrucThuoc(trucThuoc);
  };
  useEffect(() => {
    getToken();
  }, []);

  const buttonCreate = () => {
    dispatch(
      PostDonXacNhanNV(username, noiDungCanXacNhan, ngayCanXacNhan, trucThuoc),
    );
    navigation.navigate('Xin xác nhận');
  };

  
  useEffect(() => {
    if (noiDungCanXacNhan != '' && ngayCanXacNhan != '') {
      setDisable(false);
    }
    if (noiDungCanXacNhan == '' || ngayCanXacNhan == '') {
      setDisable(true);
    }
  }, [noiDungCanXacNhan, ngayCanXacNhan]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Appbar.Header style={styles.colorHeader}>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Content
              title="Tạo đơn xác nhận"
              color={'#2179A9'}
              style={{marginLeft: -15}}></Appbar.Content>
          </Appbar.Header>
        </View>

        <View>
          <View style={styles.card}>
            <View style={styles.flex}>
              <View style={styles.icon}>
                <Icon name="ios-calendar" size={22} style={styles.iconImg} />
              </View>
              <Text style={styles.textHeader}>{dateTime}</Text>
            </View>
            <View style={styles.flex}>
              <View style={styles.icon}>
               <Icon name="ios-pie-chart" size={22} style={styles.iconImg} />
              </View>
              <DatePicker
                onPress={(text) => setNgayCanXacNhan(text)}
                maxDate={new Date(2050, 1, 1)}
                style={styles.datepicker}
              />
            </View>
            <View style={styles.flex}>
              <View style={styles.icon}>
                <Icon name="ios-reader-sharp" size={22} style={styles.iconImg} />
              </View>
              <TextInput
                style={styles.input}
                onChangeText={setNoiDungCanXacNhan}
                placeholder="Nhập nội dung cần xác nhận"
                multiline={true}
                underlineColorAndroid="transparent"
              />
            </View>
          </View>
          <Button
            disabled={disable}
            onPress={() => buttonCreate()}
            style={disable ? (styles.buttonAddDisable) : (styles.buttonAddEnable)}>
            <Icon name="ios-add" size={26} color={'#fff'} />
            <Text style={{color: '#fff'}}>Tạo</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default ViewTaoDonXacNhan;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textHeader: {
    color: '#000',
    fontSize: 20,
    flexShrink: 1,
  },
  flex: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  flexTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    marginRight: 10,
    fontSize: 20,
    backgroundColor: '#ddd',
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
  },
  card: {
    marginTop: 20,
    margin: 15,
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 5.25,
    shadowColor: Platform.OS === 'ios' ? ('#ccc') : ('transparent'),
    shadowRadius: 3.84,
    elevation: 6,
  },
  iconPage: {
    marginRight: 5,
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
  dropdown: {
    width: '100%',
    height: 45,
    borderBottomColor: '#cccccc59',
    borderBottomWidth: 1,
    flexShrink: 1,
    fontSize: 20,
  },
  datepicker: {
    color: '#000',
    fontSize: 20,
  },
  button: {
    flexDirection: 'row',
    color: '#fff',
  },
  buttonAddEnable: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    textAlign: 'center',
    alignSelf: 'center',
    borderRadius: 50,
    marginTop: 20,
    width: 350,
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#2179A9'
  },
  buttonAddDisable: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    textAlign: 'center',
    alignSelf: 'center',
    borderRadius: 50,
    marginTop: 20,
    width: 350,
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
