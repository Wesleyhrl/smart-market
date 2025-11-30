import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';

import Detail from '../Screens/Detail';
import Home from '../Screens/Home';
import Info from '../Screens/Info';

const Tab = createBottomTabNavigator();

export default function Routes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2E7D32', 
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 95 : 80,
          paddingBottom: Platform.OS === 'ios' ? 30 : 15,
          paddingTop: 10,
          borderTopWidth: 0,
          backgroundColor: '#FFFFFF',
          elevation: 10,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: -2 },
          shadowRadius: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginBottom: 5,
        }
      }}
    >
      <Tab.Screen 
        name="Lista" 
        component={Home} 
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "cart" : "cart-outline"} size={28} color={color} />
          )
        }}
      />
      
      <Tab.Screen 
        name="Novo Produto" 
        component={Detail} 
        options={{
          tabBarLabel: 'Adicionar',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? "add-circle" : "add-circle-outline"} 
              size={34} 
              color={focused ? "#2E7D32" : color} 
              style={{ marginTop: -2 }}
            />
          )
        }}
      />

      <Tab.Screen 
        name="Sobre" 
        component={Info} 
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "information-circle" : "information-circle-outline"} size={28} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
}