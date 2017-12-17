import { StackNavigator } from 'react-navigation';
import TodoTabNavigator from './TodoTabNavigator';

const routeConfig = {
  TodoMain: {
    screen: TodoTabNavigator,
  },
};

const stackConfig = {
  navigationOptions: {},
  headerMode: 'none',
};

const TodoAppNavigator = StackNavigator(routeConfig, stackConfig);

export default TodoAppNavigator;
