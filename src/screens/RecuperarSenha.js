import {View, Text, StyleSheet} from 'react-native';
import {useState} from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../config/firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
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

const RecuperarSenha = (props) => {
  const [email, setEmail] = useState('');
  const [txtErro, setTxtErro] = useState('');

  const recuperacaoSenha = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
          props.navigation.navigate('Login');
      })
      .catch((error) => {
        const emailValido = /@(hotmail|gmail|yahoo)\.com$/.test(email);
        if (!emailValido) {
          setTxtErro('Email inválido');
        }
      })
    }

  const login = () => {
    props.navigation.navigate('Login');
  };

  return (
    <PaperProvider theme={theme}>
      <View style={style.view}>
        <View style={style.container}>
          <Text style={style.Subtitle}>Recuperar Senha</Text>
          <TextInput
            label="E-mail"
            value={email}
            onChangeText={text => setEmail(text)}
            style={style.input}
          />
          <Text style={style.errorText}>{txtErro}</Text>
          <Button
            mode="contained"
            onPress={recuperacaoSenha}
            style={style.button}
            labelStyle={style.buttonText}>
            Recuperar
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
    paddingTop: 150,
  },
  Subtitle: {
    fontFamily: theme.fontConfig.primary,
    color: theme.colors.fontColor,
    fontSize: 35,
    marginBottom: 5,
    textAlign: 'left',
  },
  input: {
    width: '100%',
    marginBottom: 10,
    color: '#3F92C5',
    fontFamily: theme.fontConfig.primary,
    fontSize: 20,
    backgroundColor: 'white',
  },
  errorText: {
    color: '#FD7979',
    marginBottom: 10,
    fontSize: 16,
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
    color: 'white',
    textTransform: 'uppercase',
    width: '100%',
  },
});

export default RecuperarSenha;
