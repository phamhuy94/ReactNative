import React, {useEffect, useState, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getKPI} from '../redux/user/action';
import DatePicker from '../components/datePicker';
import moment from 'moment';
import {Text, View, StyleSheet, FlatList, ScrollView} from 'react-native';
import {Appbar} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

export default function ViewKPI() {
  const dispatch = useDispatch();
  const KPI = useSelector((store) => store.user.KPI);
  const [macongty, setMaCongTy] = useState('HOPLONG');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  //lay username
  const [username, setUsername] = useState('WALO040_HL');
  //   const getToken = async () => {
  //     const username = await AsyncStorage.getItem('userToken');
  //     setUsername(username);
  //   };
  //   useEffect(() => {
  //     getToken();
  //   }, []);

  useEffect(() => {
    dispatch(getKPI(macongty, username, startDate, endDate));
  }, [username, startDate, endDate]);

  //   useEffect(() => {
  //     dispatch(getKPI(dateTime))
  // }, [dateTime])

  //   const data = useMemo(() => {
  //       if(timeSheet.length == 0) {
  //           return null;
  //       }
  //       return timeSheet
  //   }, [timeSheet]);
  //   if(data === null) return null

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.colorHeader}>
      <Appbar.Action
        icon="link-box-outline"
        color={'#2179A9'}
        size={30}
       
      />
        <Appbar.Content title="KPI" color={'#2179A9'} style={{marginLeft: -15}}/>

      </Appbar.Header>
   
      <View style={styles.flex}>
      <ScrollView style={{flex:2}}>
  
      <View style={styles.flexDate}>
          <DatePicker
            onPress={(text) => setStartDate(text)}
            maxDate={new Date()}
            style={styles.datepicker}
          />

          <DatePicker
            onPress={(text) => setEndDate(text)}
            maxDate={new Date()}
            style={styles.datepicker}
          />
        </View> 
        <FlatList
 
          data={KPI}
          renderItem={({item, index}) => (
            <View style={styles.homeLayout}>
              <Text style={styles.textHeader}>{item.HO_VA_TEN}</Text>
              <View style={styles.timesheet}>
                <Text style={styles.title}>Số ngày đi giao</Text>
                <Text style={styles.value}>{item.SL_NGAY_DI_GIAO}</Text>
              </View>
              <View style={styles.timesheet}>
                <Text style={styles.title}>Số ngày đi giao xe máy</Text>
                <Text style={styles.value}>{item.SL_NGAY_DI_GIAO_XE_MAY}</Text>
              </View>
              <View style={styles.timesheet}>
                <Text style={styles.title}>Số ngày đi giao ô tô</Text>
                <Text style={styles.value}>{item.SL_NGAY_DI_GIAO_O_TO}</Text>
              </View>
              <View style={styles.timesheet}>
                <Text style={styles.title}>Số ngày đi giao Samsung</Text>
                <Text style={styles.value}>{item.SL_NGAY_DI_GIAO_SAMSUNG}</Text>
              </View>
              <View style={styles.timesheet}>
                <Text style={styles.title}>Số ngày đi giao khác</Text>
                <Text style={styles.value}>{item.SL_NGAY_DI_GIAO_KHAC}</Text>
              </View>
              <Text style={styles.border}></Text>
              <View style={styles.timesheet}>
                <Text style={styles.title}>Số đơn đi giao xe máy</Text>
                <Text style={styles.value}>{item.SL_DON_DI_GIAO_XE_MAY}</Text>
              </View>
              <View style={styles.timesheet}>
                <Text style={styles.title}>Số đơn đi giao ô tô</Text>
                <Text style={styles.value}>{item.SL_DON_DI_GIAO_O_TO}</Text>
              </View>
              <View style={styles.timesheet}>
                <Text style={styles.title}>Số đơn đi giao Samsung</Text>
                <Text style={styles.value}>{item.SL_DON_DI_GIAO_SAMSUNG}</Text>
              </View>
              <View style={styles.timesheet}>
                <Text style={styles.title}>Số đơn đi giao khác</Text>
                <Text style={styles.value}>{item.SL_DON_DI_GIAO_KHAC}</Text>
              </View>
              <View style={styles.timesheet}>
                <Text style={styles.title}>Số đơn đã giao</Text>
                <Text style={styles.value}>{item.SL_DON_DA_GIAO}</Text>
              </View>
              <View style={styles.timesheet}>
                <Text style={styles.title}>Số đơn đi lấy</Text>
                <Text style={styles.value}>{item.SL_DON_DI_LAY}</Text>
              </View>
              <View style={styles.timesheet}>
                <Text style={styles.title}>Số đơn giao ngoài giờ</Text>
                <Text style={styles.value}>{item.SL_DON_GIAO_NGOAI_GIO}</Text>
              </View>

              <View style={styles.timesheet}>
                <Text style={styles.title}>Số đơn đi giao + lấy</Text>
                <Text style={styles.value}>{item.TONG_SL_DON}</Text>
              </View>
              <View style={styles.timesheet}>
                <Text style={styles.title}>Số lượng đơn tối thiểu</Text>
                <Text style={styles.value}>{item.SL_DON_TOI_THIEU}</Text>
              </View>
              <View style={styles.timesheet}>
                <Text style={styles.title}>Số lượng đơn vượt thưởng</Text>
                <Text style={styles.value}>{item.SL_DON_VUOT_THUONG}</Text>
              </View>
              <View style={styles.timesheet}>
                <Text style={styles.title}>Hiệu suất</Text>
                <Text style={styles.value}>
                  {(item.TONG_SL_DON / item.SL_DON_TOI_THIEU).toFixed(2)}
                </Text>
              </View>
              <View style={styles.timesheet}>
                <Text style={styles.title}>Số km</Text>
                <Text style={styles.value}>{item.SO_KM}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item2, index) => index.toString()}
        />
      </ScrollView>
      </View>
 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#f0f2f2',
},
  flex: {
    flex:20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: '#000',
  },
  flexDate: {
 
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  colorHeader: {
    shadowColor: '#000',
    
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: 0.2,
    backgroundColor: 'transparent',
    elevation: 1,
  },
  textHeader: {
    color: '#2179A9',
    width: '100%',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 18,
  },
  homeLayout: {
    margin: 15,
    flex:1,
    marginBottom: 15,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor:'#f4f4f4',
    shadowOffset: {width: 2, height: 5},
    borderColor:'#eee',
    shadowColor: '#ddd',
    borderWidth:1,
    shadowOpacity: 0.8,
    elevation: 4,
  },
  datepicker: {

    color: '#444',
  },
  timesheet: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    textTransform: 'capitalize',
    color: '#444',
    fontSize: 16,
  },
  value: {
    color: '#444',
    fontSize: 16,
    flex: 3,
    flexWrap: 'wrap',
    textAlign: 'right',
  },
  valueGhichu: {
    color: '#000',
    fontSize: 16,
  },
  border: {
  
    borderBottomColor:'#2179A9',
    borderBottomWidth: 1,
    flex: 1,
    width:200,
    textAlign:'center',
    alignItems:'center',
    justifyContent:'center',
    top:-10,
    alignSelf: 'center',
    flexDirection:'row',
    marginHorizontal: 'auto',
    marginVertical:0,
  },
});
