import React, { useEffect, useState, useContext } from 'react';
import { Alert, Button, Text, TextInput, View,Dimensions,SafeAreaView,TouchableOpacity,
    StyleSheet,
    ScrollView,
    StatusBar,
    FlatList,
    Image,
    ImageBackground } from 'react-native';
    import FastImage from 'react-native-fast-image'

function NotificationsScreen({ navigation }) {
    const [state, setState] = useState([]);
    const [text, setText] = useState('')
    const [filtered, setFiltered] = useState([]);

    const LoadAPI = () => {
        const url = 'http://sales.hoplong.com/api/Api_POST_CATEGORIES/DanhSachBaiViet';
        fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                madanhmuc: "",
                tungay: "",
                denngay: "",
                tukhoa: "",
                sotrang : 1
            })
        })
            .then(res => res.json())
            .then(res => {
                setState(res)
                setFiltered(res)
            })
            .catch(error => {

            });
    }

    useEffect(() => {
        LoadAPI()
    }, []);


    return (
      <SafeAreaView style={styles.container}>   
            <FlatList
                data={filtered}
                renderItem={({ item, index }) => (
                    <TouchableOpacity style={[styles.label, { backgroundColor: index % 2 == 0 ? "#f2f2f2" : "#FFFFFF" }]}>
                        <View style={styles.left}>
                            <FastImage style={styles.image} source={{ uri: 'http://sales.hoplong.com/Content/Images/BaiViet/' + item.ANH_BAI_VIET }} resizeMode="contain"/>
                        </View>
                        <View style={styles.right}>
                            <Text style={styles.title}>{item.TIEU_DE_BAI_VIET}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.MA_BAI_VIET.toString()}
            />
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
        marginBottom:10,
        flexDirection: 'row',
        // height:100
    },
    left: {
        width: width * 0.2,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    right: {
        width: width * 0.8,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
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
    detail_image:{
        width:width,
        height:300
    },
    detail_table:{
        flexDirection:'row', 
        flexWrap:'wrap',
    },
    detail_title: {
        fontWeight: 'bold',
        fontSize: 18,      
        textAlign:'center'
    },
    cardContainer: {
        backgroundColor: '#FFF',
        borderWidth: 0,
        flex: 1,
        margin: 0,
        padding: 0,
    },
    container: {
        flex: 1,
    },
    emailContainer: {
        backgroundColor: '#FFF',
        flex: 1,
        paddingTop: 30,
    },
    headerBackgroundImage: {
        paddingBottom: 20,
        paddingTop: 20,
    },
    headerContainer: {},
    headerColumn: {
        backgroundColor: 'transparent',
        ...Platform.select({
            ios: {
                alignItems: 'center',
                elevation: 1,
                marginTop: -1,
            },
            android: {
                alignItems: 'center',
            },
        }),
    },
    placeIcon: {
        color: 'white',
        fontSize: 26,
    },
    scroll: {
        backgroundColor: '#FFF',
    },
    telContainer: {
        backgroundColor: '#FFF',
        flex: 1,
        paddingTop: 30,
    },
    userAddressRow: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    userCityRow: {
        backgroundColor: 'transparent',
    },
    userCityText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
        textAlign: 'center',
    },
    userImage: {
        borderColor: '#FFF',
        borderRadius: 85,
        borderWidth: 3,
        height: 170,
        marginBottom: 15,
        width: 170,
    },
    userNameText: {
        color: '#FFF',
        fontSize: 22,
        fontWeight: 'bold',
        paddingBottom: 8,
        textAlign: 'center',
    },
});


  export default NotificationsScreen