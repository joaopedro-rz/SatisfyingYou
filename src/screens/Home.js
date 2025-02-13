import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import {
  PaperProvider,
  MD3LightTheme as DefaultTheme,
  TextInput,
  Button,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {db} from '../config/firebase';
import {collection, getDocs} from 'firebase/firestore';
import {reducerSetPesquisa} from '../../Redux/PesquisaSlice';
import {useDispatch} from 'react-redux';
import {setPesquisa} from '../../Redux/PesquisaSlice';

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

const Home = props => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [pesquisas, setPesquisas] = useState([]);
  const [id, setId] = useState('');
  const [filteredPesquisas, setFilteredPesquisas] = useState([]);

  useEffect(() => {
    const fetchPesquisas = async () => {
      const querySnapshot = await getDocs(collection(db, 'pesquisas'));
      const pesquisasData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPesquisas(pesquisasData);
      setFilteredPesquisas(pesquisasData);
    };
    fetchPesquisas();
  }, []);

  useEffect(() => {
    if (search.trim() === '') {
      setFilteredPesquisas(pesquisas);
    } else {
      const filtered = pesquisas.filter(p =>
        p.nome.toLowerCase().includes(search.toLowerCase()),
      );
      setFilteredPesquisas(filtered);
    }
  }, [search, pesquisas]);

  const newSearch = () => {
    setSearch('');
    props.navigation.navigate('NovaPesquisa');
  };

  const goToAcoesdePesquisa = pesquisa => {
    dispatch(setPesquisa(pesquisa.id));
    console.log('ID salvo no Redux:', pesquisa.id);

    props.navigation.navigate('AcoesDePesquisa', {pesquisa});
  };

  return (
    <PaperProvider theme={theme}>
      <View style={style.view}>
        <View style={style.top}>
          <View style={style.searchBar}>
            <Icon
              name="search"
              size={20}
              color="#aaa"
              style={style.searchIcon}
            />
            <TextInput
              value={search}
              onChangeText={setSearch}
              style={style.searchInput}
              placeholder="Insira o termo de busca..."
              placeholderTextColor="#aaa"
            />
          </View>
        </View>
        <View style={style.mid}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filteredPesquisas.map(pesquisa => (
              <TouchableOpacity
                key={pesquisa.id}
                style={style.card}
                onPress={() => goToAcoesdePesquisa(pesquisa)}>
                {pesquisa.imagem ? (
                  <Image
                    source={{uri: `data:image/png;base64,${pesquisa.imagem}`}}
                    style={style.image}
                  />
                ) : (
                  <View style={style.imagePlaceholder} />
                )}
                <Text style={style.title}>{pesquisa.nome}</Text>
                <Text style={style.date}>{pesquisa.data}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={style.bot}>
          <Button
            mode="contained"
            onPress={newSearch}
            style={style.greenButton}
            labelStyle={style.greenButtonText}>
            Nova Pesquisa
          </Button>
        </View>
      </View>
    </PaperProvider>
  );
};

const style = StyleSheet.create({
  view: {
    backgroundColor: theme.colors.primary,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  top: {
    width: '100%',
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  searchBar: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    height: 50,
  },
  searchIcon: {
    marginRight: 5,
    marginLeft: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    backgroundColor: 'transparent',
  },
  mid: {
    width: '100%',
    height: '60%',
    paddingLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 300,
    height: 335,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    padding: 10,
    marginLeft: 50,
  },
  image: {
    width: '100%',
    height: 130,
    borderRadius: 10,
  },
  imagePlaceholder: {
    width: '100%',
    height: 130,
    backgroundColor: '#ddd',
    borderRadius: 10,
  },
  title: {
    fontSize: 45,
    color: '#58A6FF',
    fontWeight: 'bold',
    marginTop: 10,
    fontFamily: theme.fontConfig.primary,
  },
  date: {
    fontSize: 18,
    color: '#666',
    fontFamily: theme.fontConfig.primary,
  },
  bot: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  greenButton: {
    width: '90%',
    backgroundColor: '#37BD6D',
    borderRadius: 0,
  },
  greenButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default Home;
