import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Card = ({ iconName, iconLibrary, iconColor, title, date, onPress }) => {
  const IconComponent = iconLibrary;

  return (
    <TouchableOpacity style={styles.box} onPress={onPress}>
      <IconComponent name={iconName} size={160} color={iconColor} style={styles.icon} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>{date}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 340,
    height: 340,
    borderRadius: 8,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginBottom: 10,
  },
  title: {
    paddingTop: 40,
    color: '#87CEFA',
    fontSize: 45,
    fontFamily: 'AveriaLibre-Regular',
  },
  date: {
    color: 'gray',
    fontFamily: 'AveriaLibre-Regular',
  },
});

export default Card;
