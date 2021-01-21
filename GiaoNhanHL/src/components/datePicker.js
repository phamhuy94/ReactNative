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
            textStyle={{ color: "#000", backgroundColor:'#0b46458f' }}
            placeHolderTextStyle={{ color: "#000", backgroundColor:'#0f3c3e00',borderBottomWidth:1 }}
            onDateChange={onPress}
            disabled={false}
            />

    )
}
export default datePicker;