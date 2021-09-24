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
import color from '../Utilities/Color';
import Color from '../Utilities/Color';
import LoginInput from '../Components/LoginInput';
import Button from '../Components/Button';
import SocialButton from '../Components/SocialButton';
import ApiCalls from '../Services/ApiCalls';
import Constants from '../Utilities/Constants';
import I18n from 'i18n-js';

const backIcon = require('../../assets/back.png')
const homeIcon = require('../../assets/home.png')

const Register = (props) => {

  const [username, setUsername] = useState('')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const validation = () => {
    if (username == '' || mobile == '' || email == '' || password == '' || confirmPassword == '') {
      const obj = {
        valid: false,
        error: 'All fields is required'
      }
      return obj;
    }
    if (confirmPassword == password) {
      const obj = {
        valid: false,
        error: 'Password mismatched'
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
    if (password.length < 8) {
      const obj = {
        valid: false,
        error: 'The password must be at least 8 characters.'
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
        let user = {
          name: data.success.name
        }
        Constants.user = user
        Constants.token = data.success.token
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

  const onLoginPress = () => {
    let validate = validation()
    console.log(validate)
    if (validate.valid == false) {
      Alert.alert('ERROR', validate.error)
      return
    } else {
      var formData = new FormData();
      formData.append('name', username)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('password_confirmation', confirmPassword)
      formData.append('phone_number', mobile)
      registerApi(formData, 'register')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <View style={styles.container}>
        <View style={styles.header}>
          {/* <Image resizeMode='stretch' style={styles.backIcon} source={backIcon} /> */}
          <TouchableOpacity style={styles.backButton}>
            <Image style={styles.backImage} source={backIcon} />
          </TouchableOpacity>
          <Text style={styles.signupTitle}>{I18n.t('Sign Up')}</Text>
        </View>
        <View style={styles.formContainer}>
          <LoginInput
            placeholder={I18n.t('Username')}
            onChangeText={(user) => setUsername(user)}
          />
          <LoginInput
            placeholder={I18n.t('Mobile')}
            onChangeText={(phone) => setMobile(phone)}
          />
          <LoginInput
            placeholder={I18n.t('Email')}
            onChangeText={(email) => setEmail(email)}
          />
          <LoginInput
            placeholder={I18n.t('Password')}
            secureTextEntry={!showPassword}
            showRightIcon={true}
            onChangeText={(pass) => setPassword(pass)}
            onPressEyeButton={() => { setShowPassword(!showPassword) }}
          />
          <LoginInput
            placeholder={I18n.t('Confirm Password')}
            secureTextEntry={!showConfirmPassword}
            showRightIcon={true}
            onChangeText={(pass) => setConfirmPassword(pass)}
            onPressEyeButton={() => { setShowConfirmPassword(!showConfirmPassword) }}
          />
          <Button
            style={styles.loginButton}
            title={'Sign Up'}
            loading={loading}
            onPress={() => { onLoginPress() }}
          />
          <View style={styles.signupView}>
            <Text style={styles.accountTitle}>{I18n.t('Have an account')}</Text>
            <TouchableOpacity style={styles.forgetButton} onPress={() => props.navigation.navigate('Login')}>
              <Text style={styles.forgetTitle}>{I18n.t('Sign in')}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.homeButton}>
            <Image source={homeIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.BG_BLUE
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupTitle: {
    fontSize: 25,
    fontWeight: '800',
    color: Color.WHITE
  },
  monkeyImage: {
    width: '100%',
    height: 170
  },
  backButton: {
    position: 'absolute',
    width: 20,
    height: 20,
    left: 10,
  },
  backImage: {
    tintColor: Color.WHITE
  },
  formContainer: {
    // flex: 1,
    paddingTop: 30,
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: Color.WHITE
  },
  loginButton: {
    width: '80%',
    marginVertical: 20,
    alignSelf: 'center',
    backgroundColor: Color.YELLOW,
    borderRadius: 5
  },
  socialView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginVertical: 20
  },
  signupView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  accountTitle: {
    marginRight: 5,
    fontSize: 16,
    fontWeight: '600'
  },
  forgetTitle: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  homeButton: {
    marginTop: 30,
    marginBottom: 15
  }
});

const mapStateToProps = (state) => {
  return {
    'myName': state.name
  }
}

export default connect(mapStateToProps)(Register);
