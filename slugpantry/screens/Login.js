import React, {useState} from 'react';
import { API_KEY,
    AUTH_DOMAIN,
    DATABASE_URL,
    PROJECT_ID,
    STORAGE_BUCKET
} from 'react-native-dotenv';
import { StyleSheet, 
  Text,
  View,
  secureTextEntry,
  ActivityIndicator
} from 'react-native';
import {
  Container,
  Item,
  Input,
  Button,
  Form,
  Label
} from 'native-base'
import {MaterialCommunityIcons as Icon} from '@expo/vector-icons';
import * as firebase from 'firebase'

// const firebaseConfig = {
//     apiKey: "AIzaSyDKQOm7H73WlRKKgQ15Gyzjm7d8747q3UQ",
//     authDomain: "slug-pantry.firebaseapp.com",
//     databaseURL: "https://slug-pantry.firebaseio.com/",
//     projectId: "slug-pantry",
//     storageBucket: "slug-pantry.appspot.com"
//   }
// firebase.initializeApp(firebaseConfig);

const Login = props => { 

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const setEmailHandler = newEmail => {
        setEmail(newEmail);
      } 
      const setPasswordHandler = newPassword => {
        setPassword(newPassword);
      } 
    
    signUp = (email,password)=>{
      try{
        if (password.length < 7){
          alert("Password must be at least 8 character long")
          return;          
        }
        console.log(email)
        console.log(password)
        firebase.auth().createUserWithEmailAndPassword(email, password)
        props.contentSwitchHandler();
      }
      catch(error){
        console.log(error)
      }
  }

  logIn = (email,password)=>{
    try{
      firebase.auth().signInWithEmailAndPassword(email, password).then(function(user){
        console.log(user)
        props.contentSwitchHandler();
      })
        // props.contentSwitchHandler();
    }
    catch(error){
      console.log(error)
    }
  }

return (
    <Container style={styles.container}>
    <Form>
        <Item floatingLabel>
        <Label>Email</Label>
        <Input
        autoCorrect={false}
        autoCapitalize="none"
        onChangeText={(email)=>setEmailHandler(email)}
        />
        </Item>

        <Item floatingLabel>
        <Label>Password</Label>
        <Input
        secureTextEntry={true}
        autoCorrect={false}
        autoCapitalize="none"
        onChangeText={(password)=>setPasswordHandler(password)}
        />
        <Icon name="eye" size={20}/>
        </Item>

        <Button style={{marginTop: 10}}
        full
        success
        onPress={()=>logIn(email, password)}
        >
        <Text style={{color:'white'}}>Login</Text> 
        </Button>

        <Button style={{marginTop: 10}}
        full
        Primary
        onPress={()=>signUp(email, password)}
        >
        <Text style={{color:'white'}}>Sign Up</Text>
        </Button>

    </Form>
    </Container>
);
}


const styles = StyleSheet.create({
container:{
  flex:1,
  backgroundColor: '#fff',
  justifyContent: 'center',
  padding:10
}
})

export default Login;