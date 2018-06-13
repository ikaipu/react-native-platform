import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

type Props = {
  navigation: Function
}
export default class Home extends React.Component<Props> {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Home Screen</Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Menu')}>
          <Text>Go to Menu</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
