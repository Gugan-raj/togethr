/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, Image, SafeAreaView, StyleSheet, Animated, Easing, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, connect } from 'react-redux';
import { startApp, loggedIn } from '../redux/reducer';
import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({
    safeAreaStyle: {
      flex: 1,
	  flexDirection: 'column',
      justifyContent: 'center',
	  alignItems: "center",
	//   backgroundColor: "white",
    },
});

export class SplashScreen extends Component {

	constructor(props) {
        super(props)
        this.animatedValue1 = new Animated.Value(0)
		this.animatedValue2 = new Animated.Value(0)
  		this.animatedValue3 = new Animated.Value(0)
		this.animatedValue4 = new Animated.Value(0)
    }

	componentDidMount() {
	    this.handleAnimation();
	    this._bootstrapAsync();
	}

	handleAnimation = () => {
        // Animated.timing(this.animatedValue, {
        //     toValue: 1,
        //     duration: 1000,
		// 	easing: Easing.ease,
		// 	useNativeDriver: true,
        // }).start()

		const createAnimation = function (value, duration, easing, delay = 0) {
			return Animated.timing(
			  value,
			  {
				toValue: 1,
				duration,
				easing,
				delay,
				useNativeDriver: true,
			  }
			)
		  }
		Animated.parallel([
		createAnimation(this.animatedValue1, 2000, Easing.ease),
		createAnimation(this.animatedValue2, 1000, Easing.ease, 1000),
		createAnimation(this.animatedValue3, 1000, Easing.ease, 2000),
		createAnimation(this.animatedValue4, 1000, Easing.ease, 3000)     
		]).start()
    }

	_bootstrapAsync = async () => {
	  const userToken = await AsyncStorage.getItem('loginData');
      
	  setTimeout(
		() => { 
            // this.props.startApp();
            this.props.loggedIn(JSON.parse(userToken));
		 },
		5000
	  )
	};
  
	render() {
	  return (
		<LinearGradient style={{flex: 1}} colors={['#B9D1F6', '#D8E5F8', '#E6E8FE', '#EDD7E8']}>
		<SafeAreaView style={styles.safeAreaStyle}>
		  	<View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flex: 5}}>
				<Animated.Image
					source={require('../assets/logo.png')}
					resizeMode='contain'
					style={{
						height: 250,
						width: 250,
						opacity: this.animatedValue1,
                        // marginBottom: 10,
					}}
				/>


				

			</View>
			{/* <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
				<Animated.View 
					style={{ 
						opacity: this.animatedValue4,
						bottom: 2
					}}>
					<Text style={{fontSize: 16, color: '#068ebf'}}>Version 1.0</Text>
				</Animated.View>
			</View> */}
			
		</SafeAreaView>
		</LinearGradient>
	  );
	}
}


const mapStateToProps = state => ({
    // loginDetails: state.loginDetails
  });
  
export default connect(mapStateToProps, {startApp, loggedIn})(SplashScreen)