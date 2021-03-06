import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform,
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
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width, height} = Dimensions.get('window');

const ViewTaoDonNghiPhep = ({navigation, route}) => {
  const {data} = route.params;
  const dispatch = useDispatch();

  //useState
  const [lyDoNghi, setLydoNghi] = useState('');
  const [loaiNghiPhep, setLoaiNghiPhep] = useState('Nghỉ thường');
  const [dateTime, setDateTime] = useState(
    moment(new Date()).format('DD/MM/YYYY'),
  );
  const [tongSoNgay, setTongSoNgay] = useState('');
  const [dateTimeRow, setDateTimeRow] = useState(new Date());
  const [day, setDay] = useState('Cả ngày');
  const [disable, setDisable] = useState(true);

  const buttonCreate = () => {
    dispatch(
      PostDonXinNghiNV(
        data.username,
        lyDoNghi,
        loaiNghiPhep,
        dateTime,
        tongSoNgay,
        data.macongty,
        dateTimeRow,
        day,
      ),
    );
    navigation.navigate('Xin nghỉ phép');
  };

  useEffect(() => {
    if (lyDoNghi != '' && tongSoNgay != '') {
      setDisable(false);
    }
    if (lyDoNghi == '' || tongSoNgay == '') {
      setDisable(true);
    }
  }, [lyDoNghi, tongSoNgay]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Appbar.Header style={styles.colorHeader}>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Content
              title="Tạo đơn nghỉ phép"
              color={'#2179A9'}
              style={{marginLeft: -15}}
            />
          </Appbar.Header>
        </View>
        <View>
          <View style={styles.card}>
            <View style={styles.flex}>
              <View style={styles.icon}>
                <Icon name="ios-calendar" size={22} style={styles.iconImg} />
              </View>
              <Text
                style={[
                  styles.textHeader,
                  {
                    color: '#000',
                    marginLeft: 8,
                    alignItems: 'center',
                    alignSelf: 'center',
                    alignContent: 'center',
                  },
                ]}>
                {dateTime}
              </Text>
            </View>
            <View style={styles.flex}>
              <View style={styles.icon}>
               <Icon name="ios-chatbox-ellipses" size={22} style={styles.iconImg} />
              </View>
              <View style={styles.dropdown}>
                <PickNghiPhep
                  loaiNghiPhep={loaiNghiPhep}
                  setLoaiNghiPhep={setLoaiNghiPhep}
                />
              </View>
            </View>
            <View style={styles.flexTime}>
              <View style={[styles.flex, {marginRight: 15}]}>
                <View style={styles.icon}>
                  <Icon name="today" size={22} style={styles.iconImg} />
                </View>
                <DatePicker
                  onPress={(text) => setDateTimeRow(text)}
                  maxDate={new Date(2050, 1, 1)}
                  style={[styles.datepicker, {width: 150}]}
                />
              </View>

              <View style={styles.flex}>
              <View style={styles.icon}>
                  <Icon name="today" size={22} style={styles.iconImg} />
                </View>
                <PickThoiDiem day={day} setDay={setDay} />
              </View>
            </View>

            <View style={styles.flex}>
            <View style={styles.icon}>
                  <Icon name="ios-copy" size={22} style={styles.iconImg} />
                </View>
              <TextInput
                style={styles.input}
                onChangeText={setLydoNghi}
                placeholder="Nhập lý do nghỉ.."
                multiline={true}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={styles.flex}>
            <View style={styles.icon}>
                  <Icon name="ios-navigate-circle" size={24} style={styles.iconImg} />
                </View>
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
          </View>
          <Button
            disabled={disable}
            onPress={() => buttonCreate()}
            style={disable ? styles.buttonAddDisable : styles.buttonAddEnable}>
            <Icon name="ios-add" size={26} color={'#fff'} />
            <Text style={{color: '#fff'}}>Tạo</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};
export default ViewTaoDonNghiPhep;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  textHeader: {
    color: '#444',
    fontSize: 18,
    flexShrink: 1,
  },
  flex: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  flexTime: {
    flexDirection: 'row',
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
    color: '#2179A9',
    fontSize: 18,
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
    backgroundColor: '#2179A9',
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
  iconPage: {
    marginRight: 5,
  },
});
