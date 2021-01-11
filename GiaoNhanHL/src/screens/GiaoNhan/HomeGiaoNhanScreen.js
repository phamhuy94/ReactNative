import React, { useEffect} from 'react';
import { Button,SafeAreaView,StyleSheet} from 'react-native';

import {useDispatch,useSelector} from 'react-redux'
import {getCanNhan,getDaNhan} from '../../redux/GiaoNhan/action'

function HomeGiaoNhanScreen({ navigation }) {
    const dispatch = useDispatch();

    const slCanNhan = useSelector((store) => store.giaoNhan.slCanNhan);
    const slDaNhan = useSelector((store) => store.giaoNhan.slDaNhan);

    const titleCanNhan = "Cần nhận (" + slCanNhan + ")"
    const titleDaNhan = "Đang nhận (" + slDaNhan + ")"

    useEffect(() => {
        dispatch(getCanNhan());
        dispatch(getDaNhan());
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Button title={titleCanNhan} 
            onPress={() =>
                navigation.navigate('Danh sách cần nhận')
            }/>
            <Button title={titleDaNhan} 
            onPress={() =>
                navigation.navigate('Danh sách đã nhận')
            }/>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
export default HomeGiaoNhanScreen