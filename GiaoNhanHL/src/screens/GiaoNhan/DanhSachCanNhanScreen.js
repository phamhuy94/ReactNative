import React, { useEffect, useState } from 'react';
import { View, Text, Button, SafeAreaView, StyleSheet, FlatList } from 'react-native';
import { CheckBox } from 'native-base';
import { useDispatch, useSelector } from 'react-redux'
import { getListCanNhan,xacNhanGiaoHang } from '../../redux/GiaoNhan/action'

function DanhSachCanNhanScreen({ navigation }) {
    const dispatch = useDispatch();

    const listCanNhan = useSelector((store) => store.giaoNhan.listCanNhan);
    const listSelect = useSelector((store) => store.giaoNhan.listSelect);
    const slDaNhan = useSelector((store) => store.giaoNhan.slDaNhan);
    const loaiGiaoHang = useSelector((store) => store.giaoNhan.loaiGiaoHang);

    const press = (state, index) => {
        dispatch({
            type: 'SELECT_CAN_NHAN',
            MA_VACH: state.MA_VACH,
            isSelected: state.isSelected,
            loaiGiaoHang: state.LOAI
        });
    }

    const xacNhan = () => {
        dispatch(xacNhanGiaoHang(loaiGiaoHang,listSelect))
    }

    useEffect(() => {
        dispatch(getListCanNhan());
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={listCanNhan}
                renderItem={({ index, item }) => (
                    <View style={styles.item}>
                        <Text style={styles.header}>{item.MA_VACH}</Text>
                        <Text style={styles.header}>{item.TEN_CONG_TY}</Text>
                        <Text style={styles.header}>{item.HO_VA_TEN}({item.SDT})</Text>
                        {
                            slDaNhan > 0 ?
                                <CheckBox
                                    style={styles.checkbox}
                                /> :
                                <CheckBox
                                    style={styles.checkbox}
                                    onPress={() => press(item, index)}
                                    checked={item.isSelected}
                                />
                        }
                        {/* <CheckBox
                            style={styles.checkbox}
                            onPress={() => press(item, index)}
                            checked={item.isSelected}
                        /> */}
                        <FlatList
                            data={item.data}
                            renderItem={({ item }) =>
                                (
                                    <Text style={styles.title}>{item.DIA_CHI_GIAO_HANG}</Text>
                                )}
                            keyExtractor={(item2, index) => index.toString()}
                        />
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
            <Button title="Xác nhận giao hàng" onPress={() => xacNhan()} />
            <Button title="Quay lại" onPress={() => navigation.goBack()} />
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    item: {
        backgroundColor: "#f9f9f9",
        textAlign: 'center',
        borderWidth: 1,
        borderColor: "deepskyblue",
    },
    header: {
        fontSize: 24,
        color: "red",
        textAlign: 'center'
    },
    title: {
        fontSize: 16,
        textAlign: 'center'
    },
    checkbox: {
        textAlign: 'center'
    },
})
export default DanhSachCanNhanScreen