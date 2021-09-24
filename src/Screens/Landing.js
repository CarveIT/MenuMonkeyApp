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
    TouchableOpacity,
    Platform
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
import { getObjectData, saveObjectData, saveData } from '../Utilities/Storage';
import Key from '../Utilities/Keys';
import ApiCalls from '../Services/ApiCalls';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Keys from '../Utilities/Keys';
import en from "../Utilities/localization/en.json";
import fr from "../Utilities/localization/fr.json";
import OptionsMenu from "react-native-options-menu";

import I18n from "i18n-js";
I18n.fallbacks = true;
I18n.translations = { en, fr };


// import * as Localization from 'expo-localization';
// import i18n from 'i18n-js';
// import { zh, en, es } from '../Utilities/i18n/supportedLanguages';

const Landing = (props) => {



    const [signinForm, setSigninForm] = useState(false)
    const [yesBtn, setYesBtn] = useState(false)
    const [dineIn, setDineIn] = useState(true)
    const [location, setLocation] = useState('')
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [auth, setAuth] = useState(I18n.t('Sign in'))
    const [items, setItems] = useState([
        { label: 'Ibadan', value: 'Ibadan' },
        { label: 'French', value: 'French' }
    ]);

    const [date, setDate] = useState(moment().toDate());

    const [time, setTime] = useState();
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [lang, setLang] = useState('en')
    const [Langimg, setLangimg] = useState(require('../../assets/united-states.png'))




    useEffect(() => {
        // i18n.fallbacks = true;
        // i18n.translations = { en, zh, es };
        // i18n.locale = Localization.locale;
        loadData()
        getLocation()
    }, []);

    const changelang = (langauge) => {

        if (langauge == "spanish") {
            I18n.locale = 'fr'
            setLang('fr')
            setLangimg(require('../../assets/spain.png'))
        }
        else {
            I18n.locale = 'en'
            setLang('en')
            setLangimg(require('../../assets/united-states.png'))
        }
    }
    

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showDatepicker = () => {
        console.log("Here")
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const loadData = async () => {
        let user = await getObjectData(Key.USER);
        Constants.user = user
        console.log(Constants.user)
        if (Constants.user == null) {
            setAuth(I18n.t('Sign in'))
        } else {
            setAuth(I18n.t('Sign out'))
        }
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

    const onPressSignin = () => {
        if (Constants.user == null) {
            setSigninForm(true)
        } else {
            saveData(Keys.ACCESS_TOKEN, null)
            saveObjectData(Keys.USER, null)
            Constants.user = null
            Constants.token = null
            setAuth(I18n.t('Sign in'))
        }
    }



    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={'dark-content'} />
            <ScrollView>
                <Image style={styles.banner} resizeMode='contain' source={require('../../assets/banner.png')} />
                {/* <View style={styles.titleView}>{i18n.t('welcome')} */}
                <View style={styles.titleView}>
                    <Text style={styles.title}>{I18n.t('Are you at')+" Ibadan?"}</Text>
                </View>
                <View style={styles.splitBtnView}>
                    <TouchableOpacity style={yesBtn ? styles.selectedSplitBtn : styles.splitBtn} onPress={() => setYesBtn(true)}>
                        <Text style={yesBtn ? styles.btnTxtSelected : styles.btnTxt}>{I18n.t('yes')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={yesBtn ? styles.splitBtn : styles.selectedSplitBtn} onPress={() => setYesBtn(false)}>
                        <Text style={yesBtn ? styles.btnTxt : styles.btnTxtSelected}>{I18n.t('no')}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.locationSplitBtnView}>
                    <TouchableOpacity style={dineIn ? styles.selectedLocationBtn : styles.locationBtn} onPress={() => setDineIn(true)}>
                        <Text style={dineIn ? styles.selectedLocationBtnTxt : styles.locationBtnTxt}>{I18n.t('Dine-in')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={!dineIn ? styles.selectedLocationBtn : styles.locationBtn} onPress={() => setDineIn(false)}>
                        <Text style={!dineIn ? styles.selectedLocationBtnTxt : styles.locationBtnTxt}>{I18n.t('Pickup')}</Text>
                    </TouchableOpacity>
                </View>
                <ProfileInput
                    inputview={styles.inputview}
                    input={styles.profileInput}
                    placeholder={I18n.t('Enter Address or location')}
                    onChangeText={(text) => setLocation(text)}
                />
                {!yesBtn && <DropDownPicker
                    style={styles.dropDownview}
                    containerStyle={styles.dropDown}
                    placeholder={I18n.t('Select Resturant')}
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
                    <TouchableOpacity style={styles.signinBtn} onPress={() => onPressSignin()}>
                        <Text style={styles.signin}>{auth}</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.signinBtn} onPress={() => { setcount() }}>
                         <Text style={styles.signin}>{Constants.user == null ? 'Sign in' : 'Sign Out'}</Text>
                     </TouchableOpacity> */}
                </View>

            </ScrollView>
            {signinForm && <SigninDialogue callback={(data) => {
                setSigninForm(data)
                setAuth(I18n.t('Sign out'))
            }} />}
            {!dineIn && <PickupDialogue
                date={date}
                callback={(data) => { setDineIn(data) }}
                callbackdatepicker={() => { showDatepicker() }}
                callbacktimepicker={() => showTimepicker()} />}

            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    minimumDate={moment().toDate()}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}

            <View style={{ position: 'absolute', bottom: 10, right: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image style={{ width: 50, height: 50 }} resizeMode='contain' source={Langimg}></Image>
                    <View style={{ width: 30 }}>
                        <OptionsMenu
                            button={require('../../assets/down-arrow.png')}
                            buttonStyle={{ width: 15, height: 15, marginTop: 17, marginLeft: 5, resizeMode: "contain", justifyContent: 'flex-end' }}
                            destructiveIndex={1}
                            options={['Spanish', 'English']}
                            actions={[() => changelang('spanish'), () => changelang("english")]} />

                    </View>
                </View>
            </View>
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