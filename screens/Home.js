import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput, Button, TouchableOpacity, Alert, ActivityIndicator, FlatList } from 'react-native';
import { useDispatch, connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../redux/reducer';

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 10,
  },
  subContainer: {
      flexDirection: 'column',
  },
  inputView: {
      // flex: 1,
      flexDirection: "column",
      marginTop: 20,
      marginBottom: 20,
  },
  input: {
      borderWidth: 1,
      borderColor: 'grey',
      borderRadius: 10,
      marginVertical: 5,
      marginHorizontal: 20,
      paddingHorizontal: 10,
      textAlign: 'center',
      fontSize: 16
  },
  shopName: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 5,
      // textAlign: 'center',
  },
  codeName: {
    fontSize: 16,
    marginBottom: 5,
    // textAlign: 'center',
  },
  btn: {
      marginHorizontal: 20,
      backgroundColor: '#841584',
      paddingHorizontal: 5,
      paddingVertical: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      marginTop: 20,
      marginBottom: 20,
  },
  actionBlock: {
    flex: 1, 
    flexDirection: 'row', 
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  optionBlock: {
    width: '40%',
    height: 100,
    backgroundColor: '#841584',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 10
  },
  optionName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  logout: {
    marginHorizontal: 20,
    backgroundColor: '#08a8a6',
    paddingHorizontal: 5,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
    bottom: 0,
  },
  shoplist: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
    // marginHorizontal: 5
  }
});

const removeLoginLocal = async () => {
  try {
    await AsyncStorage.removeItem('loginData');
  } catch (err) {
    
  }
};

export class Home extends Component {

  constructor(props) {
    super(props);

    this.flatListRef;

    this.state = {
      shopList: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    fetch('http://abc.com', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((response) => response.json())
      .then((json) => {
        if(json.Shop_List.length > 0){
          this.setState({
            shopList: json.Shop_List
          })
        }
      })
      .catch((error) => alert(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  logoutAction = () => {
    removeLoginLocal();
    this.props.logout();
  }

  logout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout??",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: () => this.logoutAction() }
      ]
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    const { loginDetails } = this.props;
    const { shopList, isLoading } = this.state;
    if(isLoading){
      return(
        <View style={{paddingVertical: 20}}
        >
          <ActivityIndicator animating size="large" color="#0000ff" />
        </View>
      )
    }
    return (
        <View style={styles.container}>
          <View style={{paddingHorizontal: 10,}}>
            <Text style={styles.shopName}>{loginDetails.Shop_Name}</Text>
            {/* <Text style={styles.codeName}>Shop Number - {loginDetails.Shop_No}</Text> */}
            {/* <Text style={styles.codeName}>Shop Type - {loginDetails.Type}</Text> */}
            <Text style={styles.codeName}>{loginDetails.Location}</Text>
          </View>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>Shops List</Text>
          {/* <View> */}
            <FlatList
                data={shopList}
                renderItem={({ item, index }) =>
                  <TouchableOpacity style={styles.shoplist} onPress={() => navigate('Shop', {details: item})}>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>{item.name}</Text>
                    <Text style={{fontSize: 14, fontWeight: 'bold'}}>{item.shop_no}</Text>
                    <Text style={{fontSize: 14}}>{item.location}</Text>
                  </TouchableOpacity>
                }
                keyExtractor={(item, index) => 'shop'+index}
            />
          {/* </View> */}
          
          {/* <View style={styles.actionBlock}>
            <TouchableOpacity style={styles.optionBlock} onPress={() => navigate('Product')}>
              <Text style={styles.optionName}>Products</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionBlock} onPress={() => navigate('Sales')}>
              <Text style={styles.optionName}>Sales</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionBlock} onPress={() => navigate('Order')}>
              <Text style={styles.optionName}>Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionBlock} onPress={() => navigate('Stock')}>
              <Text style={styles.optionName}>Stock</Text>
            </TouchableOpacity>
          </View> */}
          {/* <TouchableOpacity style={styles.logout} onPress={() => this.logout()}>
            <Text style={styles.optionName}>Log Out</Text>
          </TouchableOpacity> */}
        </View>
    )
  }
}


const mapStateToProps = state => ({
  loginDetails: state.loginDetails
});


export default connect(mapStateToProps, {logout})(Home)