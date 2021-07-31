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
    Text,
    TextInput
} from 'react-native';

import Color from '../Utilities/Color';
const image = require('../../assets/account-bg.jpeg')

const QuantityInput = (props) => {
    const { title, subTitle } = props
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={'20'}
            />
            {/* <Image /> */}
            <Text style={styles.close}>{'X'}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: 70,
        height: 40,
        borderRadius: 10,
        borderWidth: 2,
        alignItems: 'center',
        paddingHorizontal: 5,
        marginVertical: 10,
        borderColor: Color.BLACK,
        backgroundColor: Color.RED
    },
    input: {
        flex: 1,
        width: '100%',
        fontSize: 18
    },
    close: {
        fontSize: 18
    }
});
export default QuantityInput;
