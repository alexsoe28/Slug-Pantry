import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null
    }
  }

  componentDidMount () {   
    return fetch('https://api.edamam.com/search?q=banana nutella&app_id=$e1013624&app_key=$1053882cde32aadeb1a812eb85e3b572')
      .then ((response) => response.json() )
      .then( (responseJson) => {

        this.setState({
          isLoading:false,
          dataSource: responseJson.hits,

        })
      })
    
      .catch((error) => {
        console.log(error)
      }) 
  }

  render() { 

    if(this.state.isLoading){

      return(
        <View style = {styles.container}>
          <ActivityIndicator />
        </View>
      )
    }

    else {

      let recipes = this.state.dataSource.map((val, key) => {
        return <View key={key} style={styles.item}>
          <Text>{val.recipe.label}</Text>
        </View>
      });

      return (

        <View style={styles.container}>
          {recipes}
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item:{
    flex: 1,
    alignSelf: 'stretch',
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
