import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import Card from '../components/Card';




const RecipePage = props => {

    return(
        <View>
            <Card/>
        </View>
    );
};

const styles = StyleSheet.create({
    screen:{
        flex: 1
    }
});

export default RecipePage;