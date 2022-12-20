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
    // alignItems: 'center',
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
    marginTop: 45,
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
    marginTop: 50,
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
    marginTop: 35,
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
    marginLeft: 75,
    marginRight: 5
  },
  forgotPassowrdStyleText: {
    textDecorationLine: 'underline',
    fontSize: 17, 
    color: "#7686a0",
    left: 30,
    top: 10
  },
  rememberMeText: {
    fontSize: 17,
     color: "#7686a0",
      top: 12
  },
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
      
    };
  }

  checkLogin = () => {
    this.props.loggedIn({name: "gugan"});
    // this.props.loggedIn();
  }

  checkLogin2 = () => {
    this.props.loggedIn();
    const {userName, password} = this.state;
    if (!userName || !password) {
      Alert.alert('Login Error', 'Please fill all the details', [{text: 'OK'}]);
    } else {
      this.setState({isLoading: true, isEditable: false});

      fetch(
        'http://abc.com' +
          userName +
          '&password=' +
          password,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            //   'APP-KEY': app_key,
            //   'SOURCE': 'app',
          },
        },
      )
        .then(response => response.json())
        .then(json => {
          //   console.log(JSON.stringify(json));
          if (json.Success == 0) {
            // alert("correct");
            setLoginLocal(json);
            // dispatch(loggedIn(json));
            this.props.loggedIn(json);
            // this.resetToHome();
          } else {
            Alert.alert('Login Error', json.Messages, [
              {
                text: 'OK',
                style: 'cancel',
              },
            ]);
          }
        })
        .catch(error => alert(error))
        .finally(() => {
          this.setState({isLoading: false, isEditable: true});
        });
    }
  };

  render() {
    const {isLoading, userName, password, isEditable} = this.state;
    return (
      // <SafeAreaView style={{flex: 1}} edges={['top','bottom']}>
      <LinearGradient style={{flex: 1}} colors={['#B9D1F6', '#d5e3ff', '#dae6fd', '#EDD7E8']}>
    {/* <SafeAreaView style={{ flex: 1, backgroundColor: 'blue' }}> */}
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
                <Text style={styles.appName}>Welcome!</Text>
                <Text style={styles.username}>Username</Text>
                <View style={styles.inputView}>
                  <View style={styles.SectionStyle}>
                    <TextInput
                      style={styles.inputStyle}
                      onChangeText={bestforme => this.setState({bestforme})}
                      underlineColorAndroid="#fff"
                      placeholderTextColor="#aaaaaa"
                      keyboardType="default"
                      blurOnSubmit={false}
                      secureTextEntry={false}
                    />
                  </View>
                  <View style={styles.underlineDesign} />
             <Text style={styles.passwd}>Password</Text>
                  <View style={styles.SectionStyle}>
                    <TextInput
                      style={styles.inputStyle}
                      onChangeText={bestforme => this.setState({bestforme})}
                      underlineColorAndroid="#fff"
                      placeholderTextColor="#aaaaaa"
                      keyboardType="default"
                      blurOnSubmit={false}
                      secureTextEntry={false}
                    />
                  </View>
                  <View style={styles.underlineDesign} />
            </View>
            <View style={styles.checkBox_forgotPasswordStyle}>
                <CheckBox
                        disabled={false}
                        value={this.state.checked}
                        onValueChange={() => this.setState({ checked: !this.state.checked })}
                        style={{ right: 15,width: 18, height: 18, top: 14 }}
                        boxType={'circle'}
                        lineWidth={2}
                        tintColor={'#7ab799'}
                        onCheckColor={'white'}
                        onFillColor={'#7ab799'}
                        onTintColor={'#7ab799'}
                        animationDuration={1}
                        onAnimationType={'bounce'}
                        offAnimationType={'stroke'}

                    />
                    <Text style={styles.rememberMeText}>Remember me</Text>     
                    <Text style={styles.forgotPassowrdStyleText}>Forgotten password</Text>
            </View>
            <View style={{flexDirection: "column"}}>   
              <View style={styles.btn_main_design}>
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => this.checkLogin()}
                    disabled={!isEditable}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: '#f1eff4',
                      }}>
                      togethr we can...
                    </Text>
                  </TouchableOpacity>
                  <View style={{alignSelf: 'center', marginTop: 3}}>
                    <Text style={{fontSize: 16,  color: "#7686a0"}}>
                      Not registered?{' '}
                      <Text
                        style={{textDecorationLine: 'underline', fontSize: 16,  color: "#7686a0"}}>
                        Create Account
                      </Text>
                    </Text>
            
                    <View style={{alignItems: 'center',marginTop: 20}}>
                      <Text style={{fontSize: 16,  color: "#7686a0"}}>Or login with</Text>
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
                    {/* <Image
                      source={require('../assets/tiktok.png')}
                      style={{height: 50, width: 50}}
                    /> */}
                  </View>
                </View>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* </SafeAreaView> */}
      </LinearGradient>
    );
  }
}

const mapStateToProps = state => ({
  // loginDetails: state.loginDetails
});

export default connect(mapStateToProps, {loggedIn})(Login);
