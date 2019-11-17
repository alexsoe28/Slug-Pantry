import React, {useState} from 'react';
import {StyleSheet, View, Text, ActivityIndicator, FlatList} from 'react-native';

import Card from '../components/Card';


const Loop = props => {


    const [dataSource, setDataSource] = useState(null);
    const [isLoading,setIsLoading] = useState(true);
    var ingredients = ["chicken", "banana", "nutella", "beets", "ground beef"];
    //var ingredientSet = new setDataSource(ingredients);
    var powerSet = [[]];
    var recipes = [];
    //var images = [];
    //var links = [];

    function powerize(array){
        for (var i = 0; i < array.length; i++){
            for (var j = 0; j < powerSet.length; j++){
                powerSet.push(powerSet[j].concat("+" + array[i]))
                console.log(powerSet[i])
            }
        }
    }

    const dataSourceHandler = source => {
        setDataSource(source);
    }

    componentDidMount =  async () => {   
        for (var i = 0; i < powerSet.length; i++){
            return fetch('https://api.edamam.com/search?q=powerSet[i]&app_id=$e1013624&app_key=$1053882cde32aadeb1a812eb85e3b572')
        .then(console.log("found API"))
        .then ((response) => response.json() )
        .then( (responseJson) => {
            dataSourceHandler(recipes.concat(responseJson.hits));
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error)
        }) 
        }
        
    }
    

    let content = <ActivityIndicator/>
    if(isLoading){
        componentDidMount();
    }
    if(!isLoading){
        powerize(ingredients)
        content = <FlatList
            keyExtractor={(item, index) => item.id}
            data={dataSource}
            renderItem={itemData => (<View style={styles.item}>
            <Card title={itemData.item.recipe.label}
                  url={itemData.item.recipe.url}
                  source={itemData.item.recipe.image}
                  key={itemData.item.id}/>
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

export default Loop;