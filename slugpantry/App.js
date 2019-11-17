import React, {useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import PantryPage from './screens/PantryPage';
import Header from './components/Header';
import RecipePage from './screens/RecipePage';
import Loop from './screens/Loop'

//Switch <RecipePage/> to <PantryPage/> if you want to see that instead of whats currently being displayed
export default function App() {

  const [contentSwitch, setContentSwitch] = useState(0);

  const contentSwitchHandler = () => {
    if(contentSwitch === 0){
      setContentSwitch(1);
    }
    else{
      setContentSwitch(0);
    }
  };

  let content = <PantryPage/>;
  if(contentSwitch === 1){
    content = <Loop/>
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
