/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Login from './src/screens/Login';
import Home from './src/screens/Home';  
import AcoesDePesquisa from './src/screens/AcoesDePesquisa';
import Agradecimentos from './src/screens/Agradecimentos';
import Coleta from './src/screens/Coleta';
import Drawer from './src/screens/Drawer';
import ModificarPesquisa from './src/screens/ModificarPesquisa';
import NovaPesquisa from './src/screens/NovaPesquisa';
import RecuperarSenha from './src/screens/RecuperarSenha';
import Cadastro from './src/screens/Cadastro';

AppRegistry.registerComponent(appName, () => App);
