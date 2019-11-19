import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Alert, ActivityIndicator, FlatList} from 'react-native';

import Card from '../components/Card';
import { SLUGPANTRY_KEY, SLUGPANTRY_ID } from 'react-native-dotenv';


const RecipePage = props => {

    const[recipeList, setrecipeList] = useState([]);
    const [dataSource, setDataSource] = useState(null);
    const [isLoading,setIsLoading] = useState(true);
    
    const dataSourceHandler = source => {
        setDataSource(source);
        recipeListHandler(source);
    }

    const recipeListHandler = source => {
        for(let i = 0; i < source.length; i++) {
            setrecipeList(currentRecipies => [
                ...currentRecipies, source[i]]);
        }
    }
    
    componentDidMount =  async () => {   
        if(props.ingredientList.length > 0) {
            for(let i = 0; i < props.ingredientList.length; i++) {
                fetch('https://api.edamam.com/search?q='+ props.ingredientList[i].value +'&app_id=' + SLUGPANTRY_ID +'&app_key=' + SLUGPANTRY_KEY)
                //.then(console.log(i))
                .then ((response) => response.json() )
                .then( (responseJson) => {
                    dataSourceHandler(responseJson.hits);             
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
        componentDidMount();
    }
    if(!isLoading){
        
        content = <FlatList
            keyExtractor={(item, index) => item.id}
            data={recipeList}
            renderItem={itemData => (
            console.log(itemData.item.recipe.label),
            <View style={styles.item}>
                <Card 
                    title={itemData.item.recipe.label}
                    url={itemData.item.recipe.url}
                    source={itemData.item.recipe.image}
                    //key={itemData.item.id}
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