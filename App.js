import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import ExerciseDetailScreen from './screens/ExerciseDetailScreen';
import AddExerciseScreen from './screens/AddExerciseScreen';
import QuotesScreen from './screens/QuotesScreen';
import { ExerciseProvider } from './context/ExerciseContext';
import { theme } from './theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ExerciseDetail" component={ExerciseDetailScreen} />
      <Stack.Screen name="AddExercise" component={AddExerciseScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <ExerciseProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: theme.pink,
            tabBarInactiveTintColor: theme.textMuted,
            tabBarStyle: {
              backgroundColor: theme.bgAlt,
              borderTopWidth: 2,
              borderTopColor: theme.pink,
              elevation: 12,
              shadowColor: theme.pink,
              shadowOffset: { width: 0, height: -4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              paddingTop: 8,
              height: 70,
              paddingBottom: 12,
            },
            tabBarLabelStyle: {
              fontSize: 11,
              fontWeight: '900',
              letterSpacing: 2,
              fontStyle: 'italic',
            },
            tabBarIcon: ({ focused, color }) => {
              let iconName;
              if (route.name === 'WORKOUTS') {
                iconName = focused ? 'barbell' : 'barbell-outline';
              } else if (route.name === 'MINDSET') {
                iconName = focused ? 'sunny' : 'sunny-outline';
              }
              return <Ionicons name={iconName} size={focused ? 26 : 22} color={color} />;
            },
          })}
        >
          <Tab.Screen name="WORKOUTS" component={HomeStack} />
          <Tab.Screen name="MINDSET" component={QuotesScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ExerciseProvider>
  );
}