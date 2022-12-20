/* eslint-disable prettier/prettier */
import React, { Component, useEffect, useState, } from 'react';
import { Modal, Text, View, StyleSheet, TouchableOpacity, StatusBar, Alert} from 'react-native';
import { StackNavigator, createNativeStackNavigator  } from "@react-navigation/native-stack";
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// import WelcomeScreen from '../screens/Welcome';
import HomeScreen from '../screens/Home';
import AuthLogScreen from '../screens/Login';
import ApploadingScreen from '../screens/Splashscreen';
import Orders from '../screens/Orders';
import Sales from '../screens/Sales';
import Products from '../screens/Products';
import Stock from '../screens/Stock';
import Shop from '../screens/Shop';

import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useDispatch, useSelector } from 'react-redux';

import { useColorScheme } from 'react-native';

import { logout } from '../redux/reducer';

// import NetInfo from '@react-native-community/netinfo';

const Stack = createNativeStackNavigator();

const lightTheme = {
	...DefaultTheme,
	dark: false,
	colors: {
		...DefaultTheme.colors,
	  },
  };

  const styles = StyleSheet.create({
	modal: {
		flex: 1,
		margin: 'auto',
		padding: 'auto',
		width: '100%',
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		backgroundColor: 'rgba(52, 52, 52, 0.5)',
	},
	modalContainer: {
		width: '100%',
	  backgroundColor: '#fff',
	  paddingHorizontal: 16,
	  paddingTop: 10,
	  paddingBottom: 40,
	  alignItems: 'center',
	},
	modalTitle: {
	  fontSize: 22,
	  fontWeight: '600',
	},
	modalText: {
	  fontSize: 18,
	  color: '#555',
	  marginTop: 14,
	  textAlign: 'center',
	  marginBottom: 10,
	},
	button: {
	  backgroundColor: 'red',
	  paddingVertical: 12,
	  paddingHorizontal: 16,
	  width: '100%',
	  alignItems: 'center',
	  marginTop: 10,
	  borderRadius: 20,
	},
	buttonText: {
	  color: '#fff',
	  fontSize: 20,
	},
  });

// const Button = ({children, ...props}) => (
// 	<TouchableOpacity style={styles.button} {...props}>
// 	  <Text style={styles.buttonText}>{children}</Text>
// 	</TouchableOpacity>
//   );

// const NoInternetModal = ({show, isRetrying}) => (
// 	<Modal visible={show} transparent={true} animationType="slide" statusBarTranslucent={true}>
// 		<View style={styles.modal}>
// 			<View style={styles.modalContainer}>
// 				<Text style={styles.modalTitle}>Connection Error</Text>
// 				<Text style={styles.modalText}>
// 				Oops! Looks like your device is not connected to the Internet.
// 				</Text>
// 				<Button onPress={() => console.log('retry')} disabled={isRetrying}>
// 				Try Again
// 				</Button>
// 			</View>
// 		</View>
// 	</Modal>
//   );



export default AppStackNav = () => {
	const scheme = useColorScheme();
	const dispatch = useDispatch();
	const isLoading = useSelector(state => state.isLoading);
	const isSignedIn = useSelector(state => state.isSignedIn);
	const loginDetails = useSelector(state => state.loginDetails);

	// const [isOffline, setOfflineStatus] = useState(false);
	
	// useEffect(() => {
	// 	const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
	// 	const offline = !(state.isConnected && state.isInternetReachable);
	// 		setOfflineStatus(offline);
	// 		dispatch(setOnline(!offline));
	// 	});
	
	// 	return () => removeNetInfoSubscription();
	// }, []);

	const removeLoginLocal = async () => {
		try {
		  await AsyncStorage.removeItem('loginData');
		  dispatch(logout());
		} catch (err) {
		  
		}
	};

	const logoutAction = () => {
		Alert.alert(
		  "Logout",
		  "Are you sure you want to logout??",
		  [
			{
			  text: "Cancel",
			  style: "cancel"
			},
			{ text: "OK", onPress: () => removeLoginLocal() }
		  ]
		);
	  }

	const stateConditionString = () => {
		let navigateTo = '';
		if (isLoading) {
			navigateTo = 'LOAD_APP';
		}
		if (isSignedIn && loginDetails && !isLoading) {
			navigateTo = 'LOAD_HOME';
		}
		if (!isSignedIn && !isLoading) {
			navigateTo = 'LOAD_SIGNIN';
		}
		return navigateTo;
	};

	homeScreens = () => {
		return(
			<Stack.Navigator>
				{/* <Stack.Screen name="Home" component={HomeScreen} options={{title: 'Home'}} /> */}
				<Stack.Screen name="Product" component={Products} options={({navigation}) => ({
					// title: 'Products',
					// titleShow: false
					headerShown: false
					// headerLeft: () => (
					// 	<TouchableOpacity style={{marginRight: 10}}
					// 		onPress={() => {
					// 			logoutAction();
					// 		}}
					// 	>
					// 		<Icon name="log-out" size={30} color="#ed0909" />
					// 	</TouchableOpacity>
					// ),
					// headerRight: () => (
					// 	// <Icon.Button
					// 	// 	name="cart"
					// 	// 	// backgroundColor="#097fed"
					// 	// 	color="#ffffff"
					// 	// 	onPress={() => navigation.navigate('Sales')}
					// 	// >
					// 	// </Icon.Button>
					// 	<TouchableOpacity
					// 		onPress={() => navigation.navigate('Sales')}
					// 	>
					// 		<Icon name="cart" size={30} color="#097fed" />
					// 	</TouchableOpacity>
					// )
				})} 
				/>
				<Stack.Screen name="Sales" component={Sales} options={{title: 'Cart'}} />
				<Stack.Screen name="Stock" component={Stock} />
				<Stack.Screen name="Order" component={Orders} />
				<Stack.Screen name="Shop" component={Shop} />
			</Stack.Navigator>
		)
	}

	splashScreen = () => {
		return(
			<Stack.Navigator>
				<Stack.Screen name="Splash" component={ApploadingScreen} options={{headerShown: false}} />
			</Stack.Navigator>
		)
	}

	authScreen = () => {
		return(
			<Stack.Navigator>
				<Stack.Screen name="AuthScreen" component={AuthLogScreen} options={{headerShown: false}} />
			</Stack.Navigator>
		)
	}

	chooseScreen = () => {
		let navigateTo = stateConditionString();
		let arr = [];
	
		switch (navigateTo) {
		  case 'LOAD_APP':
			arr.push(splashScreen());
			break;
		  case 'LOAD_SIGNIN':
			arr.push(authScreen());
			break;
		  case 'LOAD_HOME':
			arr.push(homeScreens());
			break;
		  default:
			arr.push(authScreen());
			break;
		}
		return arr[0];
	  };
		
	
	return(
		// <View style={{flex: 1}}>
		<SafeAreaProvider>
			<NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
				{chooseScreen()}
			</NavigationContainer>
		</SafeAreaProvider>

		
	) 
}
