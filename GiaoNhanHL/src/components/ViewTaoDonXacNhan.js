import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Card} from 'react-native-elements';
import {Appbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from '../components/datePicker';
import {Button} from 'native-base';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import { PostDonXacNhanNV } from '../redux/xacNhan/action';

const ViewTaoDonXacNhan = ({navigation}) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState(); 
  const getToken = async () => {
    const username = await AsyncStorage.getItem('userToken');
    setUsername(username);
  };
  useEffect(() => {
    getToken();
  }, []);

  //useState
  const [dateTime, setDateTime] = useState(
    moment(new Date()).format('DD/MM/YYYY'),
  );
  const [noiDungCanXacNhan, setNoiDungCanXacNhan] = useState('');
  const [ngayCanXacNhan, setNgayCanXacNhan] = useState(new Date());
  const [trucThuoc, setTrucThuoc] = useState('HOPLONG');

  const buttonCreate = () => {
    dispatch(PostDonXacNhanNV(username,noiDungCanXacNhan,ngayCanXacNhan,trucThuoc));
    navigation.navigate('Xin xác nhận');
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Appbar.Header>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Home')}>
            <Icon
              name="ios-chevron-back-outline"
              size={26}
              style={styles.iconPage}
            />
          </TouchableOpacity>
          <Appbar.Content
            title="Tạo đơn xác nhận"
            color={'#fff'}></Appbar.Content>
        </Appbar.Header>
      </View>

      <View>
        <Card>
          <View style={styles.flex}>
            <Icon name="ios-calendar-outline" size={26} style={styles.icon} />
            <Text style={styles.textHeader}>{dateTime}</Text>
          </View>
          <View style={styles.flex}>
          <Icon name="today-outline" size={26} style={styles.icon} />
          <DatePicker 
            onPress={(text) => setNgayCanXacNhan(text)}
            maxDate={new Date(2050,1,1)}
            style={styles.datepicker}
          />
          </View>
          <View style={styles.flex}>
            <Icon name="ios-copy-outline" size={26} style={styles.icon} />
            <TextInput 
              style={styles.input}
              onChangeText={setNoiDungCanXacNhan}
              placeholder="Nhập nội dung cần xác nhận"
              multiline={true}
              underlineColorAndroid="transparent"
            />
          </View>
          <Button onPress={() => buttonCreate()}>
          <Icon name="ios-add" size={26} />
            <Text>Tạo</Text>
          </Button>
        </Card>
      </View>
    </View>
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
  },
  flexTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    marginRight: 10,
    alignSelf: 'center',
  },
  iconPage: {
    color: '#fff',
  },
  colorHeader: {
    backgroundColor: '#00B4FF',
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
});
