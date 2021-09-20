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
    TouchableOpacity,
    Image
} from 'react-native';

import Key from '../Utilities/Keys';
import { saveData, getData, saveObjectData } from '../Utilities/Storage';

import Color from '../Utilities/Color';
import Button from './Button';
import ProfileInput from './ProfileInput';
import { ChangePasswordStatus } from '../Utilities/Enums';
import ApiCalls from '../Services/ApiCalls';
import Constants from '../Utilities/Constants';

const validation = (password, email) => {
    if (password == '' || email == '') {
        const obj = {
            valid: false,
            error: 'All fields is required'
        }
        return obj;
    }
    const obj = {
        valid: true,
        error: 'hi'
    }
    return obj
}

const SigninDialogue = (props) => {
    const { callback } = props;
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const continueTapped = () => {
        let validate = validation(password, email)
        if (validate.valid == false) {
            Alert.alert('ERROR', validate.error)
            return
        } else {
            var formData = new FormData();
            formData.append('email', email)
            formData.append('password', password)
            loginApi(formData, 'login')
        }
        // callback(false)
    }

    const loginApi = async (params, endPoint) => {
        setLoading(true)
        ApiCalls.postApiCall(params, endPoint).then(data => {
            console.log("DATA");
            console.log(data)
            setLoading(false)
            if (data.success) {
                let user = data.success.user
                user['token'] = data.success.token
                Constants.user = user
                saveData(Key.ACCESS_TOKEN, data.success.token)
                saveObjectData(Key.USER, user)
              
            } else {
                Alert.alert('Error', data.error);
            }
        }, error => {
            Alert.alert('Error', error);
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <View style={styles.headingView}>
                    <Text style={styles.heading}>{'Login'}</Text>
                    <TouchableOpacity style={styles.closeBtn} onPress={() => callback(false)}>
                        <Image resizeMode='contain' style={styles.closeImg} source={require('../../assets/red-cross.png')} />
                    </TouchableOpacity>
                </View>
                <ProfileInput
                    placeholder={'Email Address'}
                    onChangeText={(email) => setEmail(email)}
                />
                <ProfileInput
                    placeholder={'Password'}
                    secureTextEntry={true}
                    onChangeText={(pass) => setPassword(pass)}
                />
                <View style={styles.btnRow}>
                    <Button
                        style={styles.btnContinue}
                        title={'Sign in'}
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
    headingView: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        alignSelf: 'center',
        color: Color.WHITE
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
export default SigninDialogue;
