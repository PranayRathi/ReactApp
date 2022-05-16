import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Home from './components/screens/Home';
import MyCart from './components/screens/MyCart';
import ProductsInfo from './components/screens/ProductsInfo';
import Login from './components/screens/Login'
import { Provider } from 'react-redux'
import store from './ReduxHandler/store'
export default function App() {

  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='MyCart' component={MyCart} />
          <Stack.Screen name='ProductsInfo' component={ProductsInfo} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
