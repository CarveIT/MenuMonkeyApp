/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Alert,
} from 'react-native';

import Color from '../Utilities/Color';
import Button from './Button';
import ProfileInput from './ProfileInput';
import { ChangePasswordStatus } from '../Utilities/Enums';

const validation = (password, confirmPassword) => {
    if (password == '' || confirmPassword == '') {
        const obj = {
            valid: false,
            error: 'All fields is required'
        }
        return obj;
    } else if (password != confirmPassword) {
        const obj = {
            valid: false,
            error: 'Confirm password mismatched'
        }
        return obj
    }
    const obj = {
        valid: true,
        error: 'hi'
    }
    return obj
}

const ChangePasswordDialogue = (props) => {
    const { callback } = props;
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const continueTapped = () => {
        let validate = validation(password, confirmPassword)
        if (validate.valid == false) {
            Alert.alert('ERROR', validate.error)
            return
        }
        callback(false)
    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.heading}>{'Change Password'}</Text>
                <ProfileInput
                    placeholder={'New Password'}
                    onChangeText={(pass) => setPassword(pass)}
                />
                <ProfileInput
                    placeholder={'Confirm New Password'}
                    secureTextEntry={true}
                    onChangeText={(pass) => setConfirmPassword(pass)}
                />
                <View style={styles.btnRow}>
                    <Button
                        style={styles.btnContinue}
                        title={'Continue'}
                        onPress={() => continueTapped()}
                    />
                    <Button
                        style={styles.btnCancel}
                        title={'Cancel'}
                        onPress={() => callback(false)}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        position: 'absolute',
        width: '100%',
        height: '115%',
        backgroundColor: '#00000099',
        justifyContent: 'center', alignItems: 'center'
    },
    form: {
        width: '80%',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.BLUE
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        alignSelf: 'center',
        color: Color.WHITE
    },
    btnRow: {
        flexDirection: 'row',
        marginHorizontal: 15,
        marginVertical: 20
    },
    btnContinue: {
        flex: 1,
        marginRight: 5
    },
    btnCancel: {
        flex: 1,
        marginLeft: 5
    }

});
export default ChangePasswordDialogue;
