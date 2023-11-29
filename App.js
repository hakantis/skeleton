import i18n from './src/i18n';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Text, View, useColorScheme, Appearance } from 'react-native';
import { Darkmode, Lightmode } from './src/Theme';
import { makeStyles } from './src/Stylesheet';
import { ThemeContext } from './src/ContextProviders';
import { DarkmodeSwitcher, ThemeSettings } from './src/components';
import { useTranslation } from 'react-i18next';
import * as Localization from 'expo-localization';
import { setAsyncStorageData, getAsyncStorageData } from './src/storages';
import { store } from './src/store';
import { Provider } from 'react-redux';

export default function App() {
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const [language, setLanguage] = useState(Localization.getLocales()[0].languageTag);
  const styles = makeStyles(theme === 'light' ? Lightmode.colors : Darkmode.colors);
  const themeData = { theme, setTheme, styles };
  const { t } = useTranslation();

  // todo: theme and language must not always be inhereted from the system settings
  // a theme or lng can also be changed within the app
  // 1. make a component that toggles 'use system language' and 'use system theme'
  // 1.1. if disabled a select option must be enables for the languages/themes. 
  // 1.2. if enabled the select option must be disabled.
  // 1.3. save the selected language/theme as appTheme/appLanguage in asyncstorage 
  // 2. save the toggles in asyncstorage 
  // 3. in App.js in useeffects get the toggles from asyncstorage
  // 4. if the toggles are enabled then setTheme and setLanguage to systemsettings
  // 5. if no, setsystem language and settheme to selected apptheme/applanguage


  // changes language if the system language is not like the language saved in storage
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

  // changes theme if the system theme is not like the theme saved in storage
  useEffect(() => {
    const changeTheme = async () => {
      const systemSettingsTheme = Appearance.getColorScheme();
      const storageTheme = await getAsyncStorageData('defaultTheme');
      console.log(`system theme is ${systemSettingsTheme}`);
      console.log(`storage theme is ${storageTheme}`);
      if (storageTheme === null || storageTheme !== systemSettingsTheme) {
        console.log(`${systemSettingsTheme} will be saved as default theme`);
        await setAsyncStorageData('defaultTheme', systemSettingsTheme);
        console.log(`theme will be changed to ${systemSettingsTheme}`);
        setTheme(systemSettingsTheme);
      }
    }

    changeTheme();
  }, [])

  return (
    <Provider store={store}>
      <ThemeContext.Provider value={themeData}>
        <NavigationContainer>
          <View style={[styles.container, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
            <Text style={styles.textColor}>Open up App.js to start working on your app!</Text>
            <Text style={styles.textColor}>{t('test')}</Text>
            <StatusBar style="auto" />
            <DarkmodeSwitcher></DarkmodeSwitcher>
            <ThemeSettings />
          </View>
        </NavigationContainer>
      </ThemeContext.Provider>
    </Provider>
  );
}

