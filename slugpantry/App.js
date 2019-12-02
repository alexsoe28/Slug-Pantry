import React, {useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as firebase from 'firebase';
import { API_KEY, AUTH_DOMAIN, DATABASE_URL, PROJECT_ID, STORAGE_BUCKET } from 'react-native-dotenv';
import PantryPage from './screens/PantryPage';
import Header from './components/Header';
import RecipePage from './screens/RecipePage';
import FavoriteRecipePage from './screens/FavoriteRecipePage';


const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET
}

firebase.initializeApp(firebaseConfig);
try {
  firebase.auth().signInWithEmailAndPassword("wkudsk@gmail.com", "123456").then(function(user){
    //console.log(user);
  })
} catch (error) {
  console.log(error.toString());
}



//Switch <RecipePage/> to <PantryPage/> if you want to see that instead of whats currently being displayed
export default function App() {
  var user = firebase.auth().currentUser;
  const [contentSwitch, setContentSwitch] = useState(0);
  const [ingredientList, setIngredientList] = useState([]);
  const [enterIngredient, setEnterIngredient] = useState('');

  const ingredientInputHandler = enteredText => {
    setEnterIngredient(enteredText);
  };

  const addIngredientHandler = () => {
    setIngredientList(currentIngredients => [
      ...currentIngredients, 
      { id: Math.random().toString(), value: enterIngredient }
    ]);
  };
  deleteItemByID = ingredientId =>{
    setIngredientList(currentIngredients =>{
      return currentIngredients.filter((ingredient) => ingredient.id !== ingredientId)
    })
  }

  const contentSwitchHandler = (num) => {
    if(contentSwitch === 3) {
      setContentSwitch(0);
    }
    else if(num === 3){
      setContentSwitch(3);
    }
    else if(contentSwitch === 0){
      setContentSwitch(1);
    }
    else{
      setContentSwitch(0);
    }
  };

  let content = <PantryPage ingredientInputHandlerMaster = {ingredientInputHandler} ingredientList= {ingredientList} addIngredientHandler= {addIngredientHandler}/>;
  if(contentSwitch === 1) {
    //powerSetHandler(ingredientList);
    content = <RecipePage ingredientList = {ingredientList} contentSwitchHandler = {contentSwitchHandler} user = {user}/>
  }
  else if(contentSwitch === 3) {
    //console.log(user.uid);
    content = <FavoriteRecipePage user = {user}/>
  }

  return (

    <View style={styles.container}>
      <Header title="Slug Pantry"/>
      <Button title='Switch' 
      onPress={contentSwitchHandler}/>
      {content}
      <Button title= 'Go To Favorites'
      onPress={() => contentSwitchHandler(3)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
