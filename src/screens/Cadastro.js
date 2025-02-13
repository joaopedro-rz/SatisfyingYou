import { View, Text, Image, StyleSheet, PermissionsAndroid } from 'react-native';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  PaperProvider,
  MD3LightTheme as DefaultTheme,
  TextInput,
  Button,
} from 'react-native-paper';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase'; 

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

const Cadastro = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secPassword, setSecPassword] = useState('');
  const [txtErro, setTxtErro] = useState('');

  const validarCadastro = async () => {
    // Validação de formato do e-mail
    const emailValido = /@(hotmail|gmail|yahoo)\.com$/.test(email);
    if (!emailValido) {
      setTxtErro('Email inválido');
      return;
    }

    // Validação de confirmação de senha
    if (password !== secPassword) {
      setTxtErro('O campo repetir Senha difere da Senha');
      return;
    }

    try {
      // Registro do usuário no Firebase
      await createUserWithEmailAndPassword(auth, email, password);
      setTxtErro('');
      alert('Cadastro realizado com sucesso!');
      props.navigation.navigate('Login'); // Navegar para a tela de login
    } catch (err) {
      setTxtErro('Erro ao cadastrar. Verifique os dados e tente novamente.');
      console.error(err);
    }
  };

  return (
    <PaperProvider theme={theme}>
      <View style={style.view}>
        <View style={style.container}>
          <View style={style.titulo}>
            <Text style={style.title}>Satisfying.you</Text>
          </View>
          <Text style={style.Subtitle}>Email</Text>
          <TextInput
            label="E-mail"
            value={email}
            onChangeText={text => setEmail(text)}
            style={style.input}
          />
          <Text style={style.Subtitle}>Senha</Text>
          <TextInput
            label="Senha"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
            style={style.input}
          />
          <Text style={style.Subtitle}>Repetir Senha</Text>
          <TextInput
            label="Repetir Senha"
            value={secPassword}
            onChangeText={text => setSecPassword(text)}
            secureTextEntry
            style={style.input}
          />
          <Text style={style.errorText}>{txtErro}.</Text>
          <Button
            mode="contained"
            onPress={validarCadastro}
            style={style.button}
            labelStyle={style.buttonText}>
            Cadastrar
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
  titulo: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'center',
    alignContent: 'center',
  },
  title: {
    fontFamily: theme.fontConfig.primary,
    color: theme.colors.fontColor,
    fontSize: 60,
    marginBottom: 10,
    marginRight: 10,
  },
  Subtitle: {
    fontFamily: theme.fontConfig.primary,
    color: theme.colors.fontColor,
    fontSize: 30,
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
    fontFamily: theme.fontConfig.primary,
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
    fontFamily: theme.fontConfig.primary,
  },
});

export default Cadastro;
