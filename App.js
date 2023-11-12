import { useState } from 'react';
import GoalIteam from './components/GoalItem';
import GoalInput from './components/GoalInput';
import { StyleSheet, View, FlatList } from 'react-native';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  
  function addGoalHandler(enteredGoalText){
    setCourseGoals((currentCourseGoals) => [...currentCourseGoals, {text: enteredGoalText, id: Math.random().toString()}]);
  };

  function deleteGoalHandler(id){
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  };

  return (
    <View style={styles.appContainer}>
      <GoalInput onAddGoal={addGoalHandler}/>
      <View style={styles.goalsContainer}>
        <FlatList alwaysBounceVertical={false} data={courseGoals} keyExtractor={(item, index) => {return item.id;}} renderItem={(itemData) => {return (<GoalIteam id={itemData.item.id} text={itemData.item.text} onDeleteItem={deleteGoalHandler}/>)}} />
      </View>
    </View>
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
