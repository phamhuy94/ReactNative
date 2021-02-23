import React, {useState, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Card} from 'react-native-elements';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  getApiDeleteTamUng,
  getApiTamUng,
  getApiDemDonTamUng,
} from '../../redux/tamUng/action';

const Item = ({data, body}) => {
  const dispatch = useDispatch();
  const [textShow, setTextShow] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);
  const toggleNumberOfLines = () => {
    setTextShow(!textShow);
  };
  const onTextLayout = useCallback((e) => {
    setLengthMore(e.nativeEvent.lines.length >= 4);
  }, []);

  const deleteTamUng = (id, body) => {
    dispatch(getApiDeleteTamUng(id, body));
  };

  const checkStatus = (
    DA_DUYET,
    DA_THANH_TOAN,
    TRUONG_PHONG_DA_DUYET,
    TRUONG_PHONG_HUY_DUYET,
    DA_HUY,
    MA_SO_DN,
  ) => {
    if (
      DA_THANH_TOAN === false &&
      ((TRUONG_PHONG_DA_DUYET === false && TRUONG_PHONG_HUY_DUYET === true) ||
        (DA_DUYET === false && DA_HUY === true) ||
        (TRUONG_PHONG_DA_DUYET === true && DA_HUY === true))
    ) {
      return (
        <View>
          <Text style={styles.colorRed}>Đã hủy</Text>
        </View>
      );
    } else if (DA_THANH_TOAN === true) {
      return (
        <View>
          <Text style={styles.colorGreen}>Đã thanh toán</Text>
        </View>
      );
    } else if (
      DA_THANH_TOAN === false &&
      TRUONG_PHONG_DA_DUYET === true &&
      TRUONG_PHONG_HUY_DUYET == false &&
      DA_DUYET == true &&
      DA_HUY == false
    ) {
      return (
        <View>
          <Text style={styles.colorBlue}>Cần thanh toán</Text>
        </View>
      );
    } else
      return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: '#111'}}>Cần duyệt</Text>
          <View style={{marginLeft: 200}}>
            <TouchableOpacity
              onPress={() => deleteTamUng(MA_SO_DN, body)}
              style={styles.iconStatusWait}>
              <Text style={{color: '#fff'}}>Xóa</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
  };
  return (
    <View style={styles.card}>
      <View style={styles.position}>
        <Icon name="ios-time-sharp" size={24} style={styles.icon} />
        <Text>{moment(data.NGAY_DE_NGHI).format('DD/MM/YYYY')}</Text>
      </View>
      <View style={styles.flex}>
        <Icon name="ios-logo-usd" size={24} style={styles.icon} />

        <Text style={styles.wrap}>{`${data.SO_TIEN_DE_NGHI.toString().replace(
          /(\d)(?=(\d\d\d)+(?!\d))/g,
          '$1,',
        )} đ`}</Text>
      </View>
      <View style={styles.flex}>
        <Icon name="ios-file-tray-full-sharp" size={24} style={styles.icon} />
        <Text style={styles.wrap}>{`${data.SO_TIEN_BANG_CHU} đồng`}</Text>
      </View>
      <View style={styles.flex}>
        <Icon name="ios-document-text" size={24} style={styles.icon} />
        <View>
          <Text
            onTextLayout={onTextLayout}
            numberOfLines={textShow ? undefined : 4}
            style={styles.wrap}>
            {data.LY_DO_DN}
          </Text>
          {lengthMore ? (
            <Text
              onPress={toggleNumberOfLines}
              style={[
                styles.text,
                {
                  marginRight: 30,
                },
              ]}>
              {textShow ? '...Đóng' : '...Xem thêm'}
            </Text>
          ) : null}
        </View>
      </View>
      <View style={styles.flex}>
        <Icon name="ios-warning" size={24} style={styles.icon} />
        <View style={styles.icon}>
          {checkStatus(
            data.DA_DUYET,
            data.DA_THANH_TOAN,
            data.TRUONG_PHONG_DA_DUYET,
            data.TRUONG_PHONG_HUY_DUYET,
            data.DA_HUY,
            data.MA_SO_DN,
          )}
        </View>
      </View>
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
    alignContent: 'center',

    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  icon: {
    marginRight: 5,
    color: '#2179A9',
  },
  position: {
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  wrap: {
    flexWrap: 'wrap',
    flexShrink: 1,
    marginRight: 25,
  },
  iconStatusWait: {
    color: '#fff',
    borderRadius: 10,
    width: 40,
    borderWidth: 1,
    padding: 5,
    backgroundColor: '#2179A9',
    borderColor: '#2179A9',
  },
  text: {
    textAlign: 'center',
    justifyContent: 'center',
    color: '#2179A9',
    fontStyle: 'italic',
    marginTop: 10,
  },
  colorRed: {
    color: 'red',
  },
  colorGreen: {
    color: 'green',
  },
  colorBlue: {
    color: 'blue',
  },
});
