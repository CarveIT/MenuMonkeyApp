/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
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
import I18n from 'i18n-js';
import stripe from 'react-native-stripe-payments';

stripe.setOptions({
    publishingKey: 'pk_test_51IQbsdE512fnYKTsUSqDKUOdhhmBOdyNB76uLhEzHINIETQ6sg5XO9IvzgOsTthQden6SIG9VTH8MgG6FNTE3EUC00bqQ7ltUo'
})

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
    const { callback, previousScreen, total } = props;
    const [name, setName] = useState('')
    const [cardNo, setCardNo] = useState('')
    const [cvc, setCVC] = useState('')
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        fetchCards('bill')
    }, []);

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
            console.log({ data })
            setLoading(false)
            callback(false)
            if (!data.message) {
                console.log(data)
                handleCardPayPress()

            } else {
                Alert.alert('Error', data.message);
            }
        }, error => {
            Alert.alert('Error', error);
        })
    }

    const fetchCards = (endPoint) => {
        // setLoading(true)
        ApiCalls.getApiCall(endPoint).then(data => {
            console.log("DATA");
            console.log(data)
            // setLoading(false)
            if (data.card) {
                handlingCardNumber(data.card[data.card.length - 1].card_number)
                setCVC(data.card[data.card.length - 1].cvc)
                setMonth(data.card[data.card.length - 1].expiry_month)
                setYear(data.card[data.card.length - 1].expiry_year)
                console.log(data.card[data.card.length - 1].card_number)

            } else {
                Alert.alert('Error', data.error);
            }
        }, error => {
            Alert.alert('Error', error);
        })
    }

    const handleCardPayPress = async () => {
        console.log("Here")
        try {
            // const isCardValid = stripe.isCardValid({
            //     number: cardNo,
            //     expMonth: month,
            //     expYear: year,
            //     cvc: cvc,
            //   });

            const cardDetails = {
                number: cardNo,
                expMonth: 10,
                expYear: 21,
                cvc: '345',
            }
            //   console.log(cardDetails);
            stripe.confirmPayment('client_secret_from_backend', cardDetails)
                .then(result => {
                    console.log(result)
                    // result of type PaymentResult
                })
                .catch(err => {
                    Alert.alert('Alert', "Please provide a valid client secret from backend")
                    console.log(err)
                })
        } catch (error) {
            // this.setState({ loading: false })
        }
    }
    const handlingCardNumber = (number) => {
        setCardNo(number.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim())
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

                        label={I18n.t('Name on Card')}
                        onChangeText={(name) => setName(name)}
                    />
                    <PaymentInput
                        defaultvalue={cardNo}
                        label={I18n.t('Card Number')}
                        onChangeText={(no) => handlingCardNumber(no)}
                    />
                    <View style={styles.fieldRow}>
                        <PaymentInput
                            defaultvalue={cvc}
                            containerStyle={{ flex: 1, marginRight: 5 }}
                            label={'CVC'}
                            placeholder={'ex. 311'}
                            onChangeText={(cvc) => setCVC(cvc)}
                        />
                        <PaymentInput
                            defaultvalue={month}
                            containerStyle={{ flex: 1, marginLeft: 5 }}
                            label={I18n.t('Expiration')}
                            placeholder={'MM'}
                            onChangeText={(mm) => setMonth(mm)}
                        />
                    </View>
                    <PaymentInput
                        defaultvalue={year}
                        containerStyle={{ width: '50%' }}
                        placeholder={'YY'}
                        onChangeText={(yyyy) => setYear(yyyy)}
                    />
                    <View style={{ flex: 1, height: 50, marginTop: 10 }}>
                        {previousScreen != 'Checkout' && <Button
                            style={styles.btnContinue}
                            title={I18n.t('Save')}
                            loading={loading}
                            onPress={() => continueTapped()}
                        />}
                        {previousScreen == 'Checkout' && <Button
                            style={styles.btnContinue}
                            title={I18n.t('Total') + ': $' + total}
                            loading={loading}
                        // onPress={() => continueTapped()}
                        />}
                        {previousScreen == 'Checkout' && <Button
                            style={styles.btnContinue}
                            title={I18n.t('Pay') + "" + ' >>'}
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
