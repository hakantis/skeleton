import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { Darkmode, Lightmode } from './src/Theme';
import { makeStyles } from './src/Stylesheet';
import { ThemeContext } from './src/ContextProviders';
import { DarkmodeSwitcher } from './src/components';

export default function App() {
  const [theme, setTheme] = useState('Light');
  const styles = makeStyles(theme === 'Light' ? Lightmode.colors : Darkmode.colors);
  const themeData = { theme, setTheme, styles };

  return (
    <ThemeContext.Provider value={themeData}>
      <NavigationContainer>
        <View style={[styles.container, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={styles.textColor}>Open up App.js to start working on your app!</Text>
          <StatusBar style="auto" />
          <DarkmodeSwitcher></DarkmodeSwitcher>
        </View>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}

