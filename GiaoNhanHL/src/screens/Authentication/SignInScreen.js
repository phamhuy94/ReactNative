import React, {useEffect, useState, useCallback} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  Button,
  TouchableOpacity,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {_login} from '../../redux/authentication/action';

const {width, height} = Dimensions.get('window');

const mark = require('../../images/login1_mark.png');
const driver = require('../../images/driver-01.png');
const lockIcon = require('../../images/login1_lock.png');
const personIcon = require('../../images/login1_person.png');


const SignInScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const isSignInFailed = useSelector(
    (store) => store.authentication.isSignInFailed,
  );
  const alertText = useSelector((store) => store.authentication.alertText);

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPass ,setShowPass] = useState(true);

  const signIn = useCallback((username, password) => {
    dispatch(_login(username, password));
  });

  useEffect(() => {
    if (isSignInFailed == true) {
      Alert.alert(alertText);
    }
  }, [isSignInFailed]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <ImageBackground style={styles.background}>
          <View style={styles.markWrap}>
            <Image source={mark} style={styles.mark} resizeMode="contain" />
          </View>
          <View style={styles.markWrap}>
            <Image source={driver} resizeMode="center" />
          </View>
          <View style={styles.wrapper}>
            <Text style={styles.h4}>Welcome to HopLong</Text>
            <View style={styles.inputWrap}>
              <View style={styles.iconWrap}>
                <Icon name="user" size={20} color="#2179A9" />
              </View>
              <TextInput
                placeholder="Username"
                placeholderTextColor="#ccc"
                color="#000"
                style={styles.input}
                value={username}
                onChangeText={setUsername}
              />
            </View>
            <View style={styles.inputWrap}>
              <View style={styles.iconWrap}>
                <Icon name="key" size={20} color="#2179A9" />
              </View>
              <TextInput
                placeholderTextColor="#ccc"
                color="#000"
                placeholder="Password"
                style={styles.input}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                secureTextEntry={showPass}
              />
              <TouchableOpacity
                style={styles.btnEye}
                onPress={() => setShowPass(!showPass)}>
                <Icon
                  name={'eye'}
                  size={20}
                  color={'#2179A9'}
                />
              </TouchableOpacity>
            </View>
            {/* <TouchableOpacity activeOpacity={.5}>
                            <View>

                            </View>
                        </TouchableOpacity> */}
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => signIn({username, password})}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Sign In</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <View style={styles.signupWrap}></View>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  h4: {
    fontSize: 30,
    textAlign: 'center',
    color: '#2179A9',
    marginTop: 30,
  },
  markWrap: {
    flex: 1,
    paddingVertical: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mark: {
    width: 100,
    height: 100,
    flex: 1,
    justifyContent: 'space-between',
    textAlign: 'center',
  },
  background: {
    width,
    height,
  },
  wrapper: {
    marginTop: 30,
  },
  btnEye: {
    position: 'absolute',
    top: 10,
    right: 10,
    color:'#000'
  },
  inputWrap: {
    marginHorizontal: 20,
    flexDirection: 'row',
    marginVertical: 10,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  iconWrap: {
    paddingHorizontal: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: 20,
    width: 20,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#2179A9',
    paddingVertical: 10,
    paddingHorizontal: 10,

    marginHorizontal: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
  forgotPasswordText: {
    color: '#D8D8D8',
    backgroundColor: 'transparent',
    textAlign: 'right',
    paddingRight: 15,
  },
  signupWrap: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountText: {
    color: '#D8D8D8',
  },
  signupLinkText: {
    color: '#FFF',
    marginLeft: 5,
  },
});

export default SignInScreen;
