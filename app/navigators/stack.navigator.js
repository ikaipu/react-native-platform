import { createStackNavigator } from 'react-navigation';
import Home from '../containers/home';
import Menu from '../containers/menu';

const StackNavigator = createStackNavigator({
  Home: { screen: Home },
  Menu: { screen: Menu },
});

export default StackNavigator;
