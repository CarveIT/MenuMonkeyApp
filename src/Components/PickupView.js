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
import I18n from "i18n-js";

const validation = (email) => {
    if (email == '') {
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

const PickupView = (props) => {
    const { callback, onClose } = props;
    const [dineIn, setDineIn] = useState(true)

    const continueTapped = () => {
        let validate = validation(email)
        if (validate.valid == false) {
            Alert.alert('ERROR', validate.error)
            return
        } else {
            var formData = new FormData();
            formData.append('email', email)
            // loginApi(formData, 'login')
            callback(false)
        }
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
                callback(false)

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
                <TouchableOpacity style={styles.closeBtn} onPress={() => onClose(false)}>
                    <Image resizeMode='contain' style={styles.closeImg} source={require('../../assets/red-cross.png')} />
                </TouchableOpacity>
                <View style={styles.locationSplitBtnView}>
                    <TouchableOpacity style={dineIn ? styles.selectedLocationBtn : styles.locationBtn} onPress={() => {
                        setDineIn(true)
                        callback(true)
                    }}>
                        <Text style={dineIn ? styles.selectedLocationBtnTxt : styles.locationBtnTxt}>{I18n.t('Dine-in')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={!dineIn ? styles.selectedLocationBtn : styles.locationBtn} onPress={() => {
                        setDineIn(false)
                        callback(false)
                    }}>
                        <Text style={!dineIn ? styles.selectedLocationBtnTxt : styles.locationBtnTxt}>{I18n.t('Pickup')}</Text>
                    </TouchableOpacity>
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
        height: 150,
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
        flex: 0.5,
        marginRight: 5,
        backgroundColor: Color.RED
    },
    btnCancel: {
        flex: 1,
        marginLeft: 5
    },
    infoTxt: {
        color: Color.WHITE
    },
    locationSplitBtnView: {
        flexDirection: 'row',
        height: 40,
        width: '90%',
        marginVertical: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.GRAY
    },
    selectedLocationBtn: {
        flex: 1,
        height: 40,
        justifyContent: 'center',
        backgroundColor: Color.WHITE
    },
    locationBtn: {
        flex: 1,
        height: 40,
        justifyContent: 'center',
    },
    locationBtnTxt: {
        fontSize: 22,
        fontWeight: '700',
        color: Color.WHITE,
        textAlign: 'center'
    },
    selectedLocationBtnTxt: {
        fontSize: 22,
        fontWeight: '700',
        color: Color.BLACK,
        textAlign: 'center'
    }

});
export default PickupView;
