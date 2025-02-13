import { View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../config/firebase';
import Icon from 'react-native-vector-icons/Fontisto';
import {useDispatch} from 'react-redux';
import {
  PaperProvider,
  MD3LightTheme as DefaultTheme,
  TextInput,
  Button,
} from 'react-native-paper';
import {reducerSetLogin} from '../../Redux/LoginSlice'
import {setLogin} from '../../Redux/LoginSlice';

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

const Login = props => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [txtErro, setTxtErro] = useState('');

  const entrarHome = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setTxtErro('');
      props.navigation.navigate('Drawer'); // Navegar para a próxima tela após login
      dispatch(setLogin(email));
      console.log('email salvo no Redux:', email);
    } catch (error) {
      console.error(error.message); // Imprime o erro no console
      if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        setTxtErro('E-mail e/ou senha inválidos.');
      } else {
        setTxtErro('Ocorreu um erro ao realizar o login.');
      }
    }
  };
  const entrarCadastro = () => {
    props.navigation.navigate('Cadastro');
  };

  const esqueciSenha = () => {
    props.navigation.navigate('RecuperarSenha');
  };

  return (
    <PaperProvider theme={theme}>
      <View style={style.view}>
        <View style={style.container}>
          <View style={style.titulo}>
            <Text style={style.title}>Satisfying.you</Text>
            <Icon
              style={{ padding: 10 }}
              name="slightly-smile"
              size={50}
              color="white"
            />
          </View>
          <Text style={style.Subtitle}>Login</Text>
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
          <Text style={style.errorText}>{txtErro}</Text>
          <Button
            mode="contained"
            onPress={entrarHome}
            style={style.button}
            labelStyle={style.buttonText}>
            Entrar
          </Button>
          <Button
            mode="text"
            onPress={entrarCadastro}
            style={style.linkButton}
            labelStyle={style.linkButtonText}>
            Criar minha conta
          </Button>
          <Button
            mode="text"
            onPress={esqueciSenha}
            style={style.linkButtonSecondary}
            labelStyle={style.linkButtonText}>
            Esqueci minha senha
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
    marginBottom: 20,
    justifyContent: 'center',
    alignContent: 'center',
  },
  title: {
    fontFamily: theme.fontConfig.primary,
    color: theme.colors.fontColor,
    fontSize: 60,
    marginBottom: 20,
    marginRight: 10,
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
    fontFamily: theme.fontConfig.primary,
  },
  linkButton: {
    width: '100%',
    marginTop: 20,
    backgroundColor: '#58A6FF',
    borderRadius: 0,
  },
  linkButtonSecondary: {
    width: '100%',
    marginTop: 10,
    backgroundColor: '#c3c3c3',
    borderRadius: 0,
  },
  linkButtonText: {
    fontSize: 20,
    color: 'white',
    fontFamily: theme.fontConfig.primary,
  },
});

export default Login;
