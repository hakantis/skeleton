import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Text, View, Appearance } from 'react-native';
import { Darkmode, Lightmode } from './src/Theme';
import { makeStyles } from './src/Stylesheet';
import { DarkmodeSwitcher, ThemeSettings, LangSettings } from './src/components';
import { useTranslation } from 'react-i18next';
import * as Localization from 'expo-localization';
import { setAsyncStorageData, getAsyncStorageData } from './src/storages';
import { useDispatch, useSelector } from 'react-redux';
import { loadStyles, loadLang } from './src/slices/SystemSettingsSlice';

export default function App() {
  const { t } = useTranslation();
  const useSystemThemeEnabled = useSelector((state) => state.settings.useSystemTheme);
  const appTheme = useSelector((state) => state.settings.appTheme);
  const systemTheme = useSelector((state) => state.settings.systemTheme);
  const styles = useSelector((state) => state.settings.styles);

  const useSystemLangEnabled = useSelector((state) => state.settings.useSystemLang);
  const appLang = useSelector((state) => state.settings.appLang);
  const systemLang = useSelector((state) => state.settings.systemLang);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('SystemLang', Localization.getLocales()[0].languageTag)
  }, [Localization.getLocales()[0].languageTag])

  // // changes language if the system language is not like the language saved in storage
  useEffect(() => {
    const changeLang = async () => {
      dispatch(!useSystemLangEnabled ? loadLang(appLang) : loadLang(systemLang));
    }

    changeLang();
  }, [useSystemLangEnabled, appLang, systemLang, Localization.getLocales()[0].languageTag])

  // changes theme if the system theme is not like the theme saved in storage
  useEffect(() => {
    const changeTheme = async () => {
      dispatch(!useSystemThemeEnabled ? loadStyles(appTheme) : loadStyles(systemTheme));
    }

    changeTheme();
  }, [useSystemThemeEnabled, appTheme, systemTheme, Appearance.getColorScheme()])

  return (
    <NavigationContainer>
      <View style={[styles.container, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={styles.textColor}>Open up App.js to start working on your app!</Text>
        <Text style={styles.textColor}>{t('test')}</Text>
        <StatusBar style="auto" />
        <DarkmodeSwitcher></DarkmodeSwitcher>
        <ThemeSettings />
        <LangSettings />
      </View>
    </NavigationContainer>
  );
}

