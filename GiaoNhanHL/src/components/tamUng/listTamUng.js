import React, {useState, useEffect} from 'react';
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
    Platform
  } from 'react-native';
import {
  getApiTamUng,
  getApiDemDonTamUng,
  getApiDeleteTamUng,
} from '../../redux/tamUng/action';
import Item from '../../components/tamUng/item';

const ListTamUng = ({body}) => {
  const dispatch = useDispatch();
  const listTamUng = useSelector((store) => store.tamUng.listTamUng);
  const countTamUng = useSelector((store) => store.tamUng.countTamUng);
  useEffect(() => {
    dispatch(getApiTamUng(body));
    dispatch(getApiDemDonTamUng(body));
  }, [body]);
  const deleteTamUng = async (id) => {
    await dispatch(getApiDeleteTamUng(id));
  };
//   console.log(listTamUng);
//   console.log(countTamUng);
  return (
    <View>
      <ScrollView>
          <FlatList
            data={listTamUng}
            renderItem={({item, index}) => (
                <Item
                    data={item}
                />
            )}
          />
      </ScrollView>
    </View>
  );
};

export default ListTamUng;