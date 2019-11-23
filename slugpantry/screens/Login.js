import React, {useState} from 'react';
import {
    StyleSheet, 
    View, 
    Text, 
    TextInput, 
    Image, 
    ActivityIndicator, 
    FlatList
} from 'react-native';

const Login = props => { 
    return (
        <View style={styles.screen}>
            <Image>

            </Image>
            <View style={styles.inputContainer}>
                <Text>{'PLease Sign In'}</Text>
                <TextInput
                height='30'
                placeholder="User Name"
                color='grey'
                />
                <TextInput
                secureTextEntry={true}
                height='30'
                placeholder="Password"
                color='grey'
                />
            </View>
        </View>
    );

}
const styles = StyleSheet.create({
    screen: {
        padding: 50
    },
    inputContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center'
    },


})
export default Login