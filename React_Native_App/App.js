import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Home from './components/screens/Home';
import MyCart from './components/screens/MyCart';
import ProductsInfo from './components/screens/ProductsInfo';

export default function App() {

  const Stack = createNativeStackNavigator();
  return (

    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='MyCart' component={MyCart} />
        <Stack.Screen name='ProductsInfo' component={ProductsInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
