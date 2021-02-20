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
} from 'react-native';
import {
  getApiTamUng,
  getApiDemDonTamUng,
  getApiDeleteTamUng,
} from '../../redux/tamUng/action';
import Item from '../../components/tamUng/item';

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
  //   console.log(listTamUng);
  //   console.log(countTamUng);
  return (
    <View >
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <FlatList
          data={listTamUng}
          renderItem={({item, index}) => <Item data={item} />}
        />
      </ScrollView>
    </View>
  );
};

export default ListTamUng;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
