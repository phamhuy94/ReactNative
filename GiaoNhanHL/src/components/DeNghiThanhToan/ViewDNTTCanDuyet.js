import React, {useState, useEffect,useCallback } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  GetDeNghiTTNVCanDuyet,
  DemListDeNghiTTNVCanDuyet,
  DeleteDeNghiTT
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

const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

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
  navigation
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
  const checkStatus = (TRUONG_PHONG_DA_DUYET, TRUONG_PHONG_HUY_DUYET, id) => {
    if (TRUONG_PHONG_DA_DUYET === true && TRUONG_PHONG_HUY_DUYET === false) {
      return (
        <Icon
          name="ios-checkmark-circle"
          size={26}
          style={styles.iconStatusCheck}
        />
      );
    }
    if (TRUONG_PHONG_DA_DUYET === false && TRUONG_PHONG_HUY_DUYET === false) {
      return (
        <View>
          <Icon
            name="ios-refresh-circle"
            size={26}
            style={styles.iconStatusWait}
          />
          <Button onPress={() => deleteDNTTCanDuyet(id)} title="press">
            <Icon name="trash" size={26} style={styles.iconStatusWait} />
          </Button>
        </View>
      );
    }
    if (TRUONG_PHONG_HUY_DUYET !== false) {
      return (
        <Icon
          name="ios-close-circle-sharp"
          size={26}
          style={styles.iconStatusCancel}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
       <Appbar.Header>
        <Appbar.Content title="DNTT Cần duyệt" color={'#fff'} />
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
        data={getDeNghiTTNVCanDuyet}
        renderItem={({item, index}) => (
      
            <View>
              <Card>
                <Card.Title style={styles.flex}>
                {checkStatus(
                    item.TRUONG_PHONG_DA_DUYET,
                    item.TRUONG_PHONG_HUY_DUYET,
                    item.MA_SO_DN,
                  )}
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
                  <Icon name="ios-person-circle-outline" size={26} style={styles.icon} />
                  <Text style={styles.textHeader}>{item.HO_VA_TEN_NGUOI_DN}</Text>
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
 
  },
  flex: {
    flexDirection:'row'
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
