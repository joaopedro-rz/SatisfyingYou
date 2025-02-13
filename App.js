import { Provider } from "react-redux";
import { Store } from "./Redux/Store";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/Login';
import Drawer from './src/screens/Drawer';
import NovaPesquisa from './src/screens/NovaPesquisa';
import Cadastro from './src/screens/Cadastro';
import RecuperarSenha from './src/screens/RecuperarSenha';
import ModificarPesquisa from './src/screens/ModificarPesquisa';
import AcoesDePesquisa from './src/screens/AcoesDePesquisa';
import Coleta from './src/screens/Coleta';
import Relatorio from './src/screens/Relatorio';
import { VotoProvider } from './src/screens/VotoContext'; // Importe o VotoProvider
import Agradecimentos from './src/screens/Agradecimentos';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={Store}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerStyle: { backgroundColor: '#2B1D62' },
              headerTintColor: '#FFFFFF',
              headerTitleStyle: { fontSize: 40 },
              headerBackTitleVisible: false,
            }}>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Cadastro"
              component={Cadastro}
              options={{ headerTitle: 'Nova Conta' }}
            />
            <Stack.Screen
              name="RecuperarSenha"
              component={RecuperarSenha}
              options={{ headerTitle: 'Recuperação de Senha' }}
            />
            <Stack.Screen
              name="Drawer"
              component={Drawer}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NovaPesquisa"
              component={NovaPesquisa}
              options={{ headerTitle: 'Nova pesquisa' }}
            />
            <Stack.Screen
              name="ModificarPesquisa"
              component={ModificarPesquisa}
              options={{ headerTitle: 'Modificar pesquisa' }}
            />
            <Stack.Screen
              name="AcoesDePesquisa"
              component={AcoesDePesquisa}
              options={{ headerTitle: 'Ações de pesquisa' }}
            />
            <Stack.Screen
              name="Agradecimentos"
              component={Agradecimentos}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Coleta"
              component={Coleta}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Relatorio"
              component={Relatorio}
              options={{ headerTitle: 'Relatório' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
    </Provider>
  );
};

export default App;