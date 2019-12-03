import React, {useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as firebase from 'firebase';
import { API_KEY, AUTH_DOMAIN, DATABASE_URL, PROJECT_ID, STORAGE_BUCKET } from 'react-native-dotenv';
import PantryPage from './screens/PantryPage';
import Header from './components/Header';
import RecipePage from './screens/RecipePage';
import FavoriteRecipePage from './screens/FavoriteRecipePage';
import Login from './screens/Login';


const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET
}

firebase.initializeApp(firebaseConfig);




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

  const contentSwitchHandler = () => {
    if(contentSwitch === 0) {
      setContentSwitch(1);
    }
    else if(contentSwitch === 1){
      setContentSwitch(2);
    }
    else {
      setContentSwitch(1);
    }
  };

  const contentFavoritesHandler = () => {
    setContentSwitch(3);
  }

  let content = <Login contentSwitchHandler = {contentSwitchHandler}/>;
  if(contentSwitch === 1){
    //powerSetHandler(ingredientList);
    content = <PantryPage ingredientInputHandlerMaster = {ingredientInputHandler} ingredientList= {ingredientList} addIngredientHandler= {addIngredientHandler}/>;
  }
  if(contentSwitch === 2){
    content = <RecipePage ingredientList = {ingredientList} contentSwitchHandler = {contentSwitchHandler} user = {user}/>
  }
  if(contentSwitch === 3){
    content = <FavoriteRecipePage user = {user}/>
  }

  if(contentSwitch === 0){
    return(
      <View style={styles.container}>
      <Header title="Welcome to Slug Pantry"/>
      {content}
    </View>
    );
  }
  else if(contentSwitch === 1){
    return (
      <View style={styles.container}>
        <Header title="Your Pantry"/>
        <View style = {styles.buttonContainer}>
        <Button style = {styles.buttonStyle} title='Go To Recipe List' 
        onPress={contentSwitchHandler}/>
        <Button style = {styles.buttonStyle} title= 'Go To Favorites'
        onPress={contentFavoritesHandler}
        />
      </View>
      {content}
      </View>
    );
  }
  else if (contentSwitch === 2){
  return (
    <View style={styles.container}>
      <Header title="Recipe List"/>
      <View style = {styles.buttonContainer}>
        <View>
          <Button style = {styles.buttonStyle} title='Go To Pantry Inventory' 
          onPress={contentSwitchHandler}/>
        </View>
        <View>
          <Button style = {styles.buttonStyle} title= 'Go To Favorites'
          onPress={contentFavoritesHandler}/>
        </View>
      </View>
      {content}
    </View>
  );
  }
  else {
    return (
      <View style={styles.container}>
      <Header title="Your Favorite Recipes"/>
      <View style = {styles.buttonStyle}>
        <Button title='Go To Pantry Inventory' 
        onPress={contentSwitchHandler}/>    
      </View>
      {content}
    </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonStyle: {
    borderColor: 'black',
    flex: 1
  },
  buttonContainer:{
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'

  }
});
