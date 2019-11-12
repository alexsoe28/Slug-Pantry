import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  View,
  FlatList
} from 'react-native';

import { MonoText } from '../components/StyledText';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';

const HomeScreen = props => {

  const [enterIngredient, setEnterIngredient] = useState('');
  const [ingredientList, setIngredientList] = useState([]);

  const IngredientInputHandler = enteredText => {
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
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder="Enter Ingredient..." 
          style={styles.input}
          onChangeText={IngredientInputHandler}
          value={enterIngredient}
        />
        <Button 
          title="+" 
          onPress={addIngredientHandler}
        />
      </View>
          <FlatList 
            keyExtractor={(item, index) => item.id}
            data={ingredientList}            
            renderItem={itemData => (
              <View style={styles.listItem}>
                <Text>{itemData.item.value}</Text>  
                <View style={styles.buttonContainer}>
                  <Button title="Remove"
                  color = 'black'
                  onPress={deleteItemByID.bind(this, itemData.item.id)}
                  />
                </View>
              </View>
            )}
          />       
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  screen: {
    padding: 50
  },
  inputContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center'
  },
  input: {
    width: '80%', 
    borderBottomColor: 'black', 
    borderBottomWidth: 1, 
    padding: 10
  },
  container: {
    padding: 50,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  listItem: {
    padding: 5,
    margin: 3,
    backgroundColor: 'lemonchiffon',
    borderColor: 'black',
    borderWidth:1
  },
  buttonContainer: {
    width: 80,
    height: 40,
    flexDirection: 'row',
    alignItems:'flex-end',
    backgroundColor: 'lightcoral'
  }
});

export default HomeScreen;