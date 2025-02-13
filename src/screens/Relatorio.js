import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {PaperProvider, MD3LightTheme as DefaultTheme} from 'react-native-paper';
import PieChart from 'react-native-pie-chart';
import {useSelector} from 'react-redux';
import {db} from '../config/firebase';
import {doc, getDoc} from 'firebase/firestore';

const theme = {
  ...DefaultTheme,
  colors: {
    primary: '#2B1D62',
    fontColor: '#FFFFFF',
  },
  fontConfig: {
    ...DefaultTheme.fontConfig,
    primary: 'AveriaLibre-Regular',
  },
};

const Relatorio = () => {
  const pesquisaId = useSelector(state => state.pesquisa.id);
  const [dadosPesquisa, setDadosPesquisa] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!pesquisaId) return;

      try {
        const pesquisaRef = doc(db, 'pesquisas', pesquisaId);
        const pesquisaSnap = await getDoc(pesquisaRef);

        if (pesquisaSnap.exists()) {
          const data = pesquisaSnap.data();
          setDadosPesquisa(data);
        } else {
          console.log('Nenhum dado encontrado.');
        }
      } catch (error) {
        console.error('Erro ao buscar dados da pesquisa:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pesquisaId]);

  if (loading) {
    return (
      <PaperProvider theme={theme}>
        <View style={styles.container}>
          <Text style={styles.title}>Carregando dados...</Text>
        </View>
      </PaperProvider>
    );
  }

  console.log('teste', dadosPesquisa.excelente);
  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.chart}>
            <PieChart
              widthAndHeight={300}
              series={[
                {value: dadosPesquisa.pessimo, color: '#53D8D8'}, //ciano
                {value: dadosPesquisa.excelente, color: '#F1CE7E'}, //amarelo
                {value: dadosPesquisa.bom, color: '#6994FE'}, //azul
                {value: dadosPesquisa.neutro, color: '#5FCDA4'}, //verde
                {value: dadosPesquisa.ruim, color: '#EA7288'}, //rosa
              ]}
              doughnut={true}
              coverRadius={10}
            />
          </View>
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendColor, {backgroundColor: '#F1CE7E'}]}
              />
              <Text style={styles.legendText}>Excelente</Text>
            </View>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendColor, {backgroundColor: '#6994FE'}]}
              />
              <Text style={styles.legendText}>Bom</Text>
            </View>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendColor, {backgroundColor: '#5FCDA4'}]}
              />
              <Text style={styles.legendText}>Neutro</Text>
            </View>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendColor, {backgroundColor: '#EA7288'}]}
              />
              <Text style={styles.legendText}>Ruim</Text>
            </View>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendColor, {backgroundColor: '#53D8D8'}]}
              />
              <Text style={styles.legendText}>Péssimo</Text>
            </View>
          </View>
        </View>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#372775',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: theme.colors.fontColor,
    fontSize: 24,
    fontFamily: theme.fontConfig.primary,
    marginBottom: 20,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chart: {
    marginRight: 20,
    marginBottom: 50,
  },
  legendContainer: {
    flexDirection: 'column',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  legendColor: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  legendText: {
    color: '#fff',
    fontFamily: theme.fontConfig.primary,
    fontSize: 25,
  },
});

export default Relatorio;
