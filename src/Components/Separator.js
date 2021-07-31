/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Text,
    TextInput
} from 'react-native';

import Color from '../Utilities/Color';
import QuantityInput from './QuantityInput';
const image = require('../../assets/trash.png')

const Separator = (props) => {
    const { customStyle } = props;
    return (
        <View style={[styles.separator, customStyle]}>
        </View>
    );
};

const styles = StyleSheet.create({
    separator: {
        width: '100%',
        height: 1,
        marginTop: 25,
        backgroundColor: 'gray'
    }
});
export default Separator;
