import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  FlatList,
  ScrollView,
  Button,
  TouchableOpacity,
  Dimensions,
  Platform,
  SafeAreaView,
} from 'react-native';
import {getApiTamUng, getApiDemDonTamUng} from '../../redux/tamUng/action';
import Pagination from './pagination';
import Icon from 'react-native-vector-icons/Ionicons';
import TamUngTask from './tamUngTask';
import TamUngTable from './tamUngTable';
import { Row } from 'native-base';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const ListTamUng = ({body, showList}) => {
  const dispatch = useDispatch();
  const listTamUng = useSelector((store) => store.tamUng.listTamUng);
  const countTamUng = useSelector((store) => store.tamUng.countTamUng);
  const [sotrang, setSoTrang] = useState(body.sotrang);
  const [refreshing, setRefreshing] = useState(false);
  body.sotrang = sotrang;

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
    dispatch(getApiTamUng(body));
  }, [body]);

  useEffect(() => {
    dispatch(getApiTamUng(body));
    dispatch(getApiDemDonTamUng(body));
  }, [body, sotrang]);
  return (
    <View style={styles.container}>
      <View style={styles.scrollView}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
          

        {
          showList ? (
            <TamUngTable data={listTamUng} body={body}/>
          ) : (
            <TamUngTask data={listTamUng} body={body}/>
          )
        }
        <View style={styles.page}>
        <Pagination
          sotrang={sotrang}
          onPressAdd={() => setSoTrang(sotrang + 1)}
          onPressSub={() => setSoTrang(sotrang - 1)}
          totalItem={countTamUng}
        />
        </View>
        
      </ScrollView>
      </View>
    </View>
  );
};

export default ListTamUng;
const height = Dimensions.get('window').height; //full height
const styles = StyleSheet.create({
  container: {
  //  flex:1,
  },
  scrollView: {
    height:height * 0.8,
  },
  btnList: {
    marginHorizontal:15,
    marginBottom:10,
    flexDirection:'row',
    justifyContent:'flex-end',
    right:20
  },
  page: {
    alignContent:'center',
    flexDirection:'row',
    alignItems:'center',
    alignSelf:'center',
    height:60
  }
});
