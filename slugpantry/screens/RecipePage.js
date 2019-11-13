import React, {useState} from 'react';
import {StyleSheet, View, Text, ActivityIndicator, FlatList} from 'react-native';

import Card from '../components/Card';


const RecipePage = props => {


    const [dataSource, setDataSource] = useState(null);
    const [isLoading,setIsLoading] = useState(true);
    
    const dataSourceHandler = source => {
        setDataSource(source);
    }

    componentDidMount =  async () => {   
        return fetch('https://api.edamam.com/search?q=chicken&app_id=$e1013624&app_key=$1053882cde32aadeb1a812eb85e3b572')
        .then(console.log("found API"))
        .then ((response) => response.json() )
        .then( (responseJson) => {
            dataSourceHandler(responseJson.hits);
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error)
        }) 
    }
    


    let content = <ActivityIndicator/>
    if(isLoading){
        componentDidMount();
    }
    if(!isLoading){
        content = dataSource.map((val, key) => {
            return <View key={key} style={styles.item}>
              <Card title={val.recipe.label}
                    url={val.recipe.url}
                    source={val.recipe.image}/>
            </View>
        });
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