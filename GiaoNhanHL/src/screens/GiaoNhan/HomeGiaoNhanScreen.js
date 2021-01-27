import React, {useState, useEffect, useCallback} from 'react';
import {
  Button,
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  RefreshControl,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getCanNhan, getDaNhan} from '../../redux/GiaoNhan/action';
import {Appbar} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

function HomeGiaoNhanScreen({navigation}) {
  const dispatch = useDispatch();

  const slCanNhan = useSelector((store) => store.giaoNhan.slCanNhan);
  const slDaNhan = useSelector((store) => store.giaoNhan.slDaNhan);

  const [username, setUsername] = useState();
  const [macongty, setMaCongTy] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [maphongban, setMaphongban] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const getToken = async () => {
    const username = await AsyncStorage.getItem('userToken');
    const macongty = await AsyncStorage.getItem('maCongTy');
    setUsername(username);
    setMaCongTy(macongty);
  };
  useEffect(() => {
    getToken();
  }, []);

  const data = {
    macongty: macongty,
    username: username,
    isadmin: isAdmin,
    maphongban: maphongban,
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
    dispatch(getCanNhan(data), getDaNhan(data));
  }, [username, macongty, data]);

  const titleCanNhan = 'Cần nhận ';
  const titleDaNhan = 'Đang nhận ';

  useEffect(() => {
    dispatch(getCanNhan(data));
    dispatch(getDaNhan(data));
  }, [username, macongty]);

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.colorHeader}>
        <Appbar.Action icon="home" color={'#2179A9'} size={30} />
        <Appbar.Content
          title="Home"
          color={'#2179A9'}
          style={{marginLeft: -15}}
        />
      </Appbar.Header>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={[styles.center]}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Danh sách cần nhận')}>
            <Text style={styles.text}>{titleCanNhan}</Text>
            <Text style={styles.textNumber}>{slCanNhan}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            title={titleDaNhan}
            style={styles.button}
            onPress={() => navigation.navigate('Danh sách đã nhận')}>
            <Text style={styles.text}>{titleDaNhan}</Text>
            <Text style={styles.textNumber}>{slDaNhan}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeGiaoNhanScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#f0f2f2',
  },
  textHeader: {
    color: '#2179A9',
    width: '100%',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 18,
  },
  colorHeader: {
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: 0.2,
    backgroundColor: 'transparent',
    elevation: 1,
  },
  button: {
    borderRadius: 10,
    width: 150,
    height: 150,
    marginTop: 50,
    fontSize: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2179A9',
  },
  center: {
    flex: 1,
    alignItems:'center',
    alignContent: 'center',
  },
  text: {
    fontSize: 26,
    color: '#fff',
    textAlign: 'center',
  },
  textNumber: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});
