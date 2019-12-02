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
    else if(contentSwitch === 2){
      setContentSwitch(1);
    }
    else {
      setContentSwitch(2);
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
      <Header title="Slug Pantry"/>
      {content}
    </View>
    );
  }
  else if(contentSwitch === 1){
    return (
      <View style={styles.container}>
        <Header title="Slug Pantry"/>
        <Button title='Recipe List' 
        onPress={contentSwitchHandler}/>
        {content}
      </View>
    );
  }
  else if (contentSwitch === 2){
  return (
    <View style={styles.container}>
      <Header title="Slug Pantry"/>
      <Button title='Pantry Inventory' 
      onPress={contentSwitchHandler}/>
      {content}
      <Button title= 'Go To Favorites'
      onPress={contentFavoritesHandler}
      />
    </View>
  );
  }
  else {
    return (
      <View style={styles.container}>
      <Header title="Slug Pantry"/>
      <Button title='Pantry Inventory' 
      onPress={contentSwitchHandler}/>
      {content}
    </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
