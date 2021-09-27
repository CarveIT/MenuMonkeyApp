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
  Text,
  useColorScheme,
  View,
  Alert,
  Image,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import Color from '../Utilities/Color';
import LoginInput from '../Components/LoginInput';
import Button from '../Components/Button';
import SocialButton from '../Components/SocialButton';
import ApiCalls from '../Services/ApiCalls';
import Constants from '../Utilities/Constants';
import GuestSigninDialogue from '../Components/GuestSigninDialogue';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from "react-native-fbsdk";
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import I18n from 'i18n-js';
import ForgetPasswordDialogue from '../Components/ForgetPasswordDialogue';
import stripe from 'tipsi-stripe'

const backIcon = require('../../assets/left-arrow.png')
const monkeyImage = require('../../assets/monkey-2.jpg')
const googleIcon = require('../../assets/google.png')
const facebookIcon = require('../../assets/fb.png')
const guestIcon = require('../../assets/guest.png')

GoogleSignin.configure({
  webClientId: '651488950701-m7rcr4u2u8ct8736fep61r4tlu66j9k8.apps.googleusercontent.com',
  offlineAccess: true,
  androidClientId: '651488950701-149a8usjh1gr600bl54m04d7e8hjbvi4.apps.googleusercontent.com',
  iosClientId: '651488950701-149a8usjh1gr600bl54m04d7e8hjbvi4.apps.googleusercontent.com',
  scopes: ['profile', 'email']
  // client ID of type WEB for your server (needed to verify user ID and offline access)
  // offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  // hostedDomain: '', // specifies a hosted domain restriction
  // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
  // forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  // accountName: '', // [Android] specifies an account name on the device that should be used
  // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
});

const Login = (props) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [signinForm, setSigninForm] = useState(false)
  const [userinfo, setuserinfo] = useState();
  const [token, settoken] = useState();
  const [forgetForm, setForgetForm] = useState(false)

  const validation = (password, confirmPassword) => {
    if (email == '' || password == '') {
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

  const GooglesignIn = async () => {
    console.log("Google signin")
    try {

      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setuserinfo(userInfo)
      console.log("Succes", userInfo)
      //call login Api here
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("Google signin Cancelled")
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("Google signin INPROGRESS")
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("Google signin PLAY_SERVICES_NOT_AVAILABLE")
      } else {
        console.log(error)
      }
    }
  };

  const loginWithFacebook = () => {
    LoginManager.logOut()
    LoginManager.logInWithPermissions(["public_profile", "email"]).then(
      function (result) {
        if (result.isCancelled) {
          console.log("==> Login cancelled");
        } else {

          AccessToken.getCurrentAccessToken().then(data => {
            const accessToken = data.accessToken.toString();
            getInfoFromToken(accessToken);
          });

        }
      },
      function (error) {
        console.log("==> Login fail with error: " + error);
      }
    );
  }

  const getInfoFromToken = token => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id, name,  first_name, last_name',
      },
    };
    const profileRequest = new GraphRequest(
      '/me',
      { token, parameters: PROFILE_REQUEST_PARAMS },
      (error, result) => {
        if (error) {
          console.log('login info has error: ' + error);
        } else {
          setuserinfo(result)
          console.log('result:', result);
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };


  const handleCardPayPress = async () => {
    try {

      const token = await stripe.paymentRequestWithCardForm({
        // Only iOS support this options
        smsAutofillDisabled: true,
        requiredBillingAddressFields: 'full',
        prefilledInformation: {
          billingAddress: {
            name: 'Enappd Store',
            line1: 'Canary Place',
            line2: '3',
            city: 'Macon',
            state: '',
            country: 'Estonia',
            postalCode: '31217',
            email: 'admin@enappd.com',
          },
        },
      })
      console.log(token);
      // send token to server using required details and get feedback...
    } catch (error) {
      // this.setState({ loading: false })
    }
  }

  const onLoginPress = () => {
    let validate = validation(email, password)
    if (validate.valid == false) {
      Alert.alert('ERROR', validate.error)
      return
    } else {
      var formData = new FormData();
      formData.append('email', email)
      formData.append('password', password)
      loginApi(formData, 'login')
    }
  }

  const loginApi = (params, endPoint) => {
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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <View style={styles.container}>
        <View style={styles.header}>

          {/* <Image style={styles.banner} resizeMode='contain' source={require('../../assets/banner.png')} /> */}
          <Image resizeMode='stretch' style={styles.monkeyImage} source={monkeyImage} />
          <TouchableOpacity style={styles.backButton} onPress={() => props.navigation.goBack()}>
            <Image source={backIcon} style={styles.backImage} />
          </TouchableOpacity>
        </View>
        <View style={styles.formContainer}>
          <LoginInput
            placeholder={I18n.t('Email')}
            onChangeText={(email) => setEmail(email)}
          />
          <LoginInput
            placeholder={I18n.t('Password')}
            secureTextEntry={showPassword}
            showRightIcon={true}
            onChangeText={(pass) => setPassword(pass)}
            onPressEyeButton={() => { setShowPassword(!showPassword) }}
          />
          <TouchableOpacity style={styles.forgetButton} onPress={() => setForgetForm(true)}>
            <Text style={styles.forgetTitle}>{I18n.t('Forget') + " " + I18n.t('Password')}</Text>
          </TouchableOpacity>
          <Button
            style={styles.loginButton}
            title={'Login'}
            loading={loading}
            onPress={() => { onLoginPress() }}
          />
          <Text style={styles.forgetTitle}>{I18n.t('Login') + " " + I18n.t('with')}</Text>
          <View style={styles.socialView}>
            <SocialButton
              onPress={() => GooglesignIn()}
              icon={googleIcon}
              title={'Google'}
            />
            <SocialButton
              onPress={() => loginWithFacebook()}
              icon={facebookIcon}
              title={'Facebook'}
            />
          </View>
          <SocialButton
            icon={guestIcon}
            title={I18n.t('Guest')}
            onPress={() => setSigninForm(true)}
          // onPress={() => handleCardPayPress()}
          />
          <View style={styles.signupView}>
            <Text style={styles.signupTitle}>{I18n.t('Dont have an account')}</Text>
            <TouchableOpacity style={styles.forgetButton} onPress={() => props.navigation.navigate('Register')}>
              <Text style={styles.forgetTitle}>{I18n.t('Sign Up')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {signinForm && <GuestSigninDialogue callback={(data) => {
        setSigninForm(data)
        props.navigation.replace('Landing')
      }} />}
      {forgetForm && <ForgetPasswordDialogue callback={(data) => {
        setForgetForm(data)
      }} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.BG_BLUE
  },
  header: {
    // flexDirection: 'row',
    width: '100%',
    height: 230,
    backgroundColor: Color.BG_BLUE
  },
  banner: {
    height: 70,
    width: '80%',
    marginTop: 5,
    alignSelf: 'center'
  },
  monkeyImage: {
    width: '100%',
    height: '100%',
    // position:'absolute',
    // bottom:10

  },
  backButton: {
    position: 'absolute',
    top: 5,
    left: 0,
    marginRight: 0,
  },
  formContainer: {
    flex: 1,
    marginTop: -20,
    marginBottom: 50,
    paddingTop: 30,
    alignItems: 'center',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: Color.WHITE
  },
  forgetButton: {
    alignSelf: 'flex-end',
    marginRight: 20,
    marginVertical: 20
  },
  forgetTitle: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  loginButton: {
    height: 40,
    width: 250,
    marginBottom: 15,
    alignSelf: 'center',
    backgroundColor: 'red',
    borderRadius: 20
  },
  socialView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginVertical: 20
  },
  signupView: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center'
  },
  signupTitle: {
    marginRight: 5,
    fontSize: 16,
    fontWeight: '600'
  },
  backImage: {
    marginStart: 10,
    marginTop: 10,
    height: 15,
    width: 15
  }
});

const mapStateToProps = (state) => {
  return {
    'myName': state.name
  }
}

export default connect(mapStateToProps)(Login);
