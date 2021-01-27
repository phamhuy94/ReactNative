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
} from 'react-native';
import {Card} from 'react-native-elements';
import {Appbar} from 'react-native-paper';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';

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
      <Appbar.Header style={styles.colorHeader}>
        <Appbar.Action
          icon="card-account-mail-outline"
          color={'#2179A9'}
          size={30}
        />
        <Appbar.Content
          title="DNTT Cần thanh toán"
          color={'#2179A9'}
          style={{marginLeft: -15}}
        />
        <TouchableOpacity
          title="Click"
          onPress={() => navigation.navigate('Tạo đề nghị thanh toán')}>
          <Icon
            name="ios-add-circle"
            size={30}
            style={styles.iconAdd}
          />
        </TouchableOpacity>
      </Appbar.Header>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <FlatList
          data={getDeNghiTTNVCanThanhToan}
          renderItem={({item, index}) => (
            <View style={styles.card}>
                <Card.Title style={styles.flex}>
                  <View
                    style={{flexDirection: 'row'}}>
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
                      }}>
                     {/* {item.DA_THANH_TOAN == false ? (
                        <View
                          style={{
                            position: 'absolute',
                            right: -100,
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            alignContent: 'flex-end',
                          }}>
                          <TouchableOpacity
                            onPress={() => deleteDNTTCanDuyet(id)}>
                            <Icon
                              name="trash"
                              size={24}
                              style={styles.iconTrash}
                            />
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <Text></Text>
                      )} */}
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
                  <Icon
                    name="ios-reader"
                    size={26}
                    style={styles.icon}
                  />
                  <Text style={styles.textHeader}>{item.NOI_DUNG_DNTT}</Text>
                </View>
                <View style={styles.flex}>
                  <Icon name="ios-logo-usd" size={24} style={styles.icon} />
                  <Text style={styles.textHeader}>{item.TONG_TIEN}</Text>
                </View>
                <View style={styles.flex}>
                  <Icon
                    name="ios-person-circle"
                    size={26}
                    style={styles.icon}
                  />
                  <Text style={styles.textHeader}>
                    {item.HO_VA_TEN_NGUOI_DN}
                  </Text>
                </View>
     
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
};

export default ViewDNTTCanThanhToan;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flexDirection: 'row',
    marginBottom:10,
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
  },
});
