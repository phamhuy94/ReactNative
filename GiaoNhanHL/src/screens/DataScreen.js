import React, { useEffect, useState, useContext } from 'react';
import { Alert, Button, Text, TextInput, View,Dimensions,SafeAreaView,TouchableOpacity,
    StyleSheet,
    ScrollView,
    StatusBar,
    FlatList,
    Image } from 'react-native';

function DataScreen({ navigation }) {
    const [state, setState] = useState([]);
    const [text, setText] = useState('')
    const [filtered, setFiltered] = useState([]);

    const LoadAPI = () => {
        const url = 'http://sales.hoplong.com/api/Api_NhanVien/NhanVienPhongBan';
        fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                isadmin: false,
                maphongban: 'INTE_HL',
                macongty: 'HOPLONG'
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

    const searchData = (text) => {
        const newData = state.filter(item => {
            const itemData = item.HO_VA_TEN.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1
        });

        setFiltered(newData)
        setText(text)
    }

    return (
      <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.textInput}
                onChangeText={(text) => searchData(text)}
                value={text}
                underlineColorAndroid='transparent'
                placeholder="Search Here" />
            <FlatList
                data={filtered}
                renderItem={({ item, index }) => (
                    <TouchableOpacity style={[styles.label, { backgroundColor: index % 2 == 0 ? "#f2f2f2" : "#FFFFFF" }]} onPress={() =>
                        navigation.push('Chi tiết nhân viên', {
                            itemId: item.USERNAME,
                        })
                    }>
                        <View style={styles.left}>
                            <Image style={styles.image} source={{ uri: 'http://sales.hoplong.com/Content/Images/Avatar/' + item.AVATAR }} />
                        </View>
                        <View style={styles.right}>
                            <Text style={styles.title}>{item.HO_VA_TEN}</Text>
                            <Text style={styles.subtitle}>{item.TEN_PHONG_BAN}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.USERNAME}
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
        height:50
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
    }
});


  export default DataScreen