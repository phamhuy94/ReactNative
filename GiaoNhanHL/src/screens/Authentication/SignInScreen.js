import React, { useEffect, useState, useContext, useCallback } from 'react';
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
    Keyboard, Alert
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {useDispatch,useSelector} from 'react-redux'
import {_login} from '../../redux/authentication/action'

const { width, height } = Dimensions.get("window");

const background = require("../../images/login1_bg.png");
const mark = require("../../images/logo_hoplong1.png");
const lockIcon = require("../../images/login1_lock.png");
const personIcon = require("../../images/login1_person.png");

const SignInScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const isSignInFailed = useSelector((store) => store.authentication.isSignInFailed)
    const alertText = useSelector((store) => store.authentication.alertText)

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
   
    const signIn = useCallback((username,password) => {
        dispatch(_login(username,password))
    })

    useEffect(() => {
        if(isSignInFailed == true){
            Alert.alert(alertText)
        }
    }, [isSignInFailed]);

    return (
        <ScrollView>
            <View style={styles.container}>
                <ImageBackground source={background} style={styles.background}>
                    <View style={styles.markWrap}>
                        <Image source={mark} style={styles.mark} resizeMode="contain" />
                    </View>
                    <View style={styles.wrapper}>
                        <View style={styles.inputWrap}>
                            <View style={styles.iconWrap}>
                                <Image source={personIcon} style={styles.icon} resizeMode="contain" />
                            </View>
                            <TextInput
                                placeholder="Username"
                                placeholderTextColor="#FFF"
                                color="#FFF"
                                style={styles.input}
                                value={username}
                                onChangeText={setUsername}
                            />
                        </View>
                        <View style={styles.inputWrap}>
                            <View style={styles.iconWrap}>
                                <Image source={lockIcon} style={styles.icon} resizeMode="contain" />
                            </View>
                            <TextInput
                                placeholderTextColor="#FFF"
                                color="#FFF"
                                placeholder="Password"
                                style={styles.input}
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                            />
                        </View>
                        <TouchableOpacity activeOpacity={.5}>
                            <View>

                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={.5} onPress={() => signIn({ username, password })}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Sign In</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.signupWrap}>

                        </View>
                    </View>
                </ImageBackground>
            </View>

        </ScrollView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    markWrap: {
        flex: 1,
        paddingVertical: 30,
    },
    mark: {
        width: null,
        height: null,
        flex: 1,
    },
    background: {
        width,
        height,
    },
    wrapper: {
        paddingVertical: 30,
    },
    inputWrap: {
        flexDirection: "row",
        marginVertical: 10,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: "#CCC"
    },
    iconWrap: {
        paddingHorizontal: 7,
        alignItems: "center",
        justifyContent: "center",
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
        backgroundColor: "#4e5850",
        paddingVertical: 20,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 18,
    },
    forgotPasswordText: {
        color: "#D8D8D8",
        backgroundColor: "transparent",
        textAlign: "right",
        paddingRight: 15,
    },
    signupWrap: {
        backgroundColor: "transparent",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    accountText: {
        color: "#D8D8D8"
    },
    signupLinkText: {
        color: "#FFF",
        marginLeft: 5,
    }
});

export default SignInScreen;