import React, { useEffect, useState } from 'react';
import { Text,TextInput } from 'react-native';
import NumberFormat from 'react-number-format';

export function ReactNativeNumberFormat({ string,value }) {
  return (
    <NumberFormat
      value={value}
      displayType={'text'}
      thousandSeparator={true}
      renderText={formattedValue => <Text>{string} {formattedValue}</Text>} // <--- Don't forget this!
    />
  );
}

export function InputFormatNumber({value,action}) {
  return (
    <NumberFormat
      value={value}
      displayType={'text'}
      thousandSeparator={true}
      renderText={formattedValue => (
        <TextInput
          underlineColorAndroid="transparent"
          onChangeText={action}
          value={formattedValue}
          keyboardType="numeric"
        />
      )}
    />
  );
}