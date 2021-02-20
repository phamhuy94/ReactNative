import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Card} from 'react-native-elements';
const Item = ({data}) => {
//   console.log(data);
  return (
    <View style={styles.card}>
      <Card.Title style={styles.flex}>
        <View style={styles.icon}>
            <Text>{data.NGAY_DE_NGHI}</Text>
            <Text>{data.SO_TIEN_DE_NGHI}</Text>
            <Text>{data.SO_TIEN_BANG_CHU}</Text>
            <Text>{data.LY_DO_DN}</Text>
            <Text>Trạng thái</Text>
        </View>
      </Card.Title>
    </View>
  );
};

export default Item;
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
});
