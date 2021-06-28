import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Item from './item';

const TamUngTask = ({data, body}) => {
    return (
        <FlatList
          data={data}
          renderItem={({item, index}) => (
            <View style={{flex: 1}}>
              <Item data={item} body={body} />
            </View>
          )}
        />
    )
};

export default TamUngTask;