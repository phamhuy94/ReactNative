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
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import { width, height, widthScale, heightScale, moderateScale  } from '../../js/size';
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
  sobanghi,
  navigation,
  showList,
}) => {
  const dispatch = useDispatch();

  const getDeNghiTTNVCanThanhToan = useSelector(
    (store) => store.DNTT.getDeNghiTTNVCanThanhToan,
  );
  const countDNTTCanThanhToan = useSelector(
    (store) => store.DNTT.demListDeNghiTTNVCanThanhToan,
  );

  const [sotrang, setSotrang] = useState(1);
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
  }, [username, macongty, sotrang]);

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
  }, [username, macongty, sotrang]);

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
  }, [username, macongty, sotrang]);
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
      <ScrollView>
        {showList ? (
          <ViewTable
            data={getDeNghiTTNVCanThanhToan}
            checkStatus={checkStatus}
          />
        ) : (
          <ScrollView
            contentContainerStyle={styles.scrollView}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <ViewTask
              data={getDeNghiTTNVCanThanhToan}
              checkStatus={checkStatus}
            />
          </ScrollView>
        )}
        <View>
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
                    sotrang > parseFloat(countDNTTCanThanhToan) / 15
                      ? '#aaa'
                      : '#2179A9',
                },
              ]}
              disabled={sotrang > parseFloat(countDNTTCanThanhToan) / 15}
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
        </View>
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
          <Text style={[styles.rowHeader, {width: 140}]}>Ngày</Text>
          <Text style={[styles.rowHeader, {width: 140}]}>Số tiền</Text>
          <Text style={[styles.rowHeader, {width: 200}]}>Người DN</Text>
          <Text style={[styles.rowHeader, {width: 200}]}>Người hưởng</Text>
          <Text style={[styles.rowHeader, {width: 400}]}>Nội dung</Text>
        </View>
        <FlatList
          data={data}
          renderItem={({item, index}) => (
            <View style={styles.listWrapper}>
              <Text style={[styles.row, {width: 140}]}>
                {moment(item.NGAY_DN).format('DD/MM/YYYY')}
              </Text>
              <Text style={[styles.row, {width: 140}]}>{item.TONG_TIEN}</Text>
              <Text style={[styles.row, {width: 200}]}>{item.HO_VA_TEN}</Text>
              <Text style={[styles.row, {width: 200}]}>
                {item.HO_VA_TEN_NGUOI_DN}
              </Text>
              <Text style={[styles.row, {width: 400}]}>
                {item.NOI_DUNG_DNTT}
              </Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default ViewDNTTCanThanhToan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight:heightScale(500)
  },
  flex: {
    flexDirection: 'row',
    marginBottom: moderateScale(10),
  },
  textHeader: {
    color: '#444',
    fontSize: moderateScale(16),
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
    marginRight: moderateScale(5),
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
    margin: moderateScale(15),
    padding: moderateScale(15),
    borderRadius: moderateScale(5),
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
    borderBottomColor: '#ccc',
  },
  row: {
    backgroundColor: '#fff',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    fontSize: moderateScale(16),
    flexShrink: 1,
    padding:moderateScale(10),
    color: '#444',
  },

  rowHeader: {
    backgroundColor: '#2179A9',
    color: '#fff',
    fontSize: moderateScale(16),
    padding:moderateScale(10),
    flexShrink: 1,
  },
  iconPage: {
    color: '#fff',
  },
  flexCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'space-between',
    height: moderateScale(50),
    alignItems: 'center',
  },
  button: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
