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

  const addIngredientHandler = (keyID) => {
    setIngredientList(currentIngredients => [
      ...currentIngredients, 
      { id: keyID.toString(), value: enterIngredient }
    ]);
  };

  const addIngredientHandlerByVal = (ingredient, keyID) => {
    console.log("ADD INGREDIENT HANDLER BY VAL");
    console.log(keyID);
    setIngredientList(currentIngredients => [
      ...currentIngredients, 
      { id: keyID.toString(), value: ingredient }
    ]);
  };

  deleteItemByID = ingredientId =>{
    console.log("AND THE KEY ID IS");
    console.log(ingredientId);
    var keyRef = firebase.database().ref('/Ingredients').child(ingredientId);
    keyRef.remove();
    setIngredientList(currentIngredients =>{
      return currentIngredients.filter((ingredient) => ingredient.id !== ingredientId)
    })
  }

  const addIngredientMaster = () => {
    key = firebase.database().ref('/Ingredients').push().key;
    firebase.database().ref('/Ingredients').child(key).set({
      item: enterIngredient,
      userID: user.uid
    }).then(function() {
      console.log('Synchronization succeeded');
    })
    addIngredientHandler(key);
  }


  const contentSwitchHandler = (num) => {
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
    content = <PantryPage ingredientInputHandlerMaster = {ingredientInputHandler} ingredientList= {ingredientList} addIngredientHandler= {addIngredientMaster} user= {user} addIngredientHandlerByVal={addIngredientHandlerByVal}/>;
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
        <View style = {styles.buttonStyle}>
          <Button title='Go To Pantry Recipe List' 
          onPress={contentSwitchHandler}/>
          <Button title= 'Go To Favorites'
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
      <View style = {styles.buttonStyle}>
        <Button title='Go To Pantry Inventory' 
        onPress={contentSwitchHandler}/>
        <Button title= 'Go To Favorites'
        onPress={contentFavoritesHandler}
        />
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
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
