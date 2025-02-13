import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PaperProvider, MD3LightTheme as DefaultTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#372775',
    secondary: '#2B1D62',
    fontColor: '#FFFFFF',
  },
  fontConfig: {
    ...DefaultTheme.fontConfig,
    primary: 'AveriaLibre-Regular',
  },
};
const Agradecimentos = () => {
  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <Text style={styles.text1}>Obrigado por participar da pesquisa!</Text>
        <Text style={styles.text2}>Aguardamos você no próximo ano!</Text>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text1: {
    color: 'white',
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: theme.fontConfig.primary,
  },
  text2: {
    color: 'white',
    fontSize: 35,
    textAlign: 'center',
    fontFamily: theme.fontConfig.primary,
  },
});

export default Agradecimentos;

