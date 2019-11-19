import React, {useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import PantryPage from './screens/PantryPage';
import Header from './components/Header';
import RecipePage from './screens/RecipePage';
import Loop from './screens/Loop'

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
      setContentSwitch(1);
    }
    else{
      setContentSwitch(0);
    }
  };

  let content = <PantryPage ingredientInputHandlerMaster = {ingredientInputHandler} ingredientList= {ingredientList} addIngredientHandler= {addIngredientHandler}/>;
  if(contentSwitch === 1){
    content = <RecipePage ingredientList = {ingredientList} contentSwitchHandler = {contentSwitchHandler}/>
  }

  return (

    <View style={styles.container}>
      <Header title="Slug Pantry"/>
      <Button title='Switch' 
      onPress={contentSwitchHandler}/>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
