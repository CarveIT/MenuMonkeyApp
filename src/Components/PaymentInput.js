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
    TextInput,
    Image,
    TouchableOpacity,
    Text
} from 'react-native';

import Color from '../Utilities/Color';

const eyeIcon = require('../../assets/eye.png')

const PaymentInput = (props) => {
    const { placeholder, secureTextEntry, onChangeText, showRightIcon = false, onPressEyeButton, label, containerStyle } = props;
    return (
        <View style={[styles.container, containerStyle]}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor='gray'
                    secureTextEntry={secureTextEntry}
                    onChangeText={onChangeText}
                />

                {showRightIcon && <TouchableOpacity onPress={onPressEyeButton}>
                    <Image resizeMode='contain' source={eyeIcon} />
                </TouchableOpacity>}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '90%',
        marginTop: 20
    },
    inputView: {
        flexDirection: 'row',
        width: '100%',
        height: 45,
        alignSelf: 'center',
        paddingHorizontal: 15,
        marginTop: 10,
        borderRadius: 5,
        alignItems: 'center',
        borderColor: Color.SEPARATOR,
        borderWidth: 0.5,
        backgroundColor: Color.WHITE
    },
    input: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 10,
        fontSize: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Color.GRAY
    } 

});
export default PaymentInput;
