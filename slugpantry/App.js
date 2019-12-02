import React, {useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import PantryPage from './screens/PantryPage';
import Header from './components/Header';
import RecipePage from './screens/RecipePage';
import Login from './screens/Login';

//Switch <RecipePage/> to <PantryPage/> if you want to see that instead of whats currently being displayed
export default function App() {

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
    if(contentSwitch === 0){
      console.log("8=================================D")
      setContentSwitch(1);
    }
    else if(contentSwitch ===1){
      setContentSwitch(2);
    }
    else{
      setContentSwitch(1)
    }
  };
  /*let content = <PantryPage ingredientInputHandlerMaster = {ingredientInputHandler} ingredientList= {ingredientList} addIngredientHandler= {addIngredientHandler}/>;
  if(contentSwitch === 1){
    //powerSetHandler(ingredientList);
    content = <RecipePage ingredientList = {ingredientList} contentSwitchHandler = {contentSwitchHandler}/>
  }
*/
  let content = <Login contentSwitchHandler = {contentSwitchHandler}/>;
  if(contentSwitch === 1){
    //powerSetHandler(ingredientList);
    content = <PantryPage ingredientInputHandlerMaster = {ingredientInputHandler} ingredientList= {ingredientList} addIngredientHandler= {addIngredientHandler}/>;
  }
  if(contentSwitch === 2){
    content = <RecipePage ingredientList = {ingredientList} contentSwitchHandler = {contentSwitchHandler}/>
  }

  if(contentSwitch === 0){
    return(
      <View style={styles.container}>
      <Header title="tired"/>
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
  else{
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
/*
return (
  <View style={styles.container}>
    <Header title="Slug Pantry"/>
    <Button title='Switch' 
    onPress={contentSwitchHandler}/>
    {content}
  </View>
);
}*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
