import React, { useEffect, useState } from 'react';
import { View, Text, Button, SafeAreaView, StyleSheet, FlatList,TextInput, Alert } from 'react-native';
import Modal from 'react-native-modal';
import { CheckBox } from 'native-base';
import { useDispatch, useSelector } from 'react-redux'
import { ReactNativeNumberFormat } from '../../components/FormatNumber'
import { Picker } from '@react-native-community/picker';
import AsyncStorage from '@react-native-community/async-storage';
import { getListDaNhan,noteNoiDung } from '../../redux/GiaoNhan/action'

const listSuCo = ['Sai mã', 'Thiếu mã', 'Thừa mã']

function DanhSachDaNhanScreen({ navigation }) {
    const dispatch = useDispatch();

    const [username,setUsername] = useState();
    const [isModalVisible, setModalVisible] = useState(false);
    const [selected, setSelected] = useState("");
    const [suCo, setSuCo] = useState('Sai mã');
    const [noiDungSuCo, setNoiDungSuCo] = useState();

    const listDaNhan = useSelector((store) => store.giaoNhan.listDaNhan);
    const listSelectDaNhan = useSelector((store) => store.giaoNhan.listSelectDaNhan);

    const toggleModal = (state) => {
        setSelected(state.SO_CHUNG_TU)
        setModalVisible(!isModalVisible);
    };

    const pressNoteNoiDung = async () => {
        if(suCo === "" || suCo === undefined){
            Alert.alert("Chưa chọn loại sự cố")      
            return    
        }
        if(noiDungSuCo === "" || noiDungSuCo === undefined){
            Alert.alert("Chưa điền nội dung sự cố")   
            return        
        }
        let dataSuCo = {
            SO_CHUNG_TU: selected,
            NOI_DUNG_GHI_CHU: noiDungSuCo,
            SU_CO: suCo,
            NGUOI_GHI_CHU: username
        }
        const response = await dispatch(noteNoiDung(dataSuCo))
        if(response.indexOf("Thành công")>=0){
            Alert.alert(response)
            setModalVisible(false)
            setSuCo('Sai mã')
            setNoiDungSuCo('')
        }else{
            Alert.alert("Note thất bại")
        }
    }

    const press = (state) => {
        if(listSelectDaNhan.length === 0){
            dispatch({
                type: 'SELECT_DA_NHAN',
                state: state
            });
        }else{
            if(listSelectDaNhan[0].TEN_CONG_TY === state.TEN_CONG_TY){
                dispatch({
                    type: 'SELECT_DA_NHAN',
                    state: state
                });
            }else{
                Alert.alert("Bạn không thể gộp 2 khách hàng khác nhau")
            }
        }
        
    }

    const getToken = async () => { 
        const username = await AsyncStorage.getItem('userToken');
        setUsername(username)
    }

    useEffect(() => {
        dispatch(getListDaNhan());
        getToken()
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={listDaNhan}
                renderItem={({ index, item }) => (
                    <View style={styles.item}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.header}>{item.SO_CHUNG_TU}</Text>
                            <CheckBox
                                style={styles.checkbox}
                                onPress={() => press(item)}
                                checked={item.isSelected}
                            />
                        </View>

                        <Text style={styles.header}>{item.TEN_CONG_TY}</Text>
                        <Text style={styles.header}>{item.DIA_CHI_GIAO_HANG}</Text>
                        {
                            item.LOAI === 'GIAO_HANG' ?
                                (
                                    <View>
                                        <Text style={styles.header}>{item.HINH_THUC_THANH_TOAN}</Text>
                                        {
                                            item.HINH_THUC_THANH_TOAN === 'Tiền mặt' &&
                                            (
                                                <ReactNativeNumberFormat string="Tổng tiền:" value={item.TONG_TIEN} />
                                            )
                                        }
                                    </View>

                                ) :
                                (
                                    <View>
                                        <Text style={styles.header}>Đại diện: {item.NOI_LAY_HANG}</Text>
                                        <ReactNativeNumberFormat string="Tổng tiền:" value={item.TONG_TIEN} />
                                    </View>

                                )
                        }
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.header}>{item.GHI_CHU}</Text>
                            <Button style={styles.note} title="Note" onPress={() => toggleModal(item)} />
                        </View>

                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
            <View style={{ flexDirection: 'row' }}>
            <Button title="Tạo ĐNTT" onPress={() =>
                    navigation.navigate('Đề nghị thanh toán', {
                        listSelectDaNhan: listSelectDaNhan,
                    })
                } />
                <Button title="Xác nhận" onPress={() =>
                    navigation.navigate('Xác nhận giao hàng', {
                        listSelectDaNhan: listSelectDaNhan,
                    })
                } />
                <Button title="Quay lại" onPress={() => navigation.goBack()} />
            </View>           
            <Modal isVisible={isModalVisible}>
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <Picker
                        selectedValue={suCo}
                        onValueChange={setSuCo}
                    >
                        {listSuCo.map((item, index) => {
                            return (<Picker.Item label={item} value={item} key={index} />)
                        })}
                    </Picker>
                    <TextInput
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={setNoiDungSuCo}
                    value={noiDungSuCo}
                    placeholder="Nhập nội dung sự cố"
                    placeholderTextColor="black"/>
                    <Button title="Lưu" onPress={() => pressNoteNoiDung()} />
                    <Button title="Đóng" onPress={toggleModal} />
                </View>
            </Modal>
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
        fontSize: 14,
        color: "red",
    },
    title: {
        fontSize: 8,
        textAlign: 'center'
    },
    checkbox: {
        flexDirection: 'row'
    },
    note: {
        width: 20,
        backgroundColor: 'red'
    }
})
export default DanhSachDaNhanScreen