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
} from 'react-native';

import Color from '../Utilities/Color';

const ProfileInput = (props) => {
    const { placeholder, secureTextEntry, onChangeText, input,inputview} = props;
    return (
        <View style={[styles.inputView,inputview]}>
            <TextInput
                style={[styles.input, input]}
                placeholder={placeholder}
                placeholderTextColor='gray'
                secureTextEntry={secureTextEntry}
                onChangeText={onChangeText}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputView: {
        width: '80%',
        height: 50,
        alignSelf: 'center',
        paddingHorizontal: 20,
        marginTop: 20,
        borderRadius: 3,
        backgroundColor: Color.WHITE
    },
    input: {
        height: '100%',
        width:'80%',
        paddingHorizontal: 10,
        fontSize: 16,
        textAlign: 'center',
        backgroundColor: Color.WHITE
    }
});
export default ProfileInput;
