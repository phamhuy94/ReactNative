import { Dimensions } from "react-native";

export const height = Dimensions.get('window').height;
export const width = Dimensions.get('window').width;

const guidelineBaseWidth = 360;
const guidelineBaseHeight = 592;

export const widthScale = size => width / guidelineBaseWidth * size;
export const heightScale = size => height / guidelineBaseHeight * size;
export const moderateScale = (size, factor = 0.5) => size + (widthScale(size) - size) * factor;
