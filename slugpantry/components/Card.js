import React from 'react';
import {StyleSheet, View, Text, Image, Linking} from 'react-native';

const Card = props  => {
    
    let url = 'http://www.seriouseats.com/recipes/2011/12/chicken-vesuvio-recipe.html';
    
    const linkHandler = () => {
        Linking.openURL(url).catch((err) => console.error('An error occurred', err));
    };
    
    return(
        <View style={styles.card}>
            <Image source = {{uri: 'https://www.edamam.com/web-img/e12/e12b8c5581226d7639168f41d126f2ff.jpg'}}
            style={styles.imageStyle} />
            <Text style={styles.titleStyle} onPress={linkHandler}>Chicken Paprikash</Text>
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
        maxHeight: '20%',
        //justifyContent: 'space-between',
        flexDirection: 'row',
        margin: 10
    },
    titleStyle:{
        fontSize: 24,
        fontFamily: 'sans-serif-medium'
    },
    imageStyle:{
        width: 100,
        height: 100,
        marginRight: 10
    }
});

export default Card;