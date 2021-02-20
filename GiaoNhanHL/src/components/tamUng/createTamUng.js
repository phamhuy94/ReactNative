import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';

const CreateTamUng = ({navigation}) => {
    return (
        <View>
          <Appbar.Header style={styles.colorHeader}>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Content
              title="Tạo đơn tạm ứng"
              color={'#2179A9'}
              style={{marginLeft: -15}}></Appbar.Content>
          </Appbar.Header>
        </View>
    )
};

export default CreateTamUng;
const styles = StyleSheet.create({
    colorHeader: {
        shadowColor: '#000',
        shadowOffset: {width: 1, height: 3},
        shadowOpacity: Platform.OS === 'ios' ? 0 : 0.2,
        backgroundColor: 'transparent',
        elevation: 1,
      },
})