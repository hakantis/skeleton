import i18n from './src/i18n';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Darkmode, Lightmode } from './src/Theme';
import { makeStyles } from './src/Stylesheet';
import { ThemeContext } from './src/ContextProviders';
import { DarkmodeSwitcher } from './src/components';
import { useTranslation } from 'react-i18next';
import * as Localization from 'expo-localization';

export default function App() {
  const [theme, setTheme] = useState('Light');
  const styles = makeStyles(theme === 'Light' ? Lightmode.colors : Darkmode.colors);
  const themeData = { theme, setTheme, styles };
  const { t } = useTranslation();

  // useEffect(() => {
  //   // todo: save language in securestore in a new useeffect (only save if there is no lng yet) 
  //   // and get the securestore language here. 
  //   // if storageLanguage !== Localization.getLocales()[0].languageTag then render i18n.changeLanguage
  //   i18n.changeLanguage(Localization.getLocales()[0].languageTag);
  // }, [])

  return (
    <ThemeContext.Provider value={themeData}>
      <NavigationContainer>
        <View style={[styles.container, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={styles.textColor}>Open up App.js to start working on your app!</Text>
          <Text style={styles.textColor}>{t('test')}</Text>
          <StatusBar style="auto" />
          <DarkmodeSwitcher></DarkmodeSwitcher>
        </View>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}

