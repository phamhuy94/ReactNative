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

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const ListTamUng = ({body}) => {
  const dispatch = useDispatch();
  const listTamUng = useSelector((store) => store.tamUng.listTamUng);
  const countTamUng = useSelector((store) => store.tamUng.countTamUng);
  const [sotrang, setSoTrang] = useState(body.sotrang);
  const [refreshing, setRefreshing] = useState(false);
  const [showList, setShowList] = useState(false);
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
          <View style={{marginHorizontal:15}}>
          <TouchableOpacity
          style={styles.btnEye}
          onPress={() => setShowList(!showList)}>
            {showList ? (  <Icon
            name={'ios-grid-outline'}
        
            size={22}
            color={'#2179A9'}
          />) : (  <Icon
            
            name={'ios-list-outline'}
            size={22}
            color={'#2179A9'}
          />)}
          </TouchableOpacity>
          </View>

        {
          showList ? (
            <TamUngTable data={listTamUng} body={body}/>
          ) : (
            <TamUngTask data={listTamUng} body={body}/>
          )
        }
        <Pagination
          sotrang={sotrang}
          onPressAdd={() => setSoTrang(sotrang + 1)}
          onPressSub={() => setSoTrang(sotrang - 1)}
          totalItem={countTamUng}
        />
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
    height:height * 0.82,
  }
});
