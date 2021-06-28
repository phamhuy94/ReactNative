import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

const XacNhanTask = ({data, checkIcon}) => {
  return (
    <FlatList
      data={data}
      renderItem={({item, index}) => (
        <View style={styles.card}>
          <Card.Title style={styles.flex}>
            <View style={styles.icon}>
              {checkIcon(
                item.TRUONG_PHONG_DA_DUYET,
                item.TRUONG_PHONG_HUY_DUYET,
                item.MA_SO_XAC_NHAN,
                item.NGAY_LAM_DON,
              )}
            </View>
          </Card.Title>
          <View style={styles.flex}>
            <Icon name="ios-reader" size={24} style={styles.icon} />
            <Text style={styles.textHeader}>{item.NOI_DUNG_CAN_XAC_NHAN}</Text>
          </View>
          {item.LY_DO_HUY ? (
            <View style={styles.flex}>
              <Icon name="ios-time" size={24} style={styles.icon} />
              <Text style={styles.textHeader}>{item.LY_DO_HUY}</Text>
            </View>
          ) : (
            <Text></Text>
          )}

          <View style={styles.flex}>
            <Icon name="ios-time" size={24} style={styles.icon} />
            <Text style={styles.textHeader}>{item.NGAY_CAN_XAC_NHAN}</Text>
          </View>
        </View>
      )}
    />
  );
};

export default XacNhanTask;
const styles = StyleSheet.create({
  card: {
    marginTop: 0,
    margin: 15,
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: Platform.OS === 'ios' ? '#ccc' : 'transparent',
    shadowOpacity: 5.25,
    shadowRadius: 3.84,
    elevation: 6,
  },
  flex: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 5,
    color: '#2179A9',
  },
  textHeader: {
    color: '#444',
    fontSize: 16,
    flexShrink: 1,
  },
});
