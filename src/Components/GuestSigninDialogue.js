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

const GuestSigninDialogue = (props) => {
    const { callback } = props;
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [loading, setLoading] = useState(false)

    const continueTapped = () => {
        let validate = validation(name, email)
        if (validate.valid == false) {
            Alert.alert('ERROR', validate.error)
            return
        } else {
            var formData = new FormData();
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', 'P@s$w0rD')
            formData.append('password_confirmation', 'P@s$w0rD')
            formData.append('phone_number', phone)
            registerApi(formData, 'register')
        }
        // callback(false)
    }

    const validation = () => {
        if (name == '' || phone == '' || email == '') {
            const obj = {
                valid: false,
                error: 'All fields is required'
            }
            return obj;
        }
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(email) === false) {
            const obj = {
                valid: false,
                error: 'Please enter valid email format.'
            }
            return obj
        }
        const obj = {
            valid: true,
            error: 'hi'
        }
        return obj
    }

    const registerApi = (params, endPoint) => {
        setLoading(true)
        ApiCalls.postApiCall(params, endPoint).then(data => {
            console.log("DATA");
            console.log(data)
            setLoading(false)
            if (data.success) {
                let user = data.success
                user['token'] = data.success.token
                Constants.user = user
                saveData(Key.ACCESS_TOKEN, data.success.token)
                saveObjectData(Key.USER, user)
                callback(false)
            } else {
                if (data.error.password) {
                    Alert.alert('Error', data.error.password[0]);
                } else if (data.error.email) {
                    Alert.alert('Error', data.error.email[0]);
                }
            }
        }, error => {
            Alert.alert('Error', error);
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <View style={styles.headingView}>
                    <Text style={styles.heading}>{'Welcome'}</Text>
                    <Text style={styles.subHeading}>{'Hello! Sign in as Guest'}</Text>
                </View>
                <TouchableOpacity style={styles.closeBtn} onPress={() => callback(false)}>
                    <Image resizeMode='contain' style={styles.closeImg} source={require('../../assets/red-cross.png')} />
                </TouchableOpacity>
                <ProfileInput
                    inputview={styles.inputview}
                    placeholder={'Name'}
                    input={styles.input}
                    onChangeText={(name) => setName(name)}
                />
                <ProfileInput
                    inputview={styles.inputview}
                    input={styles.input}
                    placeholder={'Email'}
                    onChangeText={(email) => setEmail(email)}
                />
                <ProfileInput
                    inputview={styles.inputview}
                    placeholder={'Phone'}
                    input={styles.input}
                    onChangeText={(phn) => setPhone(phn)}
                />
                <View style={styles.btnRow}>
                    <Button
                        titlestyle={{ fontSize: 25 }}
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
        // alignItems:'center'
        justifyContent: 'center', alignItems: 'center'
    },
    form: {
        width: '80%',
        borderRadius: 8,
        // position:'absolute',
        // top:170,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.BG_BLUE
    },
    headingView: {
        width: '100%',
        paddingLeft: 10,
        justifyContent: 'center'
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20,
        color: Color.WHITE
    },
    subHeading: {
        fontSize: 15,
        // fontWeight: 'bold',
        // marginTop: 20,
        color: Color.WHITE
    },
    closeBtn: {
        position: 'absolute',
        top: 5,
        right: 5,
        borderRadius: 16.5,
        backgroundColor: 'white',
        color: 'white',
        width: 33,
        alignContent: 'center',
        justifyContent: 'center',
        height: 33,
    },
    closeImg: {
        width: 30,
        height: 30,
        alignSelf: 'center'


    },
    btnRow: {
        flexDirection: 'row',
        marginHorizontal: 15,
        marginVertical: 10,
    },
    btnContinue: {
        flex: 0.6,
        marginRight: 5
    },
    btnCancel: {
        flex: 1,
        marginLeft: 5
    },
    inputview: {
        width: '95%',
        borderRadius: 10,
        marginTop: 15,

    },
    input: {
        fontSize: 25
    }

});
export default GuestSigninDialogue;
