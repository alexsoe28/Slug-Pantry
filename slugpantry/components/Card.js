import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

const Card = props => {
    return(
        <View style={styles.card}>
            <Image source = {{uri: 'https://www.edamam.com/web-img/e12/e12b8c5581226d7639168f41d126f2ff.jpg'}}
            style={styles.imageStyle} />
            <Text>Chicken Paprikash</Text>
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
        justifyContent: 'space-between'
    },
    titleStyle:{
        
    },
    imageStyle:{
        width: '40%',
        height: '100%'
    }
});

export default Card;