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
    const { placeholder, secureTextEntry, onChangeText, input, inputview, value, placeholderTextColor = 'gray' } = props;
    return (
        <View style={[styles.inputView, inputview]}>
            <TextInput
                style={[styles.input, input]}
                value={value}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
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
        width: '100%',
        paddingHorizontal: 10,
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
        flex: 1,
        backgroundColor: Color.WHITE
    }
});
export default ProfileInput;
