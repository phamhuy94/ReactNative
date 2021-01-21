import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {PostDonXinNghiNV, GetDonXinNghiNV} from '../redux/nghiPhep/action';
import {Card} from 'react-native-elements';
import DatePicker from '../components/datePicker';
import PickNghiPhep from '../components/pickNghiPhep';
import PickThoiDiem from '../components/pickThoiDiem';
import {Appbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from 'native-base';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';

const ViewTaoDonNghiPhep = ({navigation}) => {
  const dispatch = useDispatch();
    //lay username
    const [username, setUsername] = useState();
    const getToken = async () => {
      const username = await AsyncStorage.getItem('userToken');
      setUsername(username);
    };
    useEffect(() => {
      getToken();
    }, []);

    //useState
    const [lyDoNghi, setLydoNghi] = useState('');
    const [loaiNghiPhep, setLoaiNghiPhep] = useState('Nghỉ thường');
    const [dateTime, setDateTime] = useState(moment(new Date()).format('DD/MM/YYYY'));
    const [tongSoNgay, setTongSoNgay] = useState('');
    const [trucThuoc, setTrucThuoc] = useState('HOPLONG');
    const [dateTimeRow, setDateTimeRow] = useState(new Date());
    const [day, setDay] = useState('Cả ngày');

    const buttonCreate = () => {
      dispatch(PostDonXinNghiNV(username, lyDoNghi, loaiNghiPhep, dateTime, tongSoNgay, trucThuoc, dateTimeRow, day));
      navigation.navigate('Xin nghỉ phép');
      
    }
    

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Appbar.Header style={styles.colorHeader}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Home')}>
            <Icon
              name="ios-chevron-back-outline"
              size={26}
              style={styles.iconPage}
            />
          </TouchableOpacity>
          <Appbar.Content title="Tạo đơn nghỉ phép" color={'#fff'} />
        </Appbar.Header>
      </View>
      <View>
        <Card>
          <View style={styles.flex}>
            <Icon name="ios-calendar-outline" size={26} style={styles.icon} />
            <Text style={styles.textHeader}>{dateTime}</Text>
          </View>
          <View style={styles.flex}>
            <Icon name="md-ribbon-outline" size={26} style={styles.icon} />
            <View style={styles.dropdown}>
              <PickNghiPhep 
                loaiNghiPhep={loaiNghiPhep}
                setLoaiNghiPhep={setLoaiNghiPhep}
              />
            </View>
          </View>
          <View style={styles.flexTime}>
            <View style={styles.flex}>
              <Icon name="today-outline" size={26} style={styles.icon} />
              <DatePicker
                onPress={(text) => setDateTimeRow(text)}
                maxDate={new Date(2050, 1, 1)}
                style={styles.datepicker}
              />
            </View>

            <View>
              <PickThoiDiem 
                day = {day}
                setDay = {setDay}
              />
            </View>
          </View>

          <View style={styles.flex}>
            <Icon name="ios-copy-outline" size={26} style={styles.icon} />
            <TextInput
              style={styles.input}
              onChangeText={setLydoNghi}
              placeholder="Nhập lý do nghỉ.."
              multiline={true}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.flex}>
            <Icon name="ios-flame-outline" size={26} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Nhập số ngày nghỉ"
              numeric
              keyboardType={'numeric'}
              maxLength={99}
              onChangeText={setTongSoNgay}
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
export default ViewTaoDonNghiPhep;
  
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
