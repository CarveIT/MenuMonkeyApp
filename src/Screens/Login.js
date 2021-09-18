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

const backIcon = require('../../assets/left-arrow.png')
const monkeyImage = require('../../assets/monkey-2.jpg')
const googleIcon = require('../../assets/google.png')
const facebookIcon = require('../../assets/fb.png')
const guestIcon = require('../../assets/guest.png')

const Login = (props) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [signinForm, setSigninForm] = useState(false)

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
        Constants.user = data.success.user
        Constants.token = data.success.token
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
            placeholder={'Email Address'}
            onChangeText={(email) => setEmail(email)}
          />
          <LoginInput
            placeholder={'Password'}
            secureTextEntry={showPassword}
            showRightIcon={true}
            onChangeText={(pass) => setPassword(pass)}
            onPressEyeButton={() => { setShowPassword(!showPassword) }}
          />
          <TouchableOpacity style={styles.forgetButton}>
            <Text style={styles.forgetTitle}>{'Forget Password'}</Text>
          </TouchableOpacity>
          <Button
            style={styles.loginButton}
            title={'Login'}
            loading={loading}
            onPress={() => { onLoginPress() }}
          />
          <Text style={styles.forgetTitle}>{'Login with'}</Text>
          <View style={styles.socialView}>
            <SocialButton
              icon={googleIcon}
              title={'Google'}
            />
            <SocialButton
              icon={facebookIcon}
              title={'Facebook'}
            />
          </View>
          <SocialButton
            icon={guestIcon}
            title={'Guest'}
            onPress={() => setSigninForm(true)}
          />
          <View style={styles.signupView}>
            <Text style={styles.signupTitle}>{'Don\'t have an account?'}</Text>
            <TouchableOpacity style={styles.forgetButton} onPress={() => props.navigation.navigate('Register')}>
              <Text style={styles.forgetTitle}>{'Sign Up'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {signinForm && <GuestSigninDialogue callback={(data) => { setSigninForm(data) }} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.WHITE
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
    height: '100%'
  },
  backButton: {
    position: 'absolute',
    top: 5,
    left: 0,
    marginRight:0,
  },
  formContainer: {
    flex: 1,
    marginTop: -20,
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
    marginStart: 20,
    marginTop:10,
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
