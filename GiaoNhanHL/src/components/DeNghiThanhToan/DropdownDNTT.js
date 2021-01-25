import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Picker, Form, Icon} from 'native-base';

const DropDownDNTT = ({page, setPage}) => {
  return (
    <Form style={styles.container}>
      <Picker
        mode="dropdown"
        iosHeader=""
        iosIcon={<Icon name="arrow-down" />}
        style={styles.picker}
        selectedValue={page}
        onValueChange={setPage}>
        <Picker.Item label="Cần Duyệt" value="canDuyet" />
        <Picker.Item label="Cần Thanh Toán" value="canThanhToan" />
        <Picker.Item label="Đã Thanh Toán" value="daThanhToan" />
        <Picker.Item label="Đã Hủy" value="daHuy" />
      </Picker>
    </Form>
  );
};

export default DropDownDNTT;
const styles = StyleSheet.create({
  container: {
   
  },
  picker: {
    color: '#000',
    width: 200,
  },
});
