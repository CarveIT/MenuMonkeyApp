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
    const { placeholder, secureTextEntry, onChangeText } = props;
    return (
        <View style={styles.inputView}>
            <TextInput
                style={styles.input}
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
        width: '90%',
        height: 50,
        paddingHorizontal: 20,
        marginTop: 20,
        borderRadius: 5,
        backgroundColor: Color.WHITE
    },
    input: {
        height: 50,
        paddingHorizontal: 10,
        fontSize: 16,
        textAlign: 'center'
    }
});
export default ProfileInput;
