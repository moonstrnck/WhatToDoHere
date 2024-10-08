import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from 'expo-router';

import { useAtom } from 'jotai';
import { userInfoAtom } from '../atoms';

import { getUserInfo } from '../services/firebaseService';
import { GUEST_USER_KEY } from '../services/asyncStorageService';

export default function TodoItem({ todo, onCheckBoxToggle }) {
  const [userInfo] = useAtom(userInfoAtom);
  const [checked, setChecked] = useState(todo.completed);
  const [friendName, setFriendName] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchFriendName = async () => {
      if (
        todo.assignedBy &&
        userInfo &&
        todo.assignedBy !== userInfo.uid &&
        todo.assignedBy !== GUEST_USER_KEY
      ) {
        try {
          const friendInfo = await getUserInfo(todo.assignedBy);
          if (friendInfo && friendInfo.username) {
            setFriendName(friendInfo.username);
          } else {
            setFriendName('알 수 없는 사용자');
          }
        } catch (error) {
          console.error('Error fetching friend info:', error);
          setFriendName('삭제된 계정');
        }
      }
    };

    fetchFriendName();
  }, [todo.assignedBy, userInfo.uid]);

  const handleCheckBoxToggle = async () => {
    const newCompletedState = !checked;
    setChecked(newCompletedState);
    await onCheckBoxToggle(todo.id, newCompletedState);
  };

  const handleEditTodo = () => {
    console.log(todo);
    navigation.navigate('todo/index', {
      mode: 'edit',
      locationId: todo.locationId,
      todoId: todo.id,
    });
  };

  return (
    <View style={styles.todoItem}>
      <TouchableOpacity
        onPress={handleCheckBoxToggle}
        style={styles.checkBox}
        testID="checkbox"
      >
        <Image
          source={
            checked
              ? require('../assets/icons/icon-checkbox-checked.png')
              : require('../assets/icons/icon-checkbox.png')
          }
          style={styles.checkBoxImage}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleEditTodo}
        style={styles.textContainer}
        testID="todo-text"
      >
        <Text style={styles.title}>{todo.title}</Text>
        {friendName && <Text style={styles.friend}>✍🏻 {friendName}</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBox: {
    paddingVertical: 10,
    paddingRight: 10,
  },
  checkBoxImage: {
    width: 14,
    height: 14,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginTop: 2,
    fontFamily: 'Opposit-Regular',
    fontSize: 14,
    color: '#202020',
  },
  friend: {
    marginLeft: 'auto',
    fontFamily: 'Opposit-Regular',
    fontSize: 12,
    color: '#5B84EF',
  },
});
