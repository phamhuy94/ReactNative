import React, { useEffect, useState, useContext } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import { AuthContext } from '../utils/authContext';

const SignInScreen = ({ navigation }) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const { signIn } = React.useContext(AuthContext);
    
    return (
        <View>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Đăng nhập" onPress={() => signIn({ username, password })} />
        </View>
    );
}

export default SignInScreen;