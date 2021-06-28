import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  GetDonXinNghiNV,
  GetTongSoNgayNghiNV,
  DemDonXinNghiPhepNV,
  DeleteDonNghiPhep,
} from '../redux/nghiPhep/action';

import {
  Text,
  View,
  StyleSheet,
  RefreshControl,
  FlatList,
  Dimensions,
  ScrollView,
  Button,
  TouchableOpacity,
  Alert,
  Platform
} from 'react-native';
import {Appbar} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import NghiPhepTask from './nghiPhep/nghiPhepTask';
import NghiPhepTable from './nghiPhep/nghiPhepTable';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const ViewNghiPhep = ({navigation}) => {
  const dispatch = useDispatch();

  const getListDonXinNghiNV = useSelector(
    (store) => store.nghiPhep.getListDonXinNghiNV,
  );

  const getTongSoNgayNghiNV = useSelector(
    (store) => store.nghiPhep.getTongSoNgayNghiNV,
  );

  const demDonXinNghiPhepNV = useSelector(
    (store) => store.nghiPhep.demDonXinNghiPhepNV,
  );

  //lay username
  const [username, setUsername] = useState();

  //useState
  const [macongty, setMacongty] = useState();
  const [isadmin, setIsadmin] = useState(false);
  const [tukhoa, setTukhoa] = useState('');
  const [tukhoa1, setTukhoa1] = useState('');
  const [tukhoa2, setTukhoa2] = useState('');
  const [sotrang, setSotrang] = useState(1);
  const [sobanghi, setSobanghi] = useState(15);
  const [maphongban, setMaphongban] = useState('');
  const [thang, setThang] = useState('');
  const [nam, setNam] = useState(new Date().getFullYear());
  const [refreshing, setRefreshing] = useState(false);
  const [showList, setShowList] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
    dispatch(
      GetDonXinNghiNV(
        macongty,
        username,
        isadmin,
        tukhoa,
        tukhoa1,
        tukhoa2,
        sotrang,
        sobanghi,
      ),
    );
  }, []);

  const getToken = async () => {
    const username = await AsyncStorage.getItem('userToken');
    const macongty = await AsyncStorage.getItem('maCongTy');
    setUsername(username);
    setMacongty(macongty);
  };

  useEffect(() => {
    getToken();
  }, []);

  const data = {
    username: username,
    macongty: macongty,
  };

  useEffect(() => {
    dispatch(
      GetDonXinNghiNV(
        macongty,
        username,
        isadmin,
        tukhoa,
        tukhoa1,
        tukhoa2,
        sotrang,
        sobanghi,
      ),
    );
  }, [username, macongty, sotrang, refreshing]);

  useEffect(() => {
    dispatch(
      GetTongSoNgayNghiNV(
        macongty,
        isadmin,
        username,
        maphongban,
        thang,
        nam,
        tukhoa,
      ),
    );
  }, [username, macongty]);

  useEffect(() => {
    dispatch(
      DemDonXinNghiPhepNV(
        macongty,
        username,
        isadmin,
        tukhoa,
        tukhoa1,
        tukhoa2
      ),
    );
  }, [username, macongty, sotrang, refreshing]);

  const deleteDNP = async (id) => {
    await dispatch(DeleteDonNghiPhep(id));
    await dispatch(
      GetDonXinNghiNV(
        macongty,
        username,
        isadmin,
        tukhoa,
        tukhoa1,
        tukhoa2,
        sotrang,
        sobanghi,
      ),
    );
  };

  const checkIcon = (
    TRUONG_PHONG_DA_DUYET,
    TRUONG_PHONG_HUY_DUYET,
    id,
    NGAY_LAM_DON,
  ) => {
    if (TRUONG_PHONG_DA_DUYET === true && TRUONG_PHONG_HUY_DUYET === false) {
      return (
        <View style={{flexDirection: 'row',width:'100%',justifyContent:'center', alignItems: 'center'}}>
          <Icon
            name="ios-checkmark-circle"
            size={24}
            style={styles.iconStatusCheck}
          />
          <Text style={styles.textHeader}>
            {moment(NGAY_LAM_DON).format('DD/MM/YYYY')}
          </Text>
        </View>
      );
    }
    if (TRUONG_PHONG_DA_DUYET === false && TRUONG_PHONG_HUY_DUYET === false) {
      return (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
                  <View style={{left: 105}}>
            <Icon
              name="ios-refresh-circle"
              size={24}
              style={styles.iconStatusWait}
            />
          </View>
          <Text style={[styles.textHeader, {left: 105,}]}>
            {moment(NGAY_LAM_DON).format('DD/MM/YYYY')}
          </Text>
          <View style={{marginLeft:200}}>
            <TouchableOpacity onPress={() => deleteDNP(id)}>
              <Icon name="trash" size={24} style={styles.iconStatusWait} />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    if (TRUONG_PHONG_HUY_DUYET !== false) {
      return (
        <View style={{flexDirection:'row',width:'100%',justifyContent:'center',alignItems:'center'}}>
          <Text>
          <Icon
            name="ios-close-circle-sharp"
            size={24}
            style={styles.iconStatusCancel}
          />
          </Text>
      
          <Text style={styles.textHeader}>
            {moment(NGAY_LAM_DON).format('DD/MM/YYYY')}
          </Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Appbar.Header style={styles.colorHeader}>
          <Appbar.Action
            icon="newspaper-variant-outline"
            color={'#2179A9'}
            size={30}
          />
          <Appbar.Content
            title="Đơn xin nghỉ phép"
            color={'#2179A9'}
            style={{marginLeft: -15}}
          />
          <TouchableOpacity
            title="Click"
            onPress={() => navigation.navigate('Tạo đơn nghỉ phép', {data})}>
            <Icon name="ios-add-circle" size={30} style={styles.iconAdd} />
          </TouchableOpacity>
        </Appbar.Header>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.flexTitle}>
         <View style={{flexDirection: 'row'}}>
          <Text style={[styles.textHeader, {color: '#2179A9'}]}>
              Tổng số ngày nghỉ trong năm:
            </Text>
            <Text>&nbsp;&nbsp;</Text>
            <Text style={[styles.textHeader, {color: '#2179A9'}]}>
              {getTongSoNgayNghiNV.length == 0
                ? '0'
                : getTongSoNgayNghiNV[0].TONG_SO_NGAY_NGHI}
            </Text>
         </View>
          <View>
          <TouchableOpacity
            style={styles.btnEye}
            onPress={() => setShowList(!showList)}>
              {showList ? (  <Icon
              name={'ios-grid-outline'}
          
              size={22}
              color={'#2179A9'}
            />) : (  <Icon
              
              name={'ios-list-outline'}
              size={22}
              color={'#2179A9'}
            />)}
            </TouchableOpacity>
          </View>
        </View>
        {showList ? (
          <NghiPhepTable data={getListDonXinNghiNV} checkIcon={checkIcon}/>
        ) : (
          <NghiPhepTask data={getListDonXinNghiNV} checkIcon={checkIcon}/>
        )}

        {/* Phan trang */}
        <View style={styles.flexCenter}>
          <TouchableOpacity
            style={[
              styles.button,
              {backgroundColor: sotrang <= 1 ? '#aaa' : '#2179A9'},
            ]}
            disabled={sotrang <= 1}
            onPress={() => {
              setSotrang(sotrang - 1);
            }}>
            <Icon name="ios-chevron-back" size={24} style={styles.iconPage} />
          </TouchableOpacity>
          <Text>&nbsp;&nbsp;</Text>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor:
                  sotrang > parseFloat(demDonXinNghiPhepNV) / 15
                    ? '#aaa'
                    : '#2179A9',
              },
            ]}
            disabled={sotrang > parseFloat(demDonXinNghiPhepNV) / 15}
            onPress={() => {
              setSotrang(sotrang + 1);
            }}>
            <Icon
              name="ios-chevron-forward"
              size={24}
              style={styles.iconPage}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height

export default ViewNghiPhep;

const styles = StyleSheet.create({
  
  header: {},
  container: {
    flex: 1,
    backgroundColor: '#f0f2f2',
  },
  flexCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'space-between',
    height:50,
    alignItems:'center'
  },
  textHeader: {
    color: '#444',
    fontSize: 16,
    flexShrink: 1,
  },
  flexTitle: {
    flexDirection: 'row',
    margin: 20,
    marginTop: 10,
    color: '#2179A9',
    justifyContent: 'space-between'
  },
  flex: {
    flexDirection: 'row',
  },
  colorHeader: {
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: Platform.OS === 'ios' ? 0 : 0.2,
    backgroundColor: 'transparent',
    elevation: 1,
  },
  icon: {
    marginRight: 5,
    color: '#2179A9',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconAdd: {
    color: '#2179A9',
  },
  iconStatusCheck: {
    color: 'green',
  },
  iconStatusWait: {
    color: '#2179A9',
  },
  iconStatusCancel: {
    color: 'red',
  },

  iconPage: {
    color: '#fff',
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginTop: 0,
    margin: 15,
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: Platform.OS === 'ios' ? ('#ccc') : ('transparent'),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 5.25,
    shadowRadius: 3.84,
    elevation: 6,
  },
});
