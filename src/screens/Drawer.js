import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './Home';
import Ionicons from 'react-native-vector-icons/Feather';
import {
  PaperProvider,
  MD3LightTheme as DefaultTheme,
} from 'react-native-paper';
import {useSelector} from 'react-redux';

const DrawerNavigator = createDrawerNavigator();


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
const CustomDrawerContent = (props) => {

  const email = useSelector(state => state.login.email);

  return (
    <View style={styles.drawerContainer}>
      <Text style={styles.emailText}>{email}</Text>

      <View style={styles.separator} />

      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => props.navigation.navigate('Home')}
      >
        <Ionicons name="file-text" size={24} color="white" />
        <Text style={styles.drawerItemText}>Pesquisas</Text>
      </TouchableOpacity>



      <TouchableOpacity
        style={styles.drawerItem2}
        onPress={() => props.navigation.navigate('Login')}
      >
        <Ionicons name="log-out" size={24} color="white" />
        <Text style={styles.drawerItemText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

const Drawer = () => {
  return (
    <PaperProvider theme={theme}>
      <DrawerNavigator.Navigator
        screenOptions={({ navigation }) => ({
          drawerStyle: { backgroundColor: theme.colors.primary },
          headerStyle: { backgroundColor: theme.colors.primary },
          headerTintColor: 'white',
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 15 }}
              onPress={() => navigation.toggleDrawer()}
            >
              <Ionicons name="menu" size={24} color="white" />
            </TouchableOpacity>
          ),
        })}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <DrawerNavigator.Screen name="Home" component={Home} />
      </DrawerNavigator.Navigator>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#372775',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  emailText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  separator: {
    height: 1,
    backgroundColor: 'white',
    marginVertical: 15,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  drawerItem2: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingTop: 500,
  },
  drawerItemText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
    fontFamily: theme.fontConfig.primary
  },
});

export default Drawer;
