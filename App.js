import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from './components/header';
import TodoItem from './components/todoitem';
import AddTodo from './components/addtodo';
import SandBox from './components/sandbox';

export default function App() {

  const [todos, setTodos] = useState([
    { text: 'make a coffee', key: 1 },
    { text: 'create an app', key: 2 },
    { text: 'play ML', key: 3 },
    { text: 'study react-native', key: 4 },
  ]);

  const pressHandler = (key) => {
    setTodos((prevTodos) => {
      return prevTodos.filter(todo => todo.key != key);
    })
  }

  const submitHandler = (text) => {
    if (text.length > 3) {
      setTodos((prevTodos) => {
        return [
          { text: text, key: Math.random().toString() },
          ...prevTodos
        ]
      })
    }
    else {
      Alert.alert('OOPS!', 'Todos must be over 3 chars long', [
        {text: 'Understood', onPress: () => console.log('Alert Closed')}
      ])
    }
  }

  return (
    // <SandBox />
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      console.log('Disimissed Keyboard')
    }}>
      <View style={styles.container}>
        <Header />
        <View style={styles.contents}>
          <AddTodo submitHandler={submitHandler} />
          <View style={styles.list}>
            <FlatList 
              data={todos} 
              renderItem={({ item }) => (
                <TodoItem item={item} pressHandler={pressHandler} />
              )}
              />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contents: {
    flex: 1,
    padding: 40
  },
  list: {
    flex: 1,
    marginTop: 20
  }
});
