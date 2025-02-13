import {View, Text, StyleSheet,Image, TouchableOpacity} from 'react-native';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/Fontisto';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/Feather';
import {doc, updateDoc, deleteDoc} from 'firebase/firestore';
import {db} from '../config/firebase';
import {useSelector} from 'react-redux';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
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

const ModificarPesquisa = props => {
  const [searchName, setName] = useState('');
  const [searchDate, setDate] = useState('');
  const [txtErroName, setTxtErroName] = useState('');
  const [txtErroData, setTxtErroData] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [imageBase64, setImageBase64] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const pesquisaId = useSelector(state => state.pesquisa.id);
  console.log('ID puxado no Redux:', pesquisaId);

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
      },
    );
  };

  const alterarPesquisa = async () => {
    console.log('ID puxado alterar no Redux:', pesquisaId);
    if (pesquisaId) {
      const pesqRef = doc(db, 'pesquisas', pesquisaId);
      await updateDoc(pesqRef, {nome: searchName, data: searchDate});
      alert('Pesquisa atualizada com sucesso!');
    }
    goHome();
  };

  const deletePesquisa = async id => {
    await deleteDoc(doc(db, 'pesquisas', id));
    goHome();
  };

  const goAcoesDePesquisa = () => {
    props.navigation.navigate('AcoesDePesquisa');
  };

  const goHome = () => {
    setTxtErroName('');
    setTxtErroData('');

    if (searchName === '') {
      setTxtErroName('O campo Nome é obrigatório');
    } else if (searchDate === '') {
      setTxtErroData('O campo  Data é obrigatório');
    } else {
      props.navigation.navigate('Drawer');
    }
  };

  return (
    <PaperProvider theme={theme}>
      <View style={style.view}>
        <View style={style.container}>
          <Text style={style.subTitle}>Nome</Text>
          <TextInput
            value={searchName}
            onChangeText={searchName => setName(searchName)}
            style={style.input}
            placeholder="Digite o novo nome da pesquisa aqui"
          />
          <Text style={style.errorText}>{txtErroName}</Text>

          <Text style={style.subTitle}>Data</Text>
          <View style={style.dateContainer}>
            <TextInput
              value={searchDate}
              onChangeText={searchDate => setDate(searchDate)}
              style={[style.input, style.dateInput]}
              placeholder="Digite a nova data da pesquisa aqui"
            />
            <Icon name="calendar" size={20} color="#aaa" style={style.icon} />
          </View>
          <Text style={style.errorText}>{txtErroData}</Text>

          <Text style={style.subTitle}>Imagem</Text>
          <TouchableOpacity onPress={pickImage} style={style.imageContainer}>
            {imageUri ? (
              <Image source={{uri: imageUri}} style={style.imagePreview} />
            ) : (
              <Text style={style.text}>Toque para selecionar uma imagem</Text>
            )}
          </TouchableOpacity>
          <Button
            mode="contained"
            onPress={alterarPesquisa}
            style={style.button}
            labelStyle={style.buttonText}>
            Salvar
          </Button>
        </View>
        <TouchableOpacity
          style={style.bottomRightContainer}
          onPress={() => {
            setShowPopup(true);
          }}>
          <Icon3
            name="trash-2"
            size={24}
            color="#FFFFFF"
            style={style.trashIcon}
          />
          <Text style={style.trashText}>Apagar</Text>
        </TouchableOpacity>
        {showPopup && (
          <View
            style={style.popupOverlay}
            pointerEvents={showPopup ? 'auto' : 'none'}>
            <View style={style.popup}>
              <Text style={style.popupText}>
                Tem certeza de apagar essa pesquisa?
              </Text>
              <View style={style.popupButtons}>
                <Button
                  mode="contained"
                  onPress={() => {
                    deletePesquisa(pesquisaId);
                    setShowPopup(false);
                    console.log('Pesquisa apagada');
                    props.navigation.navigate('Drawer');
                  }}
                  style={[style.button, style.popupButtonSim]}
                  labelStyle={style.popupButtonText}>
                  SIM
                </Button>
                <Button
                  mode="contained"
                  onPress={() => setShowPopup(false)}
                  style={[style.button, style.popupButtonCancelar]}
                  labelStyle={style.popupButtonText}>
                  CANCELAR
                </Button>
              </View>
            </View>
          </View>
        )}
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
    fontFamily: theme.fontConfig.primary,
    fontSize: 20,
    backgroundColor: 'white',
  },
  subTitle: {
    fontFamily: theme.fontConfig.primary,
    color: theme.colors.fontColor,
    fontSize: 35,
    marginBottom: 5,
    textAlign: 'left',
  },
  errorText: {
    color: 'red',
    fontSize: 20,
    fontFamily: theme.fontConfig.primary,
  },
  dateContainer: {
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
  },
  dateInput: {
    paddingRight: 40,
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 15,
    zIndex: 0,
  },
  button: {
    width: '100%',
    backgroundColor: '#37BD6D',
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 0,
  },
  buttonText: {
    fontSize: 20,
    color: theme.colors.fontColor,
    fontFamily: theme.fontConfig.primary,
    textTransform: 'uppercase',
    width: '100%',
  },
  square: {
    backgroundColor: 'white',
    width: '50%',
    height: '25%',
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomRightContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'center',
  },
  trashIcon: {
    marginBottom: 5,
  },
  trashText: {
    fontFamily: theme.fontConfig.primary,
    fontSize: 16,
    color: '#FFFFFF',
  },
  popupOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: '#372775',
    padding: 16,
    borderRadius: 1,
    width: '28%',
    height: 'auto',
    alignItems: 'center',
  },
  popupText: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: theme.fontConfig.primary,
  },
  popupButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  popupButtonSim: {
    backgroundColor: '#FF8383',
    flex: 1,
    marginRight: 5,
  },
  popupButtonCancelar: {
    backgroundColor: '#3F92C5',
    flex: 1,
    marginLeft: 5,
  },
  popupButtonText: {
    fontSize: 18,
    color: theme.colors.fontColor,
    fontFamily: theme.fontConfig.primary,
    textTransform: 'uppercase',
    textAlign: 'center',
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
  }
});

export default ModificarPesquisa;
