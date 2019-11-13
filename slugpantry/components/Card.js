import React from 'react';
import {StyleSheet, View, Text, Image, Linking} from 'react-native';

const Card = props  => {
    
    let key = props.key;

    const linkHandler = () => {
        Linking.openURL(props.url).catch((err) => console.error('An error occurred', err));
    };
    
    return(
        <View style={styles.card}>
            <Image source = {{uri: props.source}}
            style={styles.imageStyle} />
            <Text style={styles.titleStyle} onPress={linkHandler}>{props.title}</Text>
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