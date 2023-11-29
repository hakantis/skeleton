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
import { setAsyncStorageData, getAsyncStorageData } from './src/storages';

export default function App() {
  const [theme, setTheme] = useState('Light');
  const styles = makeStyles(theme === 'Light' ? Lightmode.colors : Darkmode.colors);
  const themeData = { theme, setTheme, styles };
  const { t } = useTranslation();

  useEffect(() => {
    const changeLanguage = async () => {
      const systemSettingsLaguage = Localization.getLocales()[0].languageTag;
      const storageLanguage = await getAsyncStorageData('defaultLng');
      console.log(`system language is ${systemSettingsLaguage}`);
      console.log(`storage language is ${storageLanguage}`);
      if (storageLanguage === null || storageLanguage !== systemSettingsLaguage) {
        console.log(`${systemSettingsLaguage} will be saved as default language`);
        await setAsyncStorageData('defaultLng', systemSettingsLaguage);
        console.log(`i18n language will be changed to ${systemSettingsLaguage}`);
        i18n.changeLanguage(systemSettingsLaguage);
      }
    }

    changeLanguage();
  }, [])

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

