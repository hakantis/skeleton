import i18n from '../i18n';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Appearance } from 'react-native';
import * as Localization from 'expo-localization';
import { getAsyncStorageData, setAsyncStorageData } from '../storages';
import { makeStyles } from '../Stylesheet';
import { Lightmode, Darkmode } from '../Theme';

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    appTheme: 'light',
    systemTheme: Appearance.getColorScheme(),
    useSystemTheme: true,
    appLang: 'en',
    systemLang: Localization.getLocales()[0].languageTag,
    useSystemLang: true,
    styles: {},
  },
  reducers: {
    loadStyles(state, action) {
      state.styles = makeStyles(action.payload === 'light' ? Lightmode.colors : Darkmode.colors);
    },
    loadLang(state, action) {
      i18n.changeLanguage(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getThemeFromStorage.pending, (state, action) => {
      console.log('Loading Theme from storage');
    });
    builder.addCase(getThemeFromStorage.fulfilled, (state, action) => {
      state.appTheme = action.payload;
    });
    builder.addCase(getThemeFromStorage.rejected, (state, action) => {
      console.log('rejected');
    });
    //------------------------------------------------------------------
    builder.addCase(setThemeToStorage.pending, (state, action) => {
      console.log('Saving Theme in storage');
    });
    builder.addCase(setThemeToStorage.fulfilled, (state, action) => {
      state.appTheme = action.payload;
    });
    builder.addCase(setThemeToStorage.rejected, (state, action) => {
      console.log('rejected');
    });
    //------------------------------------------------------------------
    builder.addCase(getLangFromStorage.pending, (state, action) => {
      console.log('Loading Lang from storage');
    });
    builder.addCase(getLangFromStorage.fulfilled, (state, action) => {
      state.appLang = action.payload;
    });
    builder.addCase(getLangFromStorage.rejected, (state, action) => {
      console.log('rejected');
    });
    //------------------------------------------------------------------
    builder.addCase(setLangToStorage.pending, (state, action) => {
      console.log('Saving Lang to storage');
    });
    builder.addCase(setLangToStorage.fulfilled, (state, action) => {
      state.appLang = action.payload;
    });
    builder.addCase(setLangToStorage.rejected, (state, action) => {
      console.log('rejected');
    });
    //------------------------------------------------------------------
    builder.addCase(isUseSystemTheme.pending, (state, action) => {
      console.log('Loading Theme Setting Enable from Storage');
    });
    builder.addCase(isUseSystemTheme.fulfilled, (state, action) => {
      state.useSystemTheme = action.payload;
    });
    builder.addCase(isUseSystemTheme.rejected, (state, action) => {
      console.log('rejected');
    });
    //------------------------------------------------------------------
    builder.addCase(setUseSystemTheme.pending, (state, action) => {
      console.log('Saving Theme Setting Enable in storage');
    });
    builder.addCase(setUseSystemTheme.fulfilled, (state, action) => {
      state.useSystemTheme = action.payload;
    });
    builder.addCase(setUseSystemTheme.rejected, (state, action) => {
      console.log('rejected');
    });
    //------------------------------------------------------------------
    builder.addCase(isUseSystemLang.pending, (state, action) => {
      console.log('Loading Lang Setting Enable from Storage');
    });
    builder.addCase(isUseSystemLang.fulfilled, (state, action) => {
      state.useSystemLang = action.payload;
    });
    builder.addCase(isUseSystemLang.rejected, (state, action) => {
      console.log('rejected');
    });
    //------------------------------------------------------------------
    builder.addCase(setUseSystemLang.pending, (state, action) => {
      console.log('Saving Lang Setting Enable in storage');
    });
    builder.addCase(setUseSystemLang.fulfilled, (state, action) => {
      state.useSystemLang = action.payload;
    });
    builder.addCase(setUseSystemLang.rejected, (state, action) => {
      console.log('rejected');
    });
    //------------------------------------------------------------------
  },
})

export const getThemeFromStorage = createAsyncThunk('settings/getThemeFromStorage',
  async () => {
    const storageTheme = await getAsyncStorageData('theme');
    return storageTheme;
  }
)
export const setThemeToStorage = createAsyncThunk('settings/setThemeToStorage',
  async (themeMode) => {
    await setAsyncStorageData('theme', themeMode);
    return themeMode;
  }
)
export const getLangFromStorage = createAsyncThunk('settings/getLangFromStorage',
  async () => {
    const storageLang = await getAsyncStorageData('lang');
    return storageLang;
  }
)
export const setLangToStorage = createAsyncThunk('settings/setLangToStorage',
  async (lang) => {
    await setAsyncStorageData('lang', lang);
    return lang;
  }
)
export const isUseSystemTheme = createAsyncThunk('settings/isUseSystemTheme',
  async () => {
    const isUseSystemTheme = await getAsyncStorageData('useSystemTheme');
    return isUseSystemTheme;
  }
)
export const setUseSystemTheme = createAsyncThunk('settings/setUseSystemTheme',
  async (isUseSystemTheme) => {
    await setAsyncStorageData('useSystemTheme', isUseSystemTheme);
    return isUseSystemTheme;
  }
)
export const isUseSystemLang = createAsyncThunk('settings/isUseSystemLang',
  async () => {
    const isUseSystemLang = await getAsyncStorageData('useSystemLang');
    return isUseSystemLang;
  }
)
export const setUseSystemLang = createAsyncThunk('settings/setUseSystemLang',
  async (isUseSystemLang) => {
    await setAsyncStorageData('useSystemLang', isUseSystemLang);
    return isUseSystemLang;
  }
)

export const { loadStyles, loadLang } = settingsSlice.actions;
export default settingsSlice.reducer;