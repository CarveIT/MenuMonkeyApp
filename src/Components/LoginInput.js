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
} from 'react-native';

import Color from '../Utilities/Color';

const eyeIcon = require('../../assets/eye.png')

const LoginInput = (props) => {
    const { placeholder, secureTextEntry, onChangeText, showRightIcon = false, onPressEyeButton } = props;
    return (
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
    );
};

const styles = StyleSheet.create({
    inputView: {
        flexDirection: 'row',
        width: '90%',
        height: 50,
        alignSelf: 'center',
        paddingHorizontal: 15,
        marginTop: 20,
        borderRadius: 5,
        alignItems: 'center',
        borderBottomColor: Color.SEPARATOR,
        borderBottomWidth: 1,
        backgroundColor: Color.WHITE
    },
    input: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 10,
        fontSize: 16,
    }
});
export default LoginInput;
