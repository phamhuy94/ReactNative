import React, {useState, useEffect,useCallback } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  GetDeNghiTTNVDaHuy,
  DemListDeNghiTTNVDaHuy,
} from '../../redux/DNTT/action';
import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
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

const ViewDNTTDaHuy = ({
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
  const getDeNghiTTNVDaHuy = useSelector(
    (store) => store.DNTT.getDeNghiTTNVDaHuy,
  );
  const demListDeNghiTTNVDaHuy = useSelector(
    (store) => store.DNTT.demListDeNghiTTNVDaHuy,
  );

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
    dispatch(
      GetDeNghiTTNVDaHuy(
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
      GetDeNghiTTNVDaHuy(
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
      DemListDeNghiTTNVDaHuy(
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

  // console.log(getDeNghiTTNVDaHuy)

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="DNTT Đã hủy" color={'#fff'} />
        <Button
          title="Click"
          onPress={() => navigation.navigate('Tạo đề nghị thanh toán')}
        >

        </Button>
      </Appbar.Header>
      <ScrollView 
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          >
      <FlatList
        data={getDeNghiTTNVDaHuy}
        renderItem={({item, index}) => (
    
            <View>
              <Card>
                <Card.Title>
                  <Icon
                    name="ios-close-circle-sharp"
                    size={26}
                    style={styles.iconStatusCancel}
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
                  <Icon name="ios-close-sharp" size={26} style={styles.icon} />
                  <Text style={styles.textHeader}>{item.LY_DO_HUY}</Text>
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

export default ViewDNTTDaHuy;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flexDirection: 'row',
  },
  textHeader: {
    color: '#000',
    fontSize: 20,
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  icon: {
    marginRight: 10,
    color: '#000',
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
