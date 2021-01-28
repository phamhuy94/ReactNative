import React from 'react';
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
} from 'react-native';

import {Appbar} from 'react-native-paper';
// import Icon from 'react-native-vector-icons/FontAwesome5'
import {Tile, List, ListItem, Card, Icon} from 'react-native-elements';
import FastImage from 'react-native-fast-image';

export default function ViewDetail({data}) {
  const state = data;
  var date = new Date(state.NGAY_SINH);

  let day = '';
  let month = '';
  if (date.getDate() < 10) {
    day = '0' + date.getDate();
  } else {
    day = date.getDate();
  }

  if (date.getMonth() + 1 < 10) {
    month = '0' + (date.getMonth() + 1);
  } else {
    month = date.getMonth() + 1;
  }
  state.NGAY_SINH_CONVERT = day + '/' + month + '/' + date.getFullYear();

  return (
    <View>
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <Card containerStyle={styles.cardContainer}>
            <View style={styles.headerContainer}>
              <ImageBackground
                style={styles.headerBackgroundImage}
                blurRadius={10}
                source={{
                  uri:
                    'https://www.pixel4k.com/wp-content/uploads/2018/11/sea-waves-blur-4k_1541114602.jpg',
                }}>
                <View style={styles.headerColumn}>
                  <FastImage
                    style={styles.userImage}
                    source={{
                      uri:
                        'http://sales.hoplong.com/Content/Images/Avatar/' +
                        state.AVATAR,
                    }}
                  />
                  <Text style={styles.userNameText}>{state.HO_VA_TEN}</Text>
                  <View style={styles.userAddressRow}>
                    <View>
                      <Icon
                        name="place"
                        underlayColor="transparent"
                        iconStyle={styles.placeIcon}
                      />
                    </View>
                    <View style={styles.userCityRow}>
                      <Text style={styles.userCityText}>
                        {state.CHUC_VU}-{state.TEN_PHONG_BAN}
                      </Text>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </View>
            <View style={[style2.container, styles.telContainer]}>
              <View style={style2.iconRow}>
                <Icon
                  name="call"
                  underlayColor="transparent"
                  iconStyle={style2.telIcon}
                />
              </View>
              <View style={style2.telRow}>
                <View style={style2.telNumberColumn}>
                  <Text style={style2.telNumberText}>{state.SDT}</Text>
                </View>
              </View>
              <View style={style2.smsRow}>
                <Icon
                  name="textsms"
                  underlayColor="transparent"
                  iconStyle={style2.smsIcon}
                />
              </View>
            </View>
            <View style={style4.container}>
              <View style={style4.separatorOffset} />
              <View style={style4.separator} />
            </View>
            <View style={[style3.container, styles.emailContainer]}>
              <View style={style3.iconRow}>
                <Icon
                  name="email"
                  underlayColor="transparent"
                  iconStyle={style3.emailIcon}
                />
              </View>
              <View style={style3.emailRow}>
                <View style={style3.emailColumn}>
                  <Text style={style3.emailText}>{state.EMAIL}</Text>
                </View>
                <View style={style3.emailNameColumn}>
                  {/* <Text style={style3.emailNameText}>Personal</Text> */}
                </View>
              </View>
            </View>
            <View style={style4.container}>
              <View style={style4.separatorOffset} />
              <View style={style4.separator} />
            </View>
            <View style={[style3.container, styles.emailContainer]}>
              <View style={style3.iconRow}>
                <Icon
                  name="cake"
                  underlayColor="transparent"
                  iconStyle={style3.emailIcon}
                />
              </View>
              <View style={style3.emailRow}>
                <View style={style3.emailColumn}>
                  <Text style={style3.emailText}>
                    {state.NGAY_SINH_CONVERT}
                  </Text>
                </View>
                <View style={style3.emailNameColumn}>
                  {/* <Text style={style3.emailNameText}>Personal</Text> */}
                </View>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}

const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height

const styles = StyleSheet.create({
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
    paddingTop: 45,
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

const style3 = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 25,
  },
  emailColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  emailIcon: {
    color: '#2179A9',
    fontSize: 30,
  },
  emailNameColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  emailNameText: {
    color: '#2179A9',
    fontSize: 14,
    fontWeight: '200',
  },
  emailRow: {
    flex: 8,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  emailText: {
    fontSize: 16,
  },
  iconRow: {
    flex: 2,
    justifyContent: 'center',
  },
});

const style2 = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 25,
  },
  iconRow: {
    flex: 2,
    justifyContent: 'center',
  },
  smsIcon: {
    color: '#2179A9',
    fontSize: 30,
  },
  smsRow: {
    flex: 2,
    justifyContent: 'flex-start',
  },
  telIcon: {
    color: '#2179A9',
    fontSize: 30,
  },
  telNameColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  telNameText: {
    color: '#2179A9',
    fontSize: 14,
    fontWeight: '200',
  },
  telNumberColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  telNumberText: {
    fontSize: 16,
  },
  telRow: {
    flex: 6,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

const style4 = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  separatorOffset: {
    flex: 2,
    flexDirection: 'row',
  },
  separator: {
    borderColor: '#EDEDED',
    borderWidth: 0.8,
    flex: 8,
    flexDirection: 'row',
  },
});
