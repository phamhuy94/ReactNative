import React, {useEffect,useState,useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  GetDeNghiTTNVDaThanhToan,
  DemListDeNghiTTNVDaThanhToan,
} from '../../redux/DNTT/action';
import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  FlatList,
  Button,
  ScrollView,
} from 'react-native';
import {Card} from 'react-native-elements';
import {Appbar} from 'react-native-paper';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';

const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const ViewDNTTDaThanhToan = ({
  isadmin,
  username,
  maphongban,
  chucvu,
  macongty,
  tukhoa,
  tukhoa2,
  tukhoa3,
  tukhoa4,
  tukhoa5,
  sotrang,
  sobanghi,
  navigation
}) => {
  const dispatch = useDispatch();
  const getDeNghiTTNVDaThanhToan = useSelector(
    (store) => store.DNTT.getDeNghiTTNVDaThanhToan,
  );
  const demListDeNghiTTNVDaThanhToan = useSelector(
    (store) => store.DNTT.demListDeNghiTTNVDaThanhToan,
  );
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
    dispatch(
      GetDeNghiTTNVDaThanhToan(
        isadmin,
        username,
        maphongban,
        chucvu,
        macongty,
        tukhoa,
        tukhoa2,
        tukhoa3,
        tukhoa4,
        tukhoa5,
        sotrang,
        sobanghi,
      ),
    );
  }, []);

  useEffect(() => {
    dispatch(
      GetDeNghiTTNVDaThanhToan(
        isadmin,
        username,
        maphongban,
        chucvu,
        macongty,
        tukhoa,
        tukhoa2,
        tukhoa3,
        tukhoa4,
        tukhoa5,
        sotrang,
        sobanghi,
      ),
    );
  }, [username, sotrang]);

  useEffect(() => {
    dispatch(
      DemListDeNghiTTNVDaThanhToan(
        isadmin,
        username,
        maphongban,
        chucvu,
        macongty,
        tukhoa,
        tukhoa2,
        tukhoa3,
        tukhoa4,
        tukhoa5,
        sotrang,
        sobanghi,
      ),
    );
  }, []);

  console.log(demListDeNghiTTNVDaThanhToan);

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.colorHeader}>
      <Appbar.Action
        icon="checkbox-marked-outline"
        color={'#2179A9'}
        size={30}
       
      />
        <Appbar.Content title="DNTT Đã thanh toán" color={'#2179A9'} style={{marginLeft: -15}}/>
        <TouchableOpacity
          title="Click"
          onPress={() => navigation.navigate('Tạo đề nghị thanh toán')}
        >
<Icon name="ios-add-circle-outline" size={30} style={styles.iconAdd} /> 
        </TouchableOpacity>
      </Appbar.Header>
      <ScrollView 
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          >
      <FlatList
        data={getDeNghiTTNVDaThanhToan}
        renderItem={({item, index}) => (
       
            <View>
              <Card>
                <Card.Title>
                  <Icon
                    name="ios-checkmark-circle"
                    size={26}
                    style={styles.iconStatusCheck}
                  />
                  <Text style={styles.textHeader}>
                    {moment(item.NGAY_DN).format('DD/MM/YYYY')}
                  </Text>
                </Card.Title>
                <View style={styles.flex}>
                  <Icon
                    name="ios-person-circle-outline"
                    size={26}
                    style={styles.icon}
                  />
                  <Text style={styles.textHeader}>{item.HO_VA_TEN}</Text>
                </View>
                <View style={styles.flex}>
                  <Icon
                    name="ios-reader-outline"
                    size={26}
                    style={styles.icon}
                  />
                  <Text style={styles.textHeader}>{item.NOI_DUNG_DNTT}</Text>
                </View>
                <View style={styles.flex}>
                  <Icon name="ios-logo-usd" size={26} style={styles.icon} />
                  <Text style={styles.textHeader}>{item.TONG_TIEN}</Text>
                </View>
                <View style={styles.flex}>
                  <Icon
                    name="ios-person-circle-outline"
                    size={26}
                    style={styles.icon}
                  />
                  <Text style={styles.textHeader}>
                    {item.HO_VA_TEN_NGUOI_DN}
                  </Text>
                </View>
              </Card>
            </View>
     
        )}
      />
           </ScrollView>
    </View>
  );
};

export default ViewDNTTDaThanhToan;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flexDirection: 'row',
  },
  textHeader: {
    color: '#444',
    fontSize: 16,
    flexShrink: 1,
  },
  colorHeader: {
    shadowColor: '#000',
    
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: 0.2,
    backgroundColor: 'transparent',
    elevation: 1,
  },
  icon: {
    marginRight: 10,
    color: '#2179A9',
  },
  iconAdd: {
    color:'#2179A9',
  },
  iconStatusCheck: {
    color: 'green',
  },
  iconStatusWait: {
    color: 'deepskyblue',
  },
  iconStatusCancel: {
    color: 'red',
  },
});
