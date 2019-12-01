import React from 'react';
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

const firebaseInfo = {
  API_KEY: "AIzaSyDKQOm7H73WlRKKgQ15Gyzjm7d8747q3UQ",
  AUTH_DOMAIN: "slug-pantry.firebaseapp.com",
  DATABASE_URL: "https://slug-pantry.firebaseio.com/",
  PROJECT_ID: "slug-pantry",
  STORAGE_BUCKET: "slug-pantry.appspot.com"
};

export default class App extends React.Component{

  constructor(props){
    super(props)
    this.state = ({
      email:'',
      password:''
    })
  }
  signUp = (email,password)=>{
      try{
        if (this.state.password.length < 7){
          alert("Password must be at least 8 character long")
          return;          
        }
        console.log(this.state.email)
        console.log(this.state.password)
        firebase.auth().createUserWithEmailAndPassword(email, password)
      }
      catch(error){
        console.log(error)
      }
  }

  logIn = (email,password)=>{
    try{
      firebase.auth().signInWithEmailAndPassword(email, password).then(function(user){
        console.log(user)
      })
    
    }
    catch(error){
      console.log(error)
    }

  }

  render(){
    return (
      <Container style={styles.container}>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={(email)=>this.setState({email})}
            />
          </Item>

          <Item floatingLabel>
            <Label>Password</Label>
            <Input
            secureTextEntry={true}
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={(password)=>this.setState({password})}
            />
            <Icon name="eye" size={20}/>
          </Item>

          <Button style={{marginTop: 10}}
          full
          success
          onPress={()=>this.logIn(this.state.email,this.state.password)}
          >
            <Text style={{color:'white'}}>Login</Text> 
          </Button>

          <Button style={{marginTop: 10}}
          full
          Primary
          onPress={()=>this.signUp(this.state.email,this.state.password)}
          >
            <Text style={{color:'white'}}>Sign Up</Text>
          </Button>

        </Form>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
container:{
  flex:1,
  backgroundColor: '#fff',
  justifyContent: 'center',
  padding:10
}
})
