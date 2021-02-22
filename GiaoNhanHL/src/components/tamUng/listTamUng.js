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
  Platform,
  SafeAreaView
} from 'react-native';
import {
  getApiTamUng,
  getApiDemDonTamUng,
} from '../../redux/tamUng/action';
import Item from '../../components/tamUng/item';
import Pagination from './pagination';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const ListTamUng = ({body}) => {
  const dispatch = useDispatch();
  const listTamUng = useSelector((store) => store.tamUng.listTamUng);
  const countTamUng = useSelector((store) => store.tamUng.countTamUng);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
    dispatch(getApiTamUng(body));
  }, []);

  useEffect(() => {
    dispatch(getApiTamUng(body));
    dispatch(getApiDemDonTamUng(body));
  }, [body]);
    // console.log(listTamUng);
  //   console.log(countTamUng);
  return (
    <View
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <FlatList
          data={listTamUng}
          renderItem={({item, index}) => <Item data={item} body={body} />}
        />
        <Pagination />
    </View>
  );
};

export default ListTamUng;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
