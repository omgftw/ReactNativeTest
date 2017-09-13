import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, FlatList } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={{ marginTop: 40 }} >
        <Text>React Native test app:</Text>
        <TodoContainer />
      </View>
    );
  }
}

let todoKey = 0;

class Todo {
  constructor(val) {
    this.key = todoKey++;
    this.value = val;
  }
}

class TodoItem extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  removeTodo = (item) => {
    this.props.onRemove(item);
  };

  render() {
    return <View style={styles.flatListContainer}>
      <Text style={styles.flatListItem}>{this.props.todo.value}</Text>
      <Button color="red" onPress={() => { this.removeTodo(this.props.todo) }} title=" - " />
    </View>
  }

}

class TodoContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      input: '',
      // Test data
      todos: new Array(1000).fill(null).map(() => { return new Todo('Test Data ' + todoKey) })
    };
  }

  handleInput = (value) => {
    this.setState({
      input: value
    });
  };

  addTodo = () => {
    if (this.state.input === '') return;
    // this.props.addTodo(this.state.input);
    this.setState({
      input: '',
      todos: [...this.state.todos, new Todo(this.state.input)]
    });
  };

  removeTodo = (item) => {
    var index = this.state.todos.indexOf(item);
    if (index > -1) {
      this.setState({
        todos: [...this.state.todos.slice(0, index), ...this.state.todos.slice(index + 1)]
      });
    }
  };

  render() {
    return <View>
      <TextInput style={styles.addTodoInput} onChangeText={this.handleInput} value={this.state.input} />
      <Button title="Add Todo" onPress={this.addTodo} />
      <FlatList data={this.state.todos} renderItem={({ item }) => <TodoItem todo={item} onRemove={this.removeTodo} />} />
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addTodoInput: {
    marginTop: 20,
    marginBottom: 20,
  },
  flatListContainer: {
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  flatListItem: {
    flex: 1,
  },
});
