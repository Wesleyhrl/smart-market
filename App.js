import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';
import Routes from './Routes/index';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#2E7D32" />
      <Routes />
      <Toast />
    </NavigationContainer>
  );
}