import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  GetDeNghiTTNVCanDuyet,
  DemListDeNghiTTNVCanDuyet,
  DeleteDeNghiTT,
} from '../../redux/DNTT/action';
import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  Button,
  FlatList,
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native';
import {Card} from 'react-native-elements';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { width, height, widthScale, heightScale, moderateScale  } from '../../js/size';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const ViewDNTTCanDuyet = ({
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

  const getDeNghiTTNVCanDuyet = useSelector(
    (store) => store.DNTT.getDeNghiTTNVCanDuyet,
  );

  const countDNTTCanDuyet = useSelector(
    (store) => store.DNTT.demListDeNghiTTNVCanDuyet,
  );

  const [sotrang, setSotrang] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
    dispatch(
      GetDeNghiTTNVCanDuyet(
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
      GetDeNghiTTNVCanDuyet(
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
      DemListDeNghiTTNVCanDuyet(
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

  const deleteDNTTCanDuyet = async (id) => {
    await dispatch(DeleteDeNghiTT(id));
    await dispatch(
      GetDeNghiTTNVCanDuyet(
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
  };
  const checkStatus = (
    TRUONG_PHONG_DA_DUYET,
    TRUONG_PHONG_HUY_DUYET,
    id,
    NGAY_DN,
  ) => {
    if (TRUONG_PHONG_DA_DUYET === true && TRUONG_PHONG_HUY_DUYET === false) {
      return (
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              alignContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
              width: 30,
            }}>
            <Icon
              name="ios-hourglass-outline"
              size={24}
              style={styles.iconTrash}
            />
          </View>

          <Text style={styles.textHeader}>
            {moment(NGAY_DN).format('DD/MM/YYYY')}
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
            alignItems: 'center',
          }}>
          <View style={{left: 105}}>
            <Icon
              name="ios-hourglass-outline"
              size={24}
              style={styles.iconStatusWait}
            />
          </View>

          <Text style={[styles.textHeader, {left: 105}]}>
            {moment(NGAY_DN).format('DD/MM/YYYY')}
          </Text>

          <View style={{marginLeft: 200}}>
            <TouchableOpacity onPress={() => deleteDNTTCanDuyet(id)}>
              <Icon name="trash" size={24} style={styles.iconTrash} />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    if (TRUONG_PHONG_HUY_DUYET !== false) {
      return (
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Icon
            name="ios-close-circle-sharp"
            size={26}
            style={styles.iconStatusCancel}
          />{' '}
          <Text style={styles.textHeader}>
            {moment(NGAY_DN).format('DD/MM/YYYY')}
          </Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {showList ? (
          <ViewTable data={getDeNghiTTNVCanDuyet} checkStatus={checkStatus} />
        ) : (
          <ScrollView
            contentContainerStyle={styles.scrollView}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <ViewTask data={getDeNghiTTNVCanDuyet} checkStatus={checkStatus} />
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
                    sotrang > parseFloat(countDNTTCanDuyet) / 15
                      ? '#aaa'
                      : '#2179A9',
                },
              ]}
              disabled={sotrang > parseFloat(countDNTTCanDuyet) / 15}
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
          <Card.Title style={styles.flex}>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <View style={styles.icon}>
                {checkStatus(
                  item.TRUONG_PHONG_DA_DUYET,
                  item.TRUONG_PHONG_HUY_DUYET,
                  item.MA_SO_DN,
                  item.NGAY_DN,
                )}
              </View>
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

export default ViewDNTTCanDuyet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f2',
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
  icon: {
    marginRight: moderateScale(10),
    color: '#2179A9',
  },
  iconStatusCheck: {
    color: 'green',
  },
  iconTrash: {
    color: '#2179A9',
  },
  iconStatusWait: {
    color: '#aaa',
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
    shadowColor: Platform.OS === 'ios' ? '#ccc' : 'transparent',
    shadowRadius: 3.84,
    elevation: 6,
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
  row1: {
    backgroundColor: '#fff',
    width: widthScale(380),
    flex: 1,
    fontSize: moderateScale(16),
    padding:moderateScale(10),
    color: '#444',
  },
  rowHeader: {
    backgroundColor: '#2179A9',
    color: '#fff',
    padding:moderateScale(10),
    fontSize: moderateScale(16),
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
