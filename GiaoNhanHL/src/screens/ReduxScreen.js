import React, { useCallback } from 'react'
import { Alert, Button, Text, TextInput, View,Dimensions,SafeAreaView,TouchableOpacity,
    StyleSheet,
    ScrollView,
    StatusBar,
    FlatList,
    Image,
    ImageBackground } from 'react-native';
import {useDispatch,useSelector} from 'react-redux'
import {addTodo} from '../redux/todos/action'
import store from '../redux'

export default function ReduxScreen(){
    const dispatch = useDispatch();
    const todos = useSelector((store) => store.todos.todos);

    const _addTodo = useCallback(() =>{
        dispatch(addTodo('aaaa'));
    },[dispatch])

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={todos}
                renderItem={({ item }) => (
                    <View style={styles.right}>
                        <Text style={styles.title}>{item.text}</Text>
                    </View>
                )}
                keyExtractor={item => item.id.toString()}
            />
            <Button
            title="Add"
            titleColor="white"
            onPress={_addTodo}>
            </Button>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})