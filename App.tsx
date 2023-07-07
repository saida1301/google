import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import axios from 'axios';

const App = () => {
  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  const googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut(); // Sign out before signing in again
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      // Make a request to your backend API to store the Google Sign-In user information
      const response = await axios.post('https://movieappi.onrender.com/google-signin', {
        email: userInfo.user.email,
        givenName: userInfo.user.givenName, // Update the key name to 'givenName'
        photo: userInfo.user.photo,
        familyName: userInfo.user.familyName, // Update the key name to 'familyName'
      });
      console.log(response.data);
    } catch (error) {
      // Handle errors
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btnStyle} onPress={googleLogin}>
        <Text>Google Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  btnStyle: {
    height: 48,
    paddingHorizontal: 8,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
});
