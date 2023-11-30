import { useState } from 'react';
import { View } from 'react-native';
import { Picker } from 'react-native-wheel-pick';
import { useDispatch, useSelector } from 'react-redux';
import { setThemeToStorage, setUseSystemTheme } from '../slices/SystemSettingsSlice';
import { useTranslation } from 'react-i18next';
import { ModalView } from './Modal';
import { Toggle } from './Toggle';
import { Select } from './Select';

export const ThemeSettings = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const { t } = useTranslation();
  const useSystemThemeEnabled = useSelector((state) => state.settings.useSystemTheme);
  const appTheme = useSelector((state) => state.settings.appTheme);
  const styles = useSelector((state) => state.settings.styles);
  const dispatch = useDispatch();

  const closeModal = () => {
    setModalVisible(false);
  }

  return <View style={{ flexDirection: 'column', alignItems: 'center', width: '100%', }}>
    <Toggle
      title='Use System Theme'
      onValueChange={() => dispatch(setUseSystemTheme(!useSystemThemeEnabled))}
      value={useSystemThemeEnabled}
    />
    <Select
      title='Current Theme:'
      openModal={() => setModalVisible(true)}
      currentSelection={appTheme}
    />
    <ModalView modalVisible={modalVisible} closeModal={closeModal}>
      <Picker
        style={{ backgroundColor: 'white', width: '90%', height: '90%', borderRadius: 15 }}
        selectedValue='Light'
        pickerData={['Light', 'Dark']}
        onValueChange={value => {
          const themeMode = value.toLowerCase();
          dispatch(setThemeToStorage(themeMode));
          setModalVisible(false);
        }}
      />
    </ModalView>
  </View>
}