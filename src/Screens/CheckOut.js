import React, { useState, useEffect } from 'react';

import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Text,
    View,
    Image,
    Alert
} from 'react-native';
import SubCatHeader from '../Components/SubCatHeader';
import ProfileInput from '../Components/ProfileInput';
import Color from '../Utilities/Color';
import AddPaymentMethod from '../Components/AddPaymentMethod';
import I18n from 'i18n-js';
import stripe from 'react-native-stripe-payments';

stripe.setOptions({
    publishingKey:'pk_test_51IQbsdE512fnYKTsUSqDKUOdhhmBOdyNB76uLhEzHINIETQ6sg5XO9IvzgOsTthQden6SIG9VTH8MgG6FNTE3EUC00bqQ7ltUo'
})


const cardsImg = require('../../assets/cards.jpg')

// stripe.setOptions({
//     publishableKey: 'pk_test_51IQbsdE512fnYKTsUSqDKUOdhhmBOdyNB76uLhEzHINIETQ6sg5XO9IvzgOsTthQden6SIG9VTH8MgG6FNTE3EUC00bqQ7ltUo'
//   })


const CheckOut = (props) => {
    const cartData = props.route.params.cartDetails
    const [tip, setTip] = useState(0)
    const [addPayment, setAddPayment] = useState(false)
    const [total, setTotal] = useState(cartData.total)

 

    const calculateTip = (tip) => {
        let a = cartData.total * (tip / 100)
        setTotal(cartData.total + a)
    }
    return (
        <SafeAreaView style={styles.container}>
            <SubCatHeader
                title={I18n.t('Checkout')}
                navigation={props.navigation}
                subTitlestyle={styles.headerTxt}
            />
            <ScrollView style={styles.scroller}>
                <Text style={styles.title}>{I18n.t('Dine-in')}</Text>
                <ProfileInput
                    inputview={styles.tableField}
                    input={styles.tableInput}
                    placeholder={I18n.t('Enter Table Number')}
                />
                <TouchableOpacity style={styles.addMore}>
                    <Text style={styles.addMoreTxt}>{I18n.t('Add More Items')}</Text>
                </TouchableOpacity>
                <Text style={styles.summaryLbl}>{I18n.t('Summary')}</Text>
                <View style={styles.billView}>
                    <View style={styles.row}>
                        <Text style={styles.leftTxt}>{I18n.t('Cost')}</Text>
                        <Text style={styles.rightTxt}>{'$'+cartData.subtotal}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.leftTxt}>{I18n.t('Tax')}</Text>
                        <Text style={styles.rightTxt}>{cartData.restauranttax+'%'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.leftTxt}>{I18n.t('Tip')}</Text>
                        <View style={styles.tipView}>
                            <TouchableOpacity style={styles.tipButton} onPress={() => calculateTip(18)}>
                                <Text style={styles.tipLbl}>{'18%'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.tipButton} onPress={() => calculateTip(20)}>
                                <Text style={styles.tipLbl}>{'20%'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.tipButton} onPress={() => calculateTip(23)}>
                                <Text style={styles.tipLbl}>{'23%'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.tipButton} onPress={() => calculateTip(25)}>
                                <Text style={styles.tipLbl}>{'25%'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.leftTxt}>{I18n.t('Cash Tip')}</Text>
                        <ProfileInput
                            inputview={styles.tipInputView}
                            input={styles.tipInput}
                            placeholder={I18n.t('Enter Cash Tip')}
                            onChangeText= {(txt) => calculateTip(txt)}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.leftTxt}>{I18n.t('Total')}</Text>
                        <Text style={styles.rightTxt}>{'$'+total.toFixed(2)}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.creditButton} onPress={() => setAddPayment(true)}>
                    <Text style={styles.addMoreTxt}>{I18n.t('Enter Credit Card')}</Text>
                </TouchableOpacity>
                <ProfileInput
                    inputview={styles.couponView}
                    input={styles.couponField}
                    placeholder={I18n.t('Coupon Code')}
                />
                <Image style={styles.cardIcon} source={cardsImg} />
                <TouchableOpacity style={styles.orderButton}>
                    <Text style={styles.addMoreTxt}>{I18n.t('Submit Order')}</Text>
                </TouchableOpacity>
            </ScrollView>
            {addPayment &&
                <AddPaymentMethod
                    previousScreen={I18n.t('Checkout')}
                    total={total}
                    callback={(data) => { setAddPayment(data) }}
                />}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.WHITE
    },
    headerTxt: {
        fontSize: 20
    },
    scroller: {
        marginHorizontal: 30,
        // backgroundColor: Color.BG_GRAY
    },
    title: {
        fontWeight: '700',
        alignSelf: 'center'
    },
    tableField: {
        width: '100%',
        height: 40,
        borderRadius: 25,
        borderColor: Color.BLACK,
        borderWidth: 1,
        // backgroundColor: 'yellow'
    },
    tableInput: {
        // paddingHorizontal: 0,
        width: '100%',
        borderRadius: 25,
        // backgroundColor: 'red'
    },
    addMore: {
        width: '100%',
        height: 35,
        borderRadius: 15,
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: Color.BLUE
    },
    addMoreTxt: {
        fontSize: 17,
        color: Color.WHITE
    },
    billView: {
        // flex: 1,
        // backgroundColor: 'blue'
    },
    row: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center'
    },
    leftTxt: {
        fontSize: 16
    },
    rightTxt: {
        marginLeft: 'auto',
        fontSize: 16
    },
    summaryLbl: {
        marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold',
        color: Color.RED
    },
    creditButton: {
        width: '100%',
        height: 35,
        borderRadius: 17,
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: Color.RED
    },
    couponView: {
        height: 35,
        width: '100%',
        borderRadius: 25,
        borderColor: Color.GRAY,
        borderWidth: 1,
        backgroundColor: Color.BG_GRAY
    },
    couponField: {
        width: '100%',
        fontSize: 12,
        backgroundColor: Color.BG_GRAY
    },
    cardIcon: {
        height: 50,
        width: 250,
        alignSelf: 'center',
        resizeMode: 'contain'
    },
    orderButton: {
        width: '100%',
        height: 35,
        borderRadius: 15,
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: Color.GREEN
    },
    tipInputView: {
        height: 30,
        width: 100,
        paddingHorizontal: 0,
        paddingVertical:0,
        marginLeft: 'auto',
        marginTop: 0,
        borderWidth: 1,
        borderColor: Color.GREEN,
        borderRadius: 3,
        backgroundColor: 'yellow'
    },
    tipInput: {
        width: '100%',
        height: 30,
        fontSize: 12,
        paddingVertical:0,
        paddingHorizontal: 0,
        borderRadius: 3,
        includeFontPadding: true,
        textAlignVertical: 'center',
        textAlign: 'center'
        // backgroundColor: 'blue'
    },
    tipView: {
        flexDirection: 'row',
        marginLeft: 'auto'
    },
    tipButton: {
        padding: 3,
        marginHorizontal: 2,
        backgroundColor: Color.BG_BLUE
    },
    tipLbl: {
        color: Color.WHITE
    }
})
export default CheckOut;