import React, {useEffect, useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  GetDeNghiTTNVCanThanhToan,
  DemListDeNghiTTNVCanThanhToan,
} from '../../redux/DNTT/action';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  StyleSheet,
  Button,
  RefreshControl,
  Dimensions,
} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};
const ViewDNTTCanThanhToan = ({
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

  const getDeNghiTTNVCanThanhToan = useSelector(
    (store) => store.DNTT.getDeNghiTTNVCanThanhToan,
  );
  const countDNTTCanThanhToan = useSelector(
    (store) => store.DNTT.demListDeNghiTTNVCanThanhToan,
  );
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
    dispatch(
      GetDeNghiTTNVCanThanhToan(
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
      GetDeNghiTTNVCanThanhToan(
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
      DemListDeNghiTTNVCanThanhToan(
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
  const checkStatus = (
    DA_THANH_TOAN,
    DA_DUYET,
    DA_HUY,
    TRUONG_PHONG_DA_DUYET,
    TRUONG_PHONG_HUY_DUYET,
    id,
  ) => {
    if (
      DA_THANH_TOAN == true &&
      ((TRUONG_PHONG_DA_DUYET === false && TRUONG_PHONG_HUY_DUYET === true) ||
        (DA_DUYET === false && DA_HUY === true) ||
        (TRUONG_PHONG_DA_DUYET == true && DA_HUY == true))
    ) {
      return (
        <Icon
          name="ios-refresh-circle"
          size={24}
          style={styles.iconStatusCheck}
        />
      );
    }
    if (DA_THANH_TOAN == true) {
      return (
        <View>
          <Icon
            name="ios-refresh-circle"
            size={24}
            style={styles.iconStatusWait}
          />
        </View>
      );
    }
    if (
      DA_THANH_TOAN == false &&
      ((TRUONG_PHONG_DA_DUYET === false && TRUONG_PHONG_HUY_DUYET === true) ||
        (DA_DUYET === false && DA_HUY === true) ||
        (TRUONG_PHONG_DA_DUYET == true && DA_HUY == true))
    ) {
      return (
        <Icon
          name="ios-close-circle-sharp"
          size={24}
          style={styles.iconStatusCancel}
        />
      );
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
          {
            showList ? (
              <ViewTable data={getDeNghiTTNVCanThanhToan} checkStatus={checkStatus}/>
            ) : (
              <ViewTask data={getDeNghiTTNVCanThanhToan} checkStatus={checkStatus}/>
            )
          }
        </ScrollView>
    </View>
  );
};

const ViewTask = ({data, checkStatus}) => {
  return (
    <FlatList
      data={data}
      renderItem={({item, index}) => (
        <View style={styles.card}>
          <View
            style={{
              alignContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View style={styles.icon}>
              {checkStatus(
                item.TRUONG_PHONG_DA_DUYET,
                item.TRUONG_PHONG_HUY_DUYET,

                item.MA_SO_DN,
              )}
            </View>
            <Text style={styles.textHeader}>
              {moment(item.NGAY_DN).format('DD/MM/YYYY')}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}></View>
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
            <Icon name="ios-logo-usd" size={24} style={styles.icon} />
            <Text style={styles.textHeader}>{item.TONG_TIEN}</Text>
          </View>
          <View style={styles.flex}>
            <Icon name="ios-person-circle" size={26} style={styles.icon} />
            <Text style={styles.textHeader}>{item.HO_VA_TEN_NGUOI_DN}</Text>
          </View>
        </View>
      )}
    />
  );
};

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
  )
};

export default ViewDNTTCanThanhToan;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:height * 0.75
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
  iconAdd: {
    color: '#2179A9',
  },
  icon: {
    marginRight: 5,
    color: '#2179A9',
  },
  iconStatusCheck: {
    color: 'green',
  },
  iconStatusWait: {
    color: '#2179A9',
  },
  iconTrash: {
    color: '#2179A9',
  },
  iconStatusCancel: {
    color: 'red',
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
    shadowColor: Platform.OS === 'ios' ? '#ccc' : 'transparent',
  },
  listWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderBottomWidth: 1,
    borderBottomColor:'#ccc'
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
