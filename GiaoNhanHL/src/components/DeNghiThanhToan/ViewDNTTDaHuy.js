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
  showList
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
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {
          showList ? (
            <ViewTable data={getDeNghiTTNVDaHuy}/>
          ) : (
            <ViewTask data={getDeNghiTTNVDaHuy}/>
          )
        }
      </ScrollView>
    </View>
  );
};

const ViewTask = ({data}) => {
  return(
        <FlatList
          data={data}
          renderItem={({item, index}) => (
            <View style={styles.card}>
              
              <View style={{alignContent:'center',alignSelf:'center',alignItems:'center',flexDirection:'row'}}>
                  <Icon
                    name="ios-close-circle-sharp"
                    size={24}
                    style={styles.iconStatusCancel}
                  />
                  <Text style={styles.textHeader}>
                    {moment(item.NGAY_DN).format('DD/MM/YYYY')}
                  </Text>
                </View>
              
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
                <Icon name="ios-person-circle" size={26} style={styles.icon} />
                <Text style={styles.textHeader}>{item.HO_VA_TEN_NGUOI_DN}</Text>
              </View>
            </View>
          )}
        />
  )
}

const ViewTable = ({data}) => {
  return (
    <ScrollView horizontal={true}>
      <View style={styles.container}>
        <View style={styles.listWrapper}>
          <Text style={[styles.rowHeader,{width:140}]}>Ngày</Text>
          <Text style={[styles.rowHeader,{width:140}]}>Số tiền</Text>
          <Text style={[styles.rowHeader,{width:200}]}>Người DN</Text>
          <Text style={[styles.rowHeader,{width:200}]}>Người hưởng</Text>
          <Text style={[styles.rowHeader,{width:400}]}>Nội dung</Text>
        </View>
        <FlatList
          data={data}
          renderItem={({item, index}) => (
            <View style={styles.listWrapper}>
              <Text style={[styles.row,{width:140}]}>{moment(item.NGAY_DN).format('DD/MM/YYYY')}</Text>
              <Text style={[styles.row,{width:140}]}>{item.TONG_TIEN}</Text>
              <Text style={[styles.row,{width:200}]}>{item.HO_VA_TEN}</Text>
              <Text style={[styles.row,{width:200}]}>{item.HO_VA_TEN_NGUOI_DN}</Text>
              <Text style={[styles.row,{width:400}]}>{item.NOI_DUNG_DNTT}</Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
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
    shadowOpacity: Platform.OS === 'ios' ? 0 : 0.2,
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
  listWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderBottomWidth: 0.5,
  },
  row: {
    backgroundColor: '#fff',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    fontSize: 16,
    flexShrink: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: '#444',
  },
  row1: {
    backgroundColor: '#fff',
    width: 400,
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: '#444',
  },  
  rowHeader: {
    backgroundColor: '#2179A9',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 16,
    flexShrink: 1,
}
});
