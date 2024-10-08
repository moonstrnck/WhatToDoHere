import { Link } from 'expo-router';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function Header({ userInfo }) {
  return (
    <View style={styles.header}>
      <Link href="/" style={styles.title}>
        <Image
          source={require('../assets/icons/logo.png')}
          style={styles.logoImage}
        />
        <Text style={styles.whatToDoHere}>WhatToDoHere</Text>
      </Link>
      <TouchableOpacity
        style={styles.profileIcon}
        onPress={() => router.push({ pathname: '/home/users' })}
      >
        <Image
          source={
            userInfo.photoURL
              ? { uri: userInfo.photoURL }
              : require('../assets/icons/icon-user-default.png')
          }
          style={styles.profileImage}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 75,
    backgroundColor: '#fff',
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  whatToDoHere: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Opposit-Bold',
  },
  logoImage: {
    width: 30,
    height: 30,
    marginTop: -2,
    marginRight: 3,
  },
  profileIcon: {
    width: 35,
    height: 35,
    borderRadius: 35,
    backgroundColor: '#EEEEEE',
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  loginButton: {
    fontSize: 18,
    fontFamily: 'Opposit-bold',
  },
});
