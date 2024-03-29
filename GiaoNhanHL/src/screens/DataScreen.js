import React, { useEffect, useState, useContext, useCallback } from 'react';
import { Alert, Button, Text, TextInput, View,Dimensions,SafeAreaView,TouchableOpacity,
StyleSheet,
ScrollView,
StatusBar,
FlatList,
Image,
ImageBackground } from 'react-native';
import { Tile, List, ListItem,Card,Icon,SearchBar } from 'react-native-elements';
import FastImage from 'react-native-fast-image'
import SelectPhongBan from '../components/SelectPhongBan'  

import {useDispatch,useSelector} from 'react-redux'
import {getUser,getUserRequest} from '../redux/user/action'

function DataScreen({ navigation }) {
    const dispatch = useDispatch(); 

    const isLoading = useSelector((store) => store.user.isLoading);
    const listUser = useSelector((store) => store.user.listUser);
    const [filtered, setFiltered] = useState(listUser);

    const [text, setText] = useState('')
    const [maPhongBan,setPhongBan] = useState('PURC_HL')

    useEffect(() => {
        dispatch(getUser(maPhongBan));
        return () => {
            dispatch(getUserRequest())
        }
    }, [maPhongBan]);

    useEffect(() => {
        setFiltered(listUser)
    }, [listUser])
    
    const searchData = ((text) => {
        const newData = listUser.filter(item => {
            const itemData = item.HO_VA_TEN.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1
        });

        setFiltered(newData)
        setText(text)
    })

    return (
      <SafeAreaView style={styles.container}>
            <SearchBar        
            placeholder="Type Name Here..."        
            lightTheme        
            round      
            value={text}  
            onChangeText={text => searchData(text)}        
            /> 
            <SelectPhongBan data={maPhongBan} action={setPhongBan} />   
            {isLoading? (
              // We haven't finished checking for the token yet
              <View>
                  <Text>Loading...</Text>
              </View>
            ) : (
                <FlatList
                    data={filtered}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity style={[styles.label, { backgroundColor: index % 2 == 0 ? "#f2f2f2" : "#FFFFFF" }]} onPress={() =>
                            navigation.navigate('Chi tiết nhân viên', {
                                itemId: item.USERNAME,
                            })
                        }>
                            <View style={styles.left}>
                                <FastImage style={styles.image} source={{ uri: 'http://app.hoplong.com/Content/Images/Avatar/' + item.AVATAR }} />
                            </View>
                            <View style={styles.right}>
                                <Text style={styles.title}>{item.HO_VA_TEN}</Text>
                                <Text style={styles.subtitle}>{item.TEN_PHONG_BAN}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.USERNAME}
                />
            )}
            
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
        padding:10,
        flexDirection: 'row',
    },
    left: {
        width: width * 0.2,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    right: {
        width: width * 0.8,
        flex: 1
    },
    image: {
        width: 50,
        height: 50,
        borderRadius:50,
        justifyContent: 'center',
        alignItems: 'center',
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


  export default DataScreen