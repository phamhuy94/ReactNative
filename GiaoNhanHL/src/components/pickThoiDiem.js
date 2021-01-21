import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Picker, Form, Icon} from 'native-base';

const PickThoiDiem = ({day, setDay}) => {
  return (
    <Form style={styles.container}>
      <Picker
        mode="dropdown"
        iosHeader=""
        iosIcon={<Icon name="arrow-down" />}
        style={styles.picker}
        selectedValue={day}
        onValueChange={setDay}>
        <Picker.Item label="Cả ngày" value="Cả ngày" />
        <Picker.Item label="Sáng" value="Sáng" />
        <Picker.Item label="Chiều" value="Chiều" />
      </Picker>
    </Form>
  );
};
export default PickThoiDiem;
const styles = StyleSheet.create({
    container: {
        flex: 1,
      
    },
  picker: {
    color: '#000',
    width:150,
  },
});
