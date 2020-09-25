import React from 'react';
import { Alert, Button, Text, TextInput, View, Dimensions, SafeAreaView, TouchableOpacity,
    StyleSheet,
    ScrollView,
    StatusBar,
    FlatList,
    Image } from 'react-native';

    export default function ViewDetail({data}){
        const state = data
        return (
            <SafeAreaView style={styles.container}>
                <View>               
                    <Image style={styles.detail_image} source={{ uri: 'http://sales.hoplong.com/Content/Images/Avatar/' + state.AVATAR }} />
                    <Text style={styles.detail_title}>{state.HO_VA_TEN} - {state.TEN_PHONG_BAN}</Text> 
                    <View style={styles.detail_table}>
                        <View>
                            <Text>Điện thoại: {state.SDT}</Text>
                            <Text>Email cá nhân: {state.EMAIL}</Text>
                            <Text>Email công ty: {state.EMAIL_CONG_TY}</Text>
                            <Text>Facebook: {state.FACEBOOK}</Text>
                            <Text>Skype: {state.SKYPE}</Text>
                        </View>
                    </View>                   
                </View>
            </SafeAreaView>
        );
    }

const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    label: {
        marginBottom: 10,
        flexDirection: 'row',
        height: 50
    },
    left: {
        width: width * 0.2,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    right: {
        width: width * 0.8,
        flex: 1
    },
    image: {
        width: 50,
        height: 50,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    subtitle: {
        fontSize: 15
    },
    detail_image: {
        width: width,
        height: 300
    },
    detail_table: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    detail_title: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center'
    }
});
