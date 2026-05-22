// Main App Component dengan Navigation

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './redux/store';

// Import Screens
import HomeScreen from './screens/HomeScreen';
import ShapeColorScreen from './screens/ShapeColorScreen';
import PuzzleScreen from './screens/PuzzleScreen';
import MatchingScreen from './screens/MatchingScreen';
import NumberLetterScreen from './screens/NumberLetterScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#F8FBFF' },
          animationEnabled: true,
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen 
          name="shapeColor" 
          component={ShapeColorScreen}
          options={{
            title: 'Bentuk & Warna',
            gestureEnabled: true,
          }}
        />
        <Stack.Screen 
          name="puzzle" 
          component={PuzzleScreen}
          options={{
            title: 'Puzzle',
            gestureEnabled: true,
          }}
        />
        <Stack.Screen 
          name="matching" 
          component={MatchingScreen}
          options={{
            title: 'Mencocokkan',
            gestureEnabled: true,
          }}
        />
        <Stack.Screen 
          name="numberLetter" 
          component={NumberLetterScreen}
          options={{
            title: 'Angka & Huruf',
            gestureEnabled: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
