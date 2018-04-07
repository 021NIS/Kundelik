import { StackNavigator } from 'react-navigation';
import Tasks from './src/Tasks';

const App = StackNavigator({
  Tasks: { screen: Tasks }
  // TODO: Включите новую компоненту в стэк
});

export default App;
