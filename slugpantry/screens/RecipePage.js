import React, {useState} from 'react';
import {StyleSheet, View, Alert, ActivityIndicator, FlatList} from 'react-native';

import Card from '../components/Card';
import { SLUGPANTRY_KEY, SLUGPANTRY_ID } from 'react-native-dotenv';


const RecipePage = props => {

    const[recipeList, setrecipeList] = useState([]);
    const [isLoading,setIsLoading] = useState(true);

    const recipeListHandler = source => {
        for(let i = 0; i < source.length; i++) {
            setrecipeList(currentRecipes => [
                ...currentRecipes, source[i]]);
        }
    }
    

    fetchAPI =  async () => {   
        if(props.ingredientList.length > 0) {
            for(let i = 0; (i < props.ingredientList.length) && (i < 6); i++) {
                fetch('https://api.edamam.com/search?q='+ props.ingredientList[i].value +'&app_id=' + SLUGPANTRY_ID +'&app_key=' + SLUGPANTRY_KEY)
                //.then(console.log(i))
                .then ((response) => response.json() )
                .then( (responseJson) => {
                    if (responseJson.lenght === 0){
                        alert("No matches found for " + props.ingredientList[i].value + ". Check speeling or enter different pantry items")
                    }
                    //console.log(responseJson.hits);
                    recipeListHandler(responseJson.hits);             
                })
                .catch((error) => {
                    console.log(error);
                })
            }
            setIsLoading(false);
        }
        else {
            Alert.alert('No ingredients submitted', 'Please return to the pantry and input ingredients.', [{text: 'Okay', style: 'destructive', onPress: props.contentSwitchHandler}]);
        }
    }
    

    let content = <ActivityIndicator/>
    if(isLoading){
        fetchAPI();
    }
    if(!isLoading){
        
        content = <FlatList
            keyExtractor={(item, index) => item.id}
            data={recipeList}
            renderItem={itemData => (
            //console.log(itemData.item.recipe.label),
            <View style={styles.item}>
                <Card 
                    title={itemData.item.recipe.label}
                    url={itemData.item.recipe.url}
                    source={itemData.item.recipe.image}
                    userID = {props.user.uid}
                    favorite= {false}
                    />
            </View>)}/>;
    }
    
    return(
        
        <View style={styles.screen}>
            {content}
        </View>
    );
};

const styles = StyleSheet.create({
    screen:{
        flex: 1
    }
});

export default RecipePage;