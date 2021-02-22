import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Button, Picker, Form} from 'native-base';
import {Appbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import writtenNumber from 'written-number';
import {getApiTaoTamUng, getApiTamUng, getApiDemDonTamUng} from '../../redux/tamUng/action';

const CreateTamUng = ({navigation, route}) => {
  const dispatch = useDispatch();
  const body = route.params.body;
  const [dateTime, setDateTime] = useState(
    moment(new Date()).format('DD/MM/YYYY'),
  );
  const [soTien, setSoTien] = useState('');
  const [soTienChu, setSoTienChu] = useState('');
  const [lyDoDN, setLyDoDN] = useState('');
  const [disable, setDisable] = useState(true);

    useEffect(() => {
      if(soTien != '' && lyDoDN != '') {
        setDisable(false);
      };
      if(soTien == '' || lyDoDN == '') {
        setDisable(true);
      };
      setSoTienChu(writtenNumber(soTien, {lang: 'vi'}));
    }, [soTien, lyDoDN]);

    const buttonCreate = () => {
       dispatch(getApiTaoTamUng(body.username, lyDoDN, soTien, soTienChu, body.macongty, body));
       dispatch(getApiTamUng(body));
       dispatch(getApiDemDonTamUng(body));
      navigation.navigate('Tạm ứng');
    };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Appbar.Header style={styles.colorHeader}>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Content
              title="Tạo đơn tạm ứng"
              color={'#2179A9'}
              style={{marginLeft: -15}}></Appbar.Content>
          </Appbar.Header>
        </View>
        <View style={styles.card}>
          <View style={styles.flex}>
            <View style={styles.icon}>
              <Icon name="ios-calendar" size={22} style={styles.iconImg} />
            </View>
            <Text>{dateTime}</Text>
            {/* <TextInput
              style={styles.input}

              placeholder=
              multiline={true}
              underlineColorAndroid="transparent"
            /> */}
          </View>
          <View style={styles.flex}>
            <View style={styles.icon}>
              <Icon name="ios-reader-sharp" size={22} style={styles.iconImg} />
            </View>
            <TextInput
              style={[styles.input]}
              numberOfLines={3}
              placeholder="Nội dung đề nghị"
              onChangeText={(text) => setLyDoDN(text)}
              multiline={true}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.flex}>
            <View style={styles.icon}>
              <Icon name="ios-logo-html5" size={22} style={styles.iconImg} />
            </View>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setSoTien(text)}
              placeholder="Số tiền"
              keyboardType="numeric"
              multiline={true}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.flex}>
            <View style={styles.icon}>
              <Icon name="ios-cash" size={22} style={styles.iconImg} />
            </View>
            <Text>{writtenNumber(soTien, {lang: 'vi'})} đồng</Text>
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
    </ScrollView>
  );
};

export default CreateTamUng;
const styles = StyleSheet.create({
  colorHeader: {
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: Platform.OS === 'ios' ? 0 : 0.2,
    backgroundColor: 'transparent',
    elevation: 1,
  },
  flex: {
    flexDirection: 'row',
    marginBottom: 30,
    alignContent:'center',
    alignItems:'center'
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
  input: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    flexShrink: 1,
    width: '100%',
  },
  card: {
    marginTop: 20,
    margin: 15,
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: Platform.OS === 'ios' ? '#ccc' : 'transparent',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 5.25,
    shadowRadius: 3.84,
    elevation: 6,
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
