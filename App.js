import { StyleSheet, Text, View, TextInput, Button , FlatList} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import TodoItem from './components/TodoItem'; 

export default function App() {
  const [enteredTaskText, setEnteredTaskText] = useState('');
  const [tasks, setTasks] = useState([]); 

  function taskInputHandler(enteredText) {
    setEnteredTaskText(enteredText);
  }

  function deleteTaskHandler(id) {
setTasks((currentTasks) => {
return currentTasks.filter((task) => task.id !== id);
});
}

  function addTaskHandler() {
    if (enteredTaskText.trim().length === 0) {
      return;
    }

    setTasks((currentTasks) => [
      ...currentTasks,
      { id: Math.random().toString(), text: enteredTaskText },
    ]);
    setEnteredTaskText('');
  }

  return (
    <SafeAreaView style={styles.appContainer}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>My Todo List</Text>
        
        {/* 'inputContainer' etrafındaki {} kaldırıldı */}
        <View style={styles.inputContainer}> 
          <TextInput
            style={styles.textInput}
            placeholder="Add a new task..."
            onChangeText={taskInputHandler}
            value={enteredTaskText}
          />
          <Button 
            title="Add" 
            onPress={addTaskHandler} 
          />
        </View>

        {/* List area */}
        <View style={styles.listContainer}>
          <FlatList
            data={tasks}
            renderItem={({ item }) => (
              <TodoItem text={item.text}
              id={item.id} 
onDelete={deleteTaskHandler} />
            )}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No tasks yet. Add one!</Text>
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#f0f2f5', 
  },
  listContainer: {
    flex: 5, 
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 10,
  },
  textInput: {
    flex: 1, 
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    marginRight: 10,
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});