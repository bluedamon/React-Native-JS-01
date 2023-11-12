import { useState } from 'react';
import GoalIteam from './components/GoalItem';
import GoalInput from './components/GoalInput';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  function startAddGoalHandler(){
    setModalIsVisible(true);
  }

  function endAddGoalHandler(){
    setModalIsVisible(false);
  };

  function addGoalHandler(enteredGoalText){
    setCourseGoals((currentCourseGoals) => [...currentCourseGoals, {text: enteredGoalText, id: Math.random().toString()}]);
    endAddGoalHandler();
  };

  function deleteGoalHandler(id){
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  };

  return (
    <>
      <StatusBar style='light' />
      <View style={styles.appContainer}>
        <Button title='Add New Goal' color='#a065ec' onPress={startAddGoalHandler}/>
        <GoalInput visible={modalIsVisible} onAddGoal={addGoalHandler} onCancel={endAddGoalHandler}/>
        <View style={styles.goalsContainer}>
          <FlatList alwaysBounceVertical={false} data={courseGoals} keyExtractor={(item, index) => {return item.id;}} renderItem={(itemData) => {return (<GoalIteam id={itemData.item.id} text={itemData.item.text} onDeleteItem={deleteGoalHandler}/>)}} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 5,
  },
});
