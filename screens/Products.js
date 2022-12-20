/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StatusBar,
   Platform,
   SafeAreaView,
} from 'react-native';
import {useDispatch, connect} from 'react-redux';
import {loggedIn} from '../redux/reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CheckBox from '@react-native-community/checkbox';





const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    flexDirection: "column",
    marginVertical: 20,
    justifyContent: 'space-between',
    marginTop: 60
  },
  inputView: {
    // flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    textAlign: 'center',
    fontSize: 16,
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 15,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
    position: 'relative',
    // top: 2,
    width: '75%',
    alignItems:"center",
    alignSelf:"center"
  },
  inputStyle: {
    flex: 1,
    // backgroundColor: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    // marginLeft: 10,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#FFF',
    color: "#FFFFFF",
    // width: '80%',
    height: "125%"
  },
  appName: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
    color: "#7686a0",
  },

  username: {
    fontSize: 20,
    fontWeight: '500',
    marginTop: 40,
    marginBottom: 10,
    textAlign: 'center',
    color: "#979fb4"
  },

  passwd: {
    fontSize: 20,
    fontWeight: '500',
    marginTop: 15,
    marginBottom: 5,
    textAlign: 'center',
    color: "#979fb4"
  },
  btn_main_design: {
    marginTop: 5,
    width:'80%',
    marginLeft: 35,
    marginRight: 35,
  },
  Imagecontainer: {
    marginTop: 30,
    flexDirection: 'row',
    marginLeft: 40,
    marginRight: 40,
    justifyContent: 'space-evenly',
  },
  btn: {
    height: 50,
    width: '95%',
    marginHorizontal: 20,
    backgroundColor: '#beb2ca',
    paddingHorizontal: 5,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 50
  },
  underlineDesign: {
    borderColor: 'white',
    // width:'80%',
    borderWidth: 1,
    flexDirection:'row',
     alignItems:'center',
     marginLeft: 50,
     marginRight: 50,
     marginTop: 25,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  checkBox_forgotPasswordStyle: {
    flexDirection: 'row',
    paddingTop: 10,
    marginLeft: 65,
    marginRight: 5
  },
  forgotPassowrdStyleText: {
    fontSize: 18, 
    color: "#7686a0",
    left: 50,
    top: 10,
    fontWeight: '600'
  },
  getOurPassword:{
    fontSize: 18, 
    color: "#7686a0",
    left: 75,
    top: 10,
    fontWeight: '600'
  },
  rememberMeText: {
    fontSize: 18,
    color: "#7686a0",
    top: 12,
    fontWeight: '600',
    marginBottom: 20
  },
  signupUnderlineDesign:{
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginLeft: 40,
    // marginRight: 40,
    borderColor: 'white',
    borderWidth: 1,
    flexDirection:'row',
     alignItems:'center',
     width: '5%'
  },
  signupUnderlineDesignLast: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    // marginLeft: 40,
    marginRight: 40,
    borderColor: 'white',
    borderWidth: 1,
    flexDirection:'row',
     alignItems:'center',
     width: '5%'
  },
  signupUnderlineDesignTwo: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'white',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '27%'
  },
  signupUnderlineDesignThree:{
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'white',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '25%'
  },
  mainSignupCircleLine: {
    flexDirection:'row',
    alignItems:'center',
    width: '100%'
  },
  firstCircle: {
    width: 25,
    height: 25,
    borderRadius: 25,
    backgroundColor: '#7c88a0',

  },
  secondCircle: {
    width: 25,
    height: 25,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
  },
  ThirdCircle: {
    width: 25,
    height: 25,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
  },
  circleInsideText:{
    alignItems: 'center',
    alignSelf: 'center',
    top:4,
    color: "white",
    fontWeight: '800'
    // fontSize: 16
  }
});


const setLoginLocal = async loginData => {
  try {
    await AsyncStorage.setItem('loginData', JSON.stringify(loginData));
  } catch (err) {}
};

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      userName: '',
      password: '',
      uNameError: '',
      passwordError: '',
      isEditable: true,
      checked: true,
      circleInsideValue: 1,
      circleColorInital: '#7c88a0'
      
    };
  }

  signupClickFunction = () => {
   
  }

  render() {
    const {isLoading, userName, password, isEditable} = this.state;
    return (
      <LinearGradient style={{flex: 1}} colors={['#B9D1F6', '#d5e3ff', '#dae6fd', '#EDD7E8']}>
      <ScrollView style={styles.container}> 
          <View style={styles.subContainer}>
            <View style={{flexDirection: "column"}}>
                <Image
                  source={require('../assets/logo.png')}
                  style={{
                    height: 100,
                    resizeMode: 'contain',
                    alignSelf: 'center',
                    width: 250,
                  }}
                />
                <Text style={styles.appName}>Sign up</Text>
                {/* circle design starting */}
                  <View style={styles.mainSignupCircleLine}>
                    <View style={styles.signupUnderlineDesign}></View>
                      <View style={styles.firstCircle}>
                        <Text style={styles.circleInsideText}>{this.state.circleInsideValue}</Text>
                      </View>
                     <View style={styles.signupUnderlineDesignTwo}></View>
                        <View style={styles.secondCircle}>
                         <Text style={styles.circleInsideText}>H</Text>
                        </View>
                      <View style={styles.signupUnderlineDesignThree}></View>
                        <View style={styles.ThirdCircle}>
                          <Text style={styles.circleInsideText}>H</Text>
                        </View>
                      <View style={styles.signupUnderlineDesignLast}></View>
                  </View>
                {/* circle design completed */}
                 <Text style={styles.username}>Email address</Text>
                <View style={styles.inputView}>
                  <View style={styles.SectionStyle}>
                    <TextInput
                      style={styles.inputStyle}
                      onChangeText={emailAddress => this.setState({emailAddress})}
                      underlineColorAndroid="#fff"
                      placeholderTextColor="#aaaaaa"
                      keyboardType="default"
                      blurOnSubmit={false}
                      secureTextEntry={false}
                    />
                  </View>
                  <Text style={styles.passwd}>Phone number</Text>
                    <View style={styles.SectionStyle}>
                      <TextInput
                        style={styles.inputStyle}
                        onChangeText={phoneNumber => this.setState({phoneNumber})}
                        underlineColorAndroid="#fff"
                        placeholderTextColor="#aaaaaa"
                        keyboardType="default"
                        blurOnSubmit={false}
                        secureTextEntry={false}
                      />
                    </View>
                  <Text style={styles.passwd}>Password</Text>
                    <View style={styles.SectionStyle}>
                      <TextInput
                        style={styles.inputStyle}
                        onChangeText={passwordSignUp => this.setState({passwordSignUp})}
                        underlineColorAndroid="#fff"
                        placeholderTextColor="#aaaaaa"
                        keyboardType="default"
                        blurOnSubmit={false}
                        secureTextEntry={false}
                      />
                    </View>
            </View>
            <View style={styles.checkBox_forgotPasswordStyle}>
                    <Text style={styles.rememberMeText}>+8 Characters</Text>     
                    <Text style={styles.forgotPassowrdStyleText}>+1 Symbol</Text>
            </View>
            <View style={styles.checkBox_forgotPasswordStyle}>
                    <Text style={styles.rememberMeText}>+1 Number</Text>     
                    <Text style={styles.getOurPassword}>Get our password</Text>
            </View>
            <View style={styles.underlineDesign} />
            <View style={{flexDirection: "column"}}> 
            <View style={{alignSelf: 'center', marginTop: 3}}>            
              <View style={{alignItems: 'center',marginTop: 20}}>
                <Text style={{fontSize: 17,  color: "#7686a0"}}>Or login with</Text>
              </View>
            </View>
            <View style={styles.Imagecontainer}>
              <Image
                source={require('../assets/google.png')}
                style={{height: 50, width: 50}}
              />
              <Image
                source={require('../assets/fb.png')}
                style={{height: 50, width: 50}}
              />
            </View>  
              <View style={styles.btn_main_design}>
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => this.signupClickFunction()}
                    disabled={!isEditable}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: '#f1eff4',
                      }}>
                      Continue
                    </Text>
                  </TouchableOpacity>

                </View>
            </View>
          </View>
        </View>
      </ScrollView>
      </LinearGradient>
    );
  }
}

const mapStateToProps = state => ({
  // loginDetails: state.loginDetails
});

export default connect(mapStateToProps, {loggedIn})(Login);
