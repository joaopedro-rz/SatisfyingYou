import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { PaperProvider, MD3LightTheme as DefaultTheme } from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {setResultado} from '../../Redux/ResultadosSlice';
import { db } from '../config/firebase';
import { collection, addDoc, increment, updateDoc, doc } from 'firebase/firestore';
import {useSelector} from 'react-redux';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#372775',
  },
  fontConfig: {
    ...DefaultTheme.fontConfig,
    primary: 'AveriaLibre-Regular',
  },
};

const Coleta = (props) => {
  
  const dispatch = useDispatch();
  const pesquisaId = useSelector(state => state.pesquisa.id);
  console.log('ID puxado no Redux: coletya', pesquisaId);

  const goTo = (categoria) => {
    updateDoc(doc(db, "pesquisas", pesquisaId), {
      [categoria]: increment(1)
    });
    props.navigation.navigate('Agradecimentos');
    setTimeout(() => {
      props.navigation.goBack();
    }, 3000);
  };
  

  const goBack = async () => {
    props.navigation.goBack();
  };

  return (
    <PaperProvider theme={theme}>
      <View style={styles.view}>
        <View style={styles.viewText}>
          <Text style={styles.text}>O que você achou da SECOMP 2023?</Text>
        </View>

        <View style={styles.viewIcons}>
          <TouchableOpacity style={styles.iconWrapper} onPress={() => goTo('pessimo')}>
            <Icon name="sentiment-very-dissatisfied" size={100} color="#FF0000" />
            <Text style={styles.iconLabel}>Péssimo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper} onPress={() => goTo('ruim')}>
            <Icon name="sentiment-dissatisfied" size={100} color="#FF4500" />
            <Text style={styles.iconLabel}>Ruim</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper} onPress={() => goTo('neutro')}>
            <Icon name="sentiment-neutral" size={100} color="#FFD700" />
            <Text style={styles.iconLabel}>Neutro</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper} onPress={() => goTo('bom')}>
            <Icon name="sentiment-satisfied-alt" size={100} color="#32CD32" />
            <Text style={styles.iconLabel}>Bom</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper} onPress={() => goTo('excelente')}>
            <Icon name="sentiment-very-satisfied" size={100} color="#008000" />
            <Text style={styles.iconLabel}>Excelente</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={goBack} style={styles.invisibleButton}></TouchableOpacity>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: theme.colors.primary,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  viewText: {
    marginTop: 100,
    marginBottom: 20,
  },
  text: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: theme.fontConfig.primary,
  },
  invisibleButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 100,
    height: 100,
    zIndex: 10,
  },
  viewIcons: {
    marginTop: 140,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '90%',
  },
  iconWrapper: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  iconLabel: {
    color: 'white',
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center',
  },
});

export default Coleta;
