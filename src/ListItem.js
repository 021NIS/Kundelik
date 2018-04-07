import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const ListItem = props => {
  const { task } = props;
  const { isDone, text, date } = task;

  console.log(isDone, 'isDone');

  return (
    <View style={styles.container}>
      <Text style={styles.title} numberOfLines={0}>
        {text}
      </Text>
      <Text style={styles.title} numberOfLines={0}>
        {date}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  title: {
    fontSize: 15,
    color: 'black',
    marginVertical: 10,
    marginHorizontal: 20
  }
});
