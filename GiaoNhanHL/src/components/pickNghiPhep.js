import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Picker, Form, Icon} from 'native-base';

const PickNghiPhep = ({loaiNghiPhep, setLoaiNghiPhep}) => {
  return (
    <Form style={styles.container}>
      <Picker
        mode="dropdown"
        iosHeader="Chọn loại ngày nghỉ"
        iosIcon={<Icon name="arrow-down" />}
        style={styles.picker}
        selectedValue={loaiNghiPhep}
        onValueChange={setLoaiNghiPhep}>
        <Picker.Item label="Nghỉ thường" value="Nghỉ thường" />
        <Picker.Item label="Nghỉ ốm nằm viện/sinh con" value="Nghỉ ốm nằm viện/sinh con" />
        <Picker.Item label="Nghỉ hiếu/hỷ" value="Nghỉ hiếu/hỷ" />
      </Picker>
    </Form>
  );
};
export default PickNghiPhep;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
  picker: {
    color: '#000',
  },
});
