import React, {useState} from 'react';
import {StyleSheet, View, Alert, ActivityIndicator, FlatList} from 'react-native';
import * as firebase from 'firebase';

import Card from '../components/Card';

const FavoriteRecipePage = (props) => {

    const[favoriteRecipeList, setFavoriteRecipeList] = useState([]);
    const[isLoading , setIsLoading] = useState(true);
    

    const favoriteRecipeListHandler = (newData) => {
        setFavoriteRecipeList(newData);
    };

    const loadingHandler = () => {
        setIsLoading(false);
    } 
    

    findFirebaseData = async () => {
        if(!isLoading) {
            return;
        }
        await firebase.database().ref('Recipes/').once('value', function (snapshot) {
            //console.log(snapshot.val());
            let userID = props.user.uid;
            var data = [];
            snapshot.forEach(function(childSnapshot) {
                
                var key = childSnapshot.val().userID;
                
                //console.log( props.user.uid + " :" + key);
                
                if(userID === key) {
                    console.log
                    data.push(childSnapshot.val());
                }
            });
            
            favoriteRecipeListHandler(data);
        })
        .catch((error) => {
            console.log(error);
        });
        loadingHandler();
    };
    let content = <ActivityIndicator/>
    
    if(isLoading){
        findFirebaseData();
    }
    else{
        
        content = <FlatList
            keyExtractor={(item, index) => item.id}
            data={favoriteRecipeList}
            renderItem={itemData => (
            //console.log(itemData),
            <View style={styles.item}>
                <Card 
                    title={itemData.item.label}
                    url={itemData.item.url}
                    source={itemData.item.image}
                    userID = {props.user.uid}
                    favorite = {true}
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

export default FavoriteRecipePage;