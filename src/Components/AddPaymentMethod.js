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

import Color from '../Utilities/Color';
import Button from './Button';
import ProfileInput from './ProfileInput';
import { ChangePasswordStatus } from '../Utilities/Enums';
import PaymentInput from './PaymentInput';
import ApiCalls from '../Services/ApiCalls';

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

const AddPaymentMethod = (props) => {
    const { callback, previousScreen } = props;
    const [name, setName] = useState('')
    const [cardNo, setCardNo] = useState('')
    const [cvc, setCVC] = useState('')
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')
    const [loading, setLoading] = useState(false)

    const continueTapped = () => {
        // let validate = validation(password, confirmPassword)
        // if (validate.valid == false) {
        //     Alert.alert('ERROR', validate.error)
        //     return
        // }
        var formData = new FormData();
        formData.append('card_number', cardNo)
        formData.append('cvc', cvc)
        formData.append('expiry_month', month)
        formData.append('expiry_year', year)
        addCardApi(formData, "card-save")

    }

    const addCardApi = (params, endPoint) => {
        setLoading(true)
        ApiCalls.postApiCall(params, endPoint).then(data => {
            console.log("DATA");
            console.log(data)
            setLoading(false)
            callback(false)
            if (!data.message) {
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
                <View style={styles.whiteBg}>
                    <Text style={styles.heading}>{'Credit Card'}</Text>
                    <TouchableOpacity style={styles.closeBtn} onPress={() => callback(false)}>
                        <Image resizeMode='contain' style={styles.closeImg} source={require('../../assets/red-cross.png')} />
                    </TouchableOpacity>
                    <PaymentInput
                        label={'Name on Card'}
                        onChangeText={(name) => setName(name)}
                    />
                    <PaymentInput
                        label={'Card Number'}
                        onChangeText={(no) => setCardNo(no)}
                    />
                    <View style={styles.fieldRow}>
                        <PaymentInput
                            containerStyle={{ flex: 1, marginRight: 5 }}
                            label={'CVC'}
                            placeholder={'ex. 311'}
                            onChangeText={(cvc) => setCVC(cvc)}
                        />
                        <PaymentInput
                            containerStyle={{ flex: 1, marginLeft: 5 }}
                            label={'Expiration'}
                            placeholder={'MM'}
                            onChangeText={(mm) => setMonth(mm)}
                        />
                    </View>
                    <PaymentInput
                        containerStyle={{ width: '50%' }}
                        placeholder={'YYYY'}
                        onChangeText={(yyyy) => setYear(yyyy)}
                    />
                    <View style={{ flex: 1, height: 50, marginTop: 10 }}>
                        {previousScreen != 'Checkout' && <Button
                            style={styles.btnContinue}
                            title={'Save'}
                            loading={loading}
                            onPress={() => continueTapped()}
                        />}
                        {previousScreen == 'Checkout' && <Button
                            style={styles.btnContinue}
                            title={'Total: $2.1'}
                            loading={loading}
                            onPress={() => continueTapped()}
                        />}
                        {previousScreen == 'Checkout' && <Button
                            style={styles.btnContinue}
                            title={'Pay >>'}
                            loading={loading}
                            onPress={() => continueTapped()}
                        />}
                    </View>

                    {/* <View style={styles.btnRow}>
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
                    </View> */}
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
        height: '100%',
        backgroundColor: '#00000099',
        justifyContent: 'center',
        alignItems: 'center'
    },
    form: {
        // width: '80%',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: Color.BLUE
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        alignSelf: 'center',
        color: Color.BLACK
    },
    btnRow: {
        flexDirection: 'row',
        marginHorizontal: 15,
        marginVertical: 20
    },
    btnContinue: {
        width: '100%',
        height: 50,
        marginTop: 10,
        backgroundColor: Color.BG_BLUE
    },
    btnCancel: {
        flex: 1,
        marginLeft: 5
    },
    whiteBg: {
        borderRadius: 5,
        padding: 15,
        backgroundColor: Color.WHITE
    },
    fieldRow: {
        flexDirection: 'row',
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
});
export default AddPaymentMethod;
