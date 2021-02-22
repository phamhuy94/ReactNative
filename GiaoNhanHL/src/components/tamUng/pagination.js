import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Pagination = ({sotrang, onPressAdd, onPressSub, totalItem}) => {
    return (
        <View style={styles.flexCenter}>
          <TouchableOpacity
            style={[
              styles.button,
              {backgroundColor: sotrang <= 1 ? '#aaa' : '#2179A9'},
            ]}
            disabled={sotrang <= 1}
            onPress={onPressSub}>
            <Icon name="ios-chevron-back" size={24} style={styles.iconPage} />
          </TouchableOpacity>
          <Text>&nbsp;&nbsp;</Text>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor:
                  sotrang > parseFloat(totalItem) / 15
                    ? '#aaa'
                    : '#2179A9',
              },
            ]}
            disabled={sotrang > parseFloat(totalItem) / 15}
            onPress={onPressAdd}>
            <Icon
              name="ios-chevron-forward"
              size={24}
              style={styles.iconPage}
            />
          </TouchableOpacity>
        </View>
    )
};

export default Pagination;

const styles = StyleSheet.create({
    flexCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'space-between',
      },
    button: {
        width: 40,
        height: 40,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
      },
    iconPage: {
        color: '#fff',
      },
})