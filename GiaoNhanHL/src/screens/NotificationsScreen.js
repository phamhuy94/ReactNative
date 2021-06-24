import React, {useEffect, useState, useContext} from 'react';
import {
  Alert,
  Button,
  Text,
  TextInput,
  View,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  FlatList,
  Image,
  ImageBackground,
  Platform
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Appbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {getDemDanhSachBaiViet} from '../redux/user/action';
import { useDispatch, useSelector } from 'react-redux';
function NotificationsScreen({navigation}) {
  const dispatch = useDispatch()
  const soBaiViet = useSelector((store) => store.user.demDanhSachBaiViet)

  const [state, setState] = useState([]);
  const [text, setText] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [page, setPage] = useState(1);

  const LoadAPI = () => {
    const url =
      'http://app.hoplong.com/api/Api_POST_CATEGORIES/DanhSachBaiViet';
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        madanhmuc: '',
        tungay: '',
        denngay: '',
        tukhoa: '',
        sotrang: page,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setState(res);
        setFiltered(res);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    LoadAPI();
  }, [page]);

  useEffect(() => {
    dispatch(getDemDanhSachBaiViet())
  },[])

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.colorHeader}>
      <Appbar.Action
        icon="file-document-outline"
        color={'#2179A9'}
        size={30}
       
      />
        <Appbar.Content title="Notifications" color={'#2179A9'} style={{marginLeft: -15}} />
        
      </Appbar.Header>
      <ScrollView>
        <FlatList
          data={filtered}
          renderItem={({item, index}) => (
            <TouchableOpacity>
              <View style={styles.label}>
                <View style={styles.left}>
                  <FastImage
                    style={styles.image}
                    source={{
                      uri:
                        'http://app.hoplong.com/Content/Images/BaiViet/' +
                        item.ANH_BAI_VIET,
                    }}
                    resizeMode="stretch"
                  />
                </View>
                <View style={styles.right}>
                  <Text style={styles.title}>{item.TIEU_DE_BAI_VIET}</Text>
                  <Text style={styles.day}>
                    {moment(item.NGAY_DANG_BAI).format('DD/MM/YYYY')}
                  </Text>
                </View>
              </View>

              <View style={styles.bottom}>
                <Text style={styles.borderBottom}></Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.MA_BAI_VIET.toString()}
        />

        <View style={styles.flex}>
          <TouchableOpacity
            style={[
              styles.button,
              {backgroundColor: page <= 1 ? '#aaa' : '#2179A9'},
            ]}
            disabled={page <= 1}
            onPress={() => {
              setPage(page - 1);
            }}>
            <Icon name="ios-chevron-back" size={26} style={styles.icon} />
          </TouchableOpacity>

          <Text>&nbsp;&nbsp;</Text>
          <TouchableOpacity
            style={[
              styles.button,
              {backgroundColor: page > parseFloat(soBaiViet) / 15 ? '#aaa' : '#2179A9'},
            ]}
            onPress={() => {
              setPage(page + 1);
            }}>
            <Icon name="ios-chevron-forward" size={26} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  colorHeader: {
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: Platform.OS === 'ios' ? 0 : 0.2,
    backgroundColor: 'transparent',
    elevation: 1,
  },
  label: {
    marginVertical: 5,
    flexDirection: 'row',
    marginHorizontal:5,
  },
  bottom: {
    justifyContent: 'center',
    alignContent: 'center',
    top: -10,
    paddingHorizontal: 5,
  },
  day: {
    color: '#333',
    marginLeft: 10,
  },
  borderBottom: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
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

    marginLeft: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  icon: {
    color: '#fff',
  },
  title: {
    fontSize: 16,
  },
  subtitle: {
    fontSize: 15,
  },
  detail_image: {
    width: width,
    height: 300,
  },
  detail_table: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  detail_title: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  radius: {
    width: 44,
    height: 44,
    borderRadius: 50,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 5,
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

export default NotificationsScreen;
