import React, { Component } from 'react';
import { FlatList, Alert, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import prompt from 'react-native-prompt-android';
import { ListItem } from './ListItem';

class Tasks extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: 'Kundelik',
      headerLeft: (
        <Icon
          name="ios-trash-outline"
          size={30}
          style={{
            padding: 10
          }}
          onPress={params.onRemoveAllPress}
        />
      ),
      headerRight: (
        <Icon
          name="ios-add-outline"
          size={30}
          style={{
            padding: 10
          }}
          onPress={params.onAddPress}
        />
      )
    };
  };

  state = {
    tasks: []
  };

  componentDidMount() {
    this.props.navigation.setParams({
      onAddPress: this.onAddPress,
      onRemoveAllPress: this.onRemoveAllPress
    });
    this.getAllTasks();
  }

  onAddPress = () =>
    prompt(
      'Добавить задачу',
      '',
      [
        {
          text: 'Отмена',
          style: 'cancel'
        },
        {
          text: 'Добавить',
          onPress: this.onItemAddPress
        }
      ],
      {
        cancelable: false,
        placeholder: 'Купить подарок Маме 🎁'
      }
    );

  onItemAddPress = async text => {
    console.log('text', text);
    if (text !== '') {
      const { tasks } = this.state;
      const task = {
        id: Math.random()
          .toString(16)
          .slice(2),
        isDone: false,
        text,
        date: new Date()
      };
      tasks.push(task);
      AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      this.getAllTasks();
    }
  };

  onRemoveAllPress = () => {
    Alert.alert(
      'Удалить все задачи?',
      '',
      [
        {
          text: 'Отмена',
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: this.onOKButtonPress
        }
      ],
      { cancelable: false }
    );
  };

  onOKButtonPress = async () => {
    try {
      await AsyncStorage.clear();
      this.getAllTasks();
    } catch (error) {
      console.log(error);
    }
  };

  onDonePress = () => {};

  getAllTasks = async () => {
    const tasks = await AsyncStorage.getItem('tasks');
    this.setState({
      tasks: tasks === null ? [] : JSON.parse(tasks)
    });
  };

  keyExtractor = item => item.id;

  renderItem = ({ item }) => <ListItem task={item} />;

  render() {
    const { tasks } = this.state;
    return (
      <FlatList
        data={tasks}
        extraData={this.state}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
      />
    );
  }
}

export default Tasks;
