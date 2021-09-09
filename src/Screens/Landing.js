/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Image,
    Text,
    useColorScheme,
    View,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import Color from '../Utilities/Color';
import SigninDialogue from '../Components/SigninDialogue';
import ProfileInput from '../Components/ProfileInput';
import Constants from '../Utilities/Constants';

const Landing = (props) => {
    const [signinForm, setSigninForm] = useState(false)
    const [yesBtn, setYesBtn] = useState(false)
    const [dineIn, setDineIn] = useState(false)
    const [location, setLocation] = useState('')
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Ibadan', value: 'Ibadan' },
        { label: 'French', value: 'French' }
    ]);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={'dark-content'} />
            <ScrollView>
                <Image style={styles.banner} resizeMode='contain' source={require('../../assets/banner.png')} />
                <View style={styles.titleView}>
                    <Text style={styles.title}>Are you at Ibadan?</Text>
                </View>
                <View style={styles.splitBtnView}>
                    <TouchableOpacity style={yesBtn ? styles.selectedSplitBtn : styles.splitBtn} onPress={() => setYesBtn(true)}>
                        <Text style={styles.btnTxt}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={yesBtn ? styles.splitBtn : styles.selectedSplitBtn} onPress={() => setYesBtn(false)}>
                        <Text style={styles.btnTxt}>No</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.locationSplitBtnView}>
                    <TouchableOpacity style={dineIn ? styles.selectedLocationBtn : styles.locationBtn} onPress={() => setDineIn(true)}>
                        <Text style={dineIn ? styles.selectedLocationBtnTxt : styles.locationBtnTxt}>Dine-In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={!dineIn ? styles.selectedLocationBtn : styles.locationBtn} onPress={() => setDineIn(false)}>
                        <Text style={!dineIn ? styles.selectedLocationBtnTxt : styles.locationBtnTxt}>Pickup</Text>
                    </TouchableOpacity>
                </View>
                <ProfileInput
                    placeholder={'Enter Address or location'}
                    onChangeText={(text) => setLocation(text)}
                />
                {!yesBtn && <DropDownPicker
                    style={{ borderWidth: 0 }}
                    containerStyle={styles.dropDown}
                    placeholder={'Select Restaurant'}
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    listMode='SCROLLVIEW'
                    onChangeValue={(value) => {
                        console.log(value)
                        let restaurant = {}
                        restaurant.name = value
                        Constants.selectedRestaurant = restaurant
                        props.navigation.navigate('BottomNavigation')
                    }}
                />}
                <View style={styles.menuImgView}>
                    <Image style={styles.menuImg} source={require('../../assets/menu_caption.jpeg')} />
                    <TouchableOpacity style={styles.signinBtn} onPress={() => setSigninForm(true)}>
                        <Text style={styles.signin}>Sign in</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
            {signinForm && <SigninDialogue callback={(data) => { setSigninForm(data) }} />}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //  alignItems: 'center',
        backgroundColor: Color.BG_BLUE
    },
    banner: {
        height: 70,
        width: '90%',
        alignSelf: 'center'
    },
    titleView: {
        width: '70%',
        height: 45,
        marginTop: 30,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Color.DARK_ORANGE
    },
    title: {
        fontSize: 20,
        fontWeight: '900',
        color: Color.WHITE
    },
    splitBtnView: {
        flexDirection: 'row',
        height: 40,
        width: 150,
        marginTop: 10,
        borderRadius: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.GRAY
    },
    selectedSplitBtn: {
        flex: 1,
        height: 40,
        fontSize: 20,
        borderRadius: 20,
        justifyContent: 'center',
        backgroundColor: Color.GREEN
    },
    splitBtn: {
        flex: 1,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
    },
    btnTxt: {
        fontSize: 20,
        fontWeight: '500',
        color: Color.WHITE,
        textAlign: 'center'
    },
    locationSplitBtnView: {
        flexDirection: 'row',
        height: 50,
        width: '80%',
        marginTop: 40,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.GRAY
    },
    selectedLocationBtn: {
        flex: 1,
        height: 50,
        justifyContent: 'center',
        backgroundColor: Color.WHITE
    },
    locationBtn: {
        flex: 1,
        height: 50,
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
    },
    menuImgView: {
        width: 350,
        height: 350,
        marginTop: 80,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 170,
        backgroundColor: 'red'
    },
    menuImg: {
        width: 350,
        height: 350,
        borderRadius: 170
    },
    signinBtn: {
        position: 'absolute',
        width: 140,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: Color.WHITE,
        backgroundColor: Color.DARK_BLUE
    },
    signin: {
        fontSize: 22,
        fontWeight: '500',
        color: Color.WHITE
    },
    dropDown: {
        width: '90%',
        marginTop: 15,
        alignSelf: 'center',
    }
});

const mapStateToProps = (state) => {
    return {
        'myName': state.name
    }
}

export default connect(mapStateToProps)(Landing);
