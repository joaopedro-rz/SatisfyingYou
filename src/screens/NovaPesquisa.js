import { View, Text, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/Fontisto';
import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import {
  PaperProvider,
  MD3LightTheme as DefaultTheme,
  TextInput,
  Button,
} from 'react-native-paper';

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

const NovaPesquisa = props => {
  const [searchName, setName] = useState('');
  const [searchDate, setDate] = useState('');
  const [txtErroName, setTxtErroName] = useState('');
  const [txtErroData, setTxtErroData] = useState('');
  const [imageBase64, setImageBase64] = useState(null);
  const [imageUri, setImageUri] = useState(null);

  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
        quality: 0.5,
      },
      response => {
        if (response.didCancel) return;
        if (response.errorCode) {
          Alert.alert('Erro', 'Erro ao selecionar imagem');
          return;
        }

        const source = response.assets[0];
        setImageBase64(source.base64);
        setImageUri(source.uri);
      }
    );
  };

  const goHome = async () => {
    setTxtErroName('');
    setTxtErroData('');

    if (searchName === '') {
      setTxtErroName('O campo Nome é obrigatório');
      return;
    }

    if (searchDate === '') {
      setTxtErroData('O campo Data é obrigatório');
      return;
    }

    try {
      await addDoc(collection(db, 'pesquisas'), {
        nome: searchName,
        data: searchDate,
        imagem: imageBase64 || null,
        bom: 0,
        neutro: 0,  
        ruim: 0,
        pessimo: 0,
        excelente: 0,
      });

      Alert.alert('Sucesso', 'Pesquisa cadastrada com sucesso!');
      setName('');
      setDate('');
      setImageBase64(null);
      setImageUri(null);
      props.navigation.navigate('Drawer');	
    } catch (error) {
      Alert.alert('Erro', 'Erro ao salvar pesquisa');
      console.error('Erro ao salvar:', error);
    }
  };

  return (
    <PaperProvider theme={theme}>
      <View style={style.view}>
        <View style={style.container}>
          <Text style={style.subTitle}>Nome</Text>
          <TextInput
            label="Nome da Pesquisa"
            value={searchName}
            onChangeText={setName}
            style={style.input}
          />
          <Text style={style.errorText}>{txtErroName}</Text>

          <Text style={style.subTitle}>Data</Text>
          <View style={style.dateContainer}>
            <TextInput
              label="Data da Pesquisa"
              value={searchDate}
              onChangeText={setDate}
              style={[style.input, style.dateInput]}
            />
            <Icon name="calendar" size={20} color="#aaa" style={style.icon} />
          </View>
          <Text style={style.errorText}>{txtErroData}</Text>

          <Text style={style.subTitle}>Imagem</Text>
          <TouchableOpacity onPress={pickImage} style={style.imageContainer}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={style.imagePreview} />
            ) : (
              <Text style={style.text}>Toque para selecionar uma imagem</Text>
            )}
          </TouchableOpacity>

          <Button mode="contained" onPress={goHome} style={style.finalButton}>
            Finalizar Cadastro
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
  container: {
    width: '70%',
    height: '90%',
    padding: 20,
  },
  input: {
    width: '100%',
    marginBottom: 10,
    color: '#3F92C5',
    fontSize: 20,
    backgroundColor: 'white',
  },
  subTitle: {
    fontSize: 35,
    color: theme.colors.fontColor,
    marginBottom: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 20,
  },
  dateContainer: {
    width: '100%',
    position: 'relative',
  },
  dateInput: {
    paddingRight: 40,
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 15,
  },
  imageContainer: {
    width: '100%',
    height: 100, // Reduzi para 100px
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    color: '#939393',
  },
  finalButton: {
    backgroundColor: '#37BD6D',
    marginTop: 20,
    borderRadius: 5,
  },
});

export default NovaPesquisa;
