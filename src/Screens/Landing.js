/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Image,
    Text,
    useColorScheme,
    View,
    Alert,
    TouchableOpacity
} from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import GetLocation from 'react-native-get-location'
import Color from '../Utilities/Color';
import SigninDialogue from '../Components/SigninDialogue'; 
import PickupDialogue from '../Components/PickupDialogue';
import ProfileInput from '../Components/ProfileInput';
import Constants from '../Utilities/Constants';
import { setcartCount } from '../Actions/updatecardactions';
import { getObjectData } from '../Utilities/Storage';
import Key from '../Utilities/Keys';
import ApiCalls from '../Services/ApiCalls';

const Landing = (props) => {
    const [signinForm, setSigninForm] = useState(false)
    const [yesBtn, setYesBtn] = useState(false)
    const [dineIn, setDineIn] = useState(true)
    const [location, setLocation] = useState('')
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Ibadan', value: 'Ibadan' },
        { label: 'French', value: 'French' }
    ]);

    useEffect(() => {
        loadData()
        getLocation()
    }, []);

    const loadData = async () => {
        let user = await getObjectData(Key.USER);
        Constants.user = user
        console.log(Constants.user)
    }

    const getLocation = () => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(location => {
                var formData = new FormData();
                formData.append('latitude', location.latitude)
                formData.append('longitude', location.longitude)
                getRestaurantByLocation(formData, 'getRestaurantLocation')
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            })
    }

    const getRestaurantByLocation = (params, endPoint) => {
        // setLoading(true)
        ApiCalls.postApiCall(params, endPoint).then(data => {
            console.log("DATA");
            console.log(data)
            // setLoading(false)
            if (data.location != "error") {
            } else {
                Alert.alert('Error', data.message);
            }
        }, error => {
            Alert.alert('Error', error);
        })
    }

    const cartcount = useSelector(state => state.cartcount)
    // const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()

    const setcount = async () => {
        dispatch(setcartCount(cartcount + 1))
        console.log({ cartcount })
    }
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
                        <Text style={yesBtn ? styles.btnTxtSelected : styles.btnTxt}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={yesBtn ? styles.splitBtn : styles.selectedSplitBtn} onPress={() => setYesBtn(false)}>
                        <Text style={yesBtn ? styles.btnTxt : styles.btnTxtSelected}>No</Text>
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
                    inputview={styles.inputview}
                    input={styles.profileInput}
                    placeholder={'Enter Address or location'}
                    onChangeText={(text) => setLocation(text)}
                />
                {!yesBtn && <DropDownPicker
                    style={styles.dropDownview}
                    containerStyle={styles.dropDown}
                    placeholder={'Select Restaurant'}
                    dropDownContainerStyle={{ width: '90%', alignSelf: 'center' }}
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
                        <Text style={styles.signin}>{Constants.user == null ? 'Sign in' : 'Sign Out'}</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.signinBtn} onPress={() => { setcount() }}>
                        <Text style={styles.signin}>{Constants.user == null ? 'Sign in' : 'Sign Out'}</Text>
                    </TouchableOpacity> */}
                </View>

            </ScrollView>
            {signinForm && <SigninDialogue callback={(data) => { setSigninForm(data) }} />}
            {!dineIn && <PickupDialogue callback={(data) => { setDineIn(data) }} />}

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
        width: '70%',
        marginTop: 5,
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
        backgroundColor: Color.WHITE
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
    btnTxtSelected: {
        fontSize: 20,
        fontWeight: '500',
        color: Color.BLACK,
        textAlign: 'center'
    },
    locationSplitBtnView: {
        flexDirection: 'row',
        height: 50,
        width: '70%',
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
        width: 300,
        height: 300,
        marginTop: 60,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 150,
        backgroundColor: 'red'
    },
    menuImg: {
        width: 300,
        height: 300,
        borderRadius: 150
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
        width: '89%',
        marginTop: 15,
        alignSelf: 'center',
    },
    dropDownview: {
        borderWidth: 0,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 1
    },
    profileInput: {
        width: '100%',
        borderRadius: 3,
        color: Color.BLACK,
        textAlign: 'center'

    },
    inputview: {
        width: '80%',
        height: 50,

        marginTop: 20,
        borderRadius: 1,
        backgroundColor: Color.WHITE
    },
});


const mapStateToProps = (state) => {
    return {
        'myName': state.name
    }
}

// export default connect(mapStateToProps)(Landing);
export default Landing;
