import React, {useEffect} from 'react';
import {
  Button,
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {getCanNhan, getDaNhan} from '../../redux/GiaoNhan/action';
import {Appbar} from 'react-native-paper';
function HomeGiaoNhanScreen({navigation}) {
  const dispatch = useDispatch();

  const slCanNhan = useSelector((store) => store.giaoNhan.slCanNhan);
  const slDaNhan = useSelector((store) => store.giaoNhan.slDaNhan);

//   const titleCanNhan = 'Cần nhận ' + slCanNhan + '';
//   const titleDaNhan = 'Đang nhận ' + slDaNhan + '';

  const titleCanNhan = 'Cần nhận ';
  const titleDaNhan = 'Đang nhận ';

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getCanNhan());
      dispatch(getDaNhan());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Home" />
      </Appbar.Header>
      <View style={styles.center}>
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
  
    </SafeAreaView>
  );
}

export default HomeGiaoNhanScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
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
    flex:1,
    alignItems:'center',
    alignContent:'center',
  },
  text: {
    fontSize: 26,
    color: '#fff',
    textAlign:'center',
  },
  textNumber: {
    fontSize: 34,
    fontWeight:'bold',
    color: '#fff',
    textAlign:'center',
  },
});


