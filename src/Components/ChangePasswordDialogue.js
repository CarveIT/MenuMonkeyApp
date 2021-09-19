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
    Image,
    TouchableOpacity,
    Alert,
} from 'react-native';

import Color from '../Utilities/Color';
import Button from './Button';
import ProfileInput from './ProfileInput';
import { ChangePasswordStatus } from '../Utilities/Enums';
import ApiCalls from '../Services/ApiCalls';

const validation = (currentPassword, password, confirmPassword) => {
    if (currentPassword == '' || password == '' || confirmPassword == '') {
        const obj = {
            valid: false,
            error: 'All fields is required'
        }
        return obj;
    } else if (password.length < 6 && confirmPassword.length < 6) {
        const obj = {
            valid: false,
            error: 'The new password must be at least 6 characters.'
        }
        return obj
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
    const [currentPassword, setCurrentPassword] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const continueTapped = () => {
        let validate = validation(currentPassword, password, confirmPassword)
        if (validate.valid == false) {
            Alert.alert('ERROR', validate.error)
            return
        }

        var formData = new FormData();
        formData.append('password', currentPassword)
        formData.append('new_password', password)
        formData.append('confirm_password', confirmPassword)
        changePasswordApi(formData, 'change-password')
        // callback(false)
    }

    const changePasswordApi = (params, endPoint) => {
        setLoading(true)
        ApiCalls.postApiCall(params, endPoint).then(data => {
            console.log("DATA");
            console.log(data)
            setLoading(false)
            if (data.message) {
                Alert.alert('', data.message);
                callback(false)
            } else {
                Alert.alert('Error', data.message);
            }
        }, error => {
            Alert.alert('Error', error);
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <TouchableOpacity style={styles.closeBtn} onPress={() => callback(false)}>
                    <Image resizeMode='contain' style={styles.closeImg} source={require('../../assets/red-cross.png')} />
                </TouchableOpacity>
                <Text style={styles.heading}>{'Change Password'}</Text>
                <ProfileInput
                    placeholder={'Current Password'}
                    secureTextEntry={true}
                    onChangeText={(pass) => setCurrentPassword(pass)}
                />
                <ProfileInput
                    placeholder={'New Password'}
                    secureTextEntry={true}
                    onChangeText={(pass) => setPassword(pass)}
                />
                <ProfileInput
                    placeholder={'Confirm New Password'}
                    secureTextEntry={true}
                    onChangeText={(pass) => setConfirmPassword(pass)}
                />
                {/* <Text style={styles.errorLbl}>{'Please enter a password which is not similar then current password.'}</Text> */}
                <View style={styles.btnRow}>
                    <Button
                        style={styles.btnContinue}
                        title={'Continue'}
                        loading={loading}
                        onPress={() => continueTapped()}
                    />
                    {/* <Button
                        style={styles.btnCancel}
                        title={'Cancel'}
                        onPress={() => callback(false)}
                    /> */}
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
        flex: 0.7,
        marginRight: 5
    },
    btnCancel: {
        flex: 1,
        marginLeft: 5
    },
    errorLbl: {
        fontSize: 16,
        paddingVertical: 5,
        paddingHorizontal: 20,
        color: Color.RED
    },
    closeBtn: {
        position: 'absolute',
        top: 5,
        right: 5,
        width: 30,
        height: 30,
    },
    closeImg: {
        width: 30,
        height: 30
    }

});
export default ChangePasswordDialogue;
