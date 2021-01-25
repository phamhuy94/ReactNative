import React from 'react';
import { DatePicker } from 'native-base';
import moment from 'moment';

const today = new Date()
const date = moment(today).format('DD/MM/YYYY');
const datePicker = ({onPress, maxDate}) => {
    return (
          <DatePicker
            defaultDate={new Date()}
            minimumDate={new Date(2018, 1, 1)}
            maximumDate={maxDate}
            locale={"en"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText={date}
            textStyle={{ color: "#444", borderBottomColor:'#444', borderBottomWidth:1,}}
            placeHolderTextStyle={{ color: "#444", backgroundColor:'#0f3c3e00',borderBottomWidth:1 }}
            onDateChange={onPress}
            disabled={false}
            />

    )
}
export default datePicker;