import React, {useState, useEffect, useCallback} from 'react';
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
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Card} from 'react-native-elements';
import {Appbar} from 'react-native-paper';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

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
  navigation,
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
  }, [username, macongty]);

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
  }, [username, macongty]);

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
  }, [username, macongty]);

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.colorHeader}>
        <Appbar.Action
          icon="close-octagon-outline"
          color={'#2179A9'}
          size={30}
        />
        <Appbar.Content
          title="DNTT Đã hủy"
          color={'#2179A9'}
          style={{marginLeft: -15}}
        />
        <TouchableOpacity
          title="Click"
          onPress={() => navigation.navigate('Tạo đề nghị thanh toán')}>
          <Icon name="ios-add-circle" size={30} style={styles.iconAdd} />
        </TouchableOpacity>
      </Appbar.Header>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <FlatList
          data={getDeNghiTTNVDaHuy}
          renderItem={({item, index}) => (
            <View style={styles.card}>
              <Card.Title style={styles.flex}>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    name="ios-close-circle-sharp"
                    size={24}
                    style={styles.iconStatusCancel}
                  />
                  <Text style={styles.textHeader}>
                    {moment(item.NGAY_DN).format('DD/MM/YYYY')}
                  </Text>
                </View>
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
                <Icon name="ios-reader" size={26} style={styles.icon} />
                <Text style={styles.textHeader}>{item.NOI_DUNG_DNTT}</Text>
              </View>
              <View style={styles.flex}>
                <Icon name="ios-logo-usd" size={26} style={styles.icon} />
                <Text style={styles.textHeader}>{item.TONG_TIEN}</Text>
              </View>
              <View style={styles.flex}>
                <Icon name="ios-trash-bin" size={26} style={styles.icon} />
                <Text style={styles.textHeader}>{item.LY_DO_HUY}</Text>
              </View>
              <View style={styles.flex}>
                <Icon name="ios-person-circle" size={26} style={styles.icon} />
                <Text style={styles.textHeader}>{item.HO_VA_TEN_NGUOI_DN}</Text>
              </View>
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
    marginBottom: 10,
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
    color: '#2179A9',
  },
  iconStatusCheck: {
    color: 'green',
  },
  iconStatusWait: {
    color: 'deepskyblue',
  },
  iconStatusCancel: {
    color: 'red',
    marginRight: 5,
  },
  card: {
    marginTop: 0,
    margin: 15,
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 5.25,
    shadowRadius: 3.84,
    elevation: 6,
    shadowColor: Platform.OS === 'ios' ? ('#ccc') : ('transparent'),
  },
});
