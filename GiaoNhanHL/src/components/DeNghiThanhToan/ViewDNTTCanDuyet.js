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
  sotrang,
  sobanghi,
  navigation,
}) => {
  const dispatch = useDispatch();

  const getDeNghiTTNVCanDuyet = useSelector(
    (store) => store.DNTT.getDeNghiTTNVCanDuyet,
  );

  const countDNTTCanDuyet = useSelector(
    (store) => store.DNTT.demListDeNghiTTNVCanDuyet,
  );
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
  }, []);

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
  }, [username, sotrang]);

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
  }, []);

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
  const checkStatus = (TRUONG_PHONG_DA_DUYET, TRUONG_PHONG_HUY_DUYET, id,NGAY_DN) => {
    if (TRUONG_PHONG_DA_DUYET === true && TRUONG_PHONG_HUY_DUYET === false) {
      return (
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Icon
            name="ios-hourglass-outline"
            size={26}
            style={styles.iconTrash}
          />
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
            justifyContent: 'flex-end',
            marginLeft: 100,
          }}>
          <View style={{flexDirection: 'row', flex: 1}}>
            <Icon
              name="ios-hourglass-outline"
              size={26}
              style={styles.iconStatusWait}
            />
            <Text style={styles.textHeader}>
              {moment(NGAY_DN).format('DD/MM/YYYY')}
            </Text>
          </View>
          <View style={{marginLeft: 100}}>
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
      <Appbar.Header style={styles.colorHeader}>
        <Appbar.Action icon="power-standby" color={'#2179A9'} size={30} />
        <Appbar.Content
          title="DNTT Cần duyệt"
          color={'#2179A9'}
          style={{marginLeft: -15}}
        />
        <TouchableOpacity
          title="Click"
          onPress={() => navigation.navigate('Tạo đề nghị thanh toán')}>
          <Icon
            name="ios-add-circle-outline"
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
          data={getDeNghiTTNVCanDuyet}
          renderItem={({item, index}) => (
            <View>
              <Card>
                <Card.Title style={styles.flex}>
                  <View
                    style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <View style={styles.icon}>
                      {checkStatus(
                        item.TRUONG_PHONG_DA_DUYET,
                        item.TRUONG_PHONG_HUY_DUYET,
                        item.MA_SO_DN,
                        item.NGAY_DN
                      )}
                    </View>
                    {/* <Text style={styles.textHeader}>
                      {moment(item.NGAY_DN).format('DD/MM/YYYY')}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                      }}>
                      {item.TRUONG_PHONG_DA_DUYET === false &&
                      item.TRUONG_PHONG_HUY_DUYET === false ? (
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
                      )}
                    </View> */}
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
                  <Icon name="ios-logo-usd" size={26} style={styles.icon} />
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
              </Card>
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
};

export default ViewDNTTCanDuyet;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f2',
  },
  flex: {
    flexDirection: 'row',
  },
  textHeader: {
    color: '#444',
    fontSize: 16,
    flexShrink: 1,
  },
  iconAdd: {
    color: '#2179A9',
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
});
