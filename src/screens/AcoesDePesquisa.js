import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {PaperProvider, MD3LightTheme as DefaultTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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

const AcoesDePesquisa = props => {

  const goToRelatorio = () => {
    props.navigation.navigate('Relatorio');
  }

  const goToColeta = () => {
    props.navigation.navigate('Coleta');
  };

  const goModificarPesquisa = () => {
    props.navigation.navigate('ModificarPesquisa');
  };

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <TouchableOpacity onPress={goModificarPesquisa} style={styles.card}>
            <Icon
              name="file-document-edit-outline"
              size={120}
              color="#FFFFFF"
            />
            <Text style={styles.Text}>Modificar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={goToColeta}>
            <Icon name="checkbox-multiple-outline" size={120} color="#FFFFFF" />
            <Text style={styles.Text}>Coletar dados</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={goToRelatorio}>
            <Icon name="chart-donut" size={120} color="#FFFFFF" />
            <Text style={styles.Text}>Relatório</Text>
          </TouchableOpacity>
        </View>
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
  Text: {
    fontSize: 36,
    color: theme.colors.fontColor,
    marginBottom: 10,
    fontFamily: theme.fontConfig.primary,
    marginTop: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
  },
  card: {
    backgroundColor: theme.colors.secondary,
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  cardText: {
    color: theme.colors.fontColor,
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default AcoesDePesquisa;
