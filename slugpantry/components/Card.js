import React, {useState} from 'react';
import {StyleSheet, View, Text, Image, Button, Linking} from 'react-native';
import * as firebase from 'firebase';



const Card = props  => {
    let favorite = props.favorite;
    let startingButtonTitle = 'Favorite';
    if(favorite) {
        startingButtonTitle = 'Unfavorite';
    }

    const [buttonTitle, setButtonTitle] = useState(startingButtonTitle);
    //const [favorite, setFavorite] = useState(props.favorite);
    //let favorite = props.favorite;
    let key = null;
    const linkHandler = () => {
        Linking.openURL(props.url).catch((err) => console.error('An error occurred', err));
    };
    
    const favoriteBooleanHandler = () => {
        if(favorite) {
            favorite = false;
        }
        else {
            favorite = true;
        }
    };

    const addToFavorites = (image, label, url, userID) => {
        
        key = firebase.database().ref('/Recipes').push().key;
        firebase.database().ref('/Recipes').child(key).set({
            image: image,
            label: label,
            url: url,
            userID: userID
        }).then(function() {
            //console.log('Synchronization succeeded');
            favoriteBooleanHandler();
        })
        .catch(function(error) {
            console.log('Synchronization failed');
        });
        
    };

    const removeFromFavorite = async () => {
        
        var keyRef = firebase.database().ref('/Recipes').child(key);
        keyRef.remove()
        .then(function() {
            //console.log("Remove succeeded.")
            favoriteBooleanHandler();
        })
        .catch(function(error) {
            console.log("Remove failed: " + error.message)
        });
    }

    const buttonHandler = (image, label, url, userID) => {
        
        if(favorite) {
            removeFromFavorite();
            setButtonTitle('Favorite');
        }
        else {
            addToFavorites(image, label, url, userID);
            setButtonTitle('Unfavorite');
            
        }
    }

    return(
        <View style={styles.card}>
            <Image source = {{uri: props.source}}
            style={styles.imageStyle} />
            <Text style={styles.titleStyle} onPress={linkHandler}>{props.title}</Text>
            <Button 
                title = {buttonTitle}
                onPress = {() => buttonHandler(props.source, props.title, props.url, props.userID)}/>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        shadowColor: 'rgb(0,0,0)',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8, 
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        height: 140,
        //maxHeight: '20%',
        //justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 10
    },
    titleStyle:{
        flex: 2,
        fontSize: 18,
        fontFamily: 'sans-serif-medium'
    },
    imageStyle:{
        width: 100,
        height: 100,
        marginRight: 10
    }
});

export default Card;