import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

const NghiPhepTask = ({data, checkIcon}) => {
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
                item.MA_SO_XIN_NGHI,
                item.NGAY_LAM_DON,
              )}
            </View>
          </Card.Title>

          <View style={styles.flex}>
            <Icon name="ios-bookmark-sharp" size={24} style={styles.icon} />
            <Text style={styles.textHeader}>{item.LOAI_NGHI_PHEP}</Text>
          </View>
          <View style={styles.flex}>
            <Icon name="ios-time" size={24} style={styles.icon} />
            <Text style={styles.textHeader}>{item.THOI_GIAN_NGHI}</Text>
          </View>
          <View style={styles.flex}>
            <Icon name="md-alert-circle" size={24} style={styles.icon} />
            <Text style={styles.textHeader}>{item.TONG_SO_NGAY_NGHI}</Text>
          </View>
          <View style={styles.flex}>
            <Icon name="ios-reader" size={24} style={styles.icon} />
            <Text style={styles.textHeader}>{item.LY_DO_XIN_NGHI}</Text>
          </View>
        </View>
      )}
    />
  );
};

export default NghiPhepTask;
const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
  },
  card: {
    marginTop: 0,
    margin: 15,
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: Platform.OS === 'ios' ? '#ccc' : 'transparent',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 5.25,
    shadowRadius: 3.84,
    elevation: 6,
  },
  icon: {
    marginRight: 5,
    color: '#2179A9',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textHeader: {
    color: '#444',
    fontSize: 16,
    flexShrink: 1,
  },
});
