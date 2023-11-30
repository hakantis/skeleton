import { useState } from 'react';
import { View } from 'react-native';
import { Picker } from 'react-native-wheel-pick';
import { useDispatch, useSelector } from 'react-redux';
import { setLangToStorage, setUseSystemLang } from '../slices/SystemSettingsSlice';
import { useTranslation } from 'react-i18next';
import { ModalView } from './Modal';
import { Toggle } from './Toggle';
import { Select } from './Select';

export const LangSettings = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const { t } = useTranslation();
  const useSystemLangEnabled = useSelector((state) => state.settings.useSystemLang);
  const appLang = useSelector((state) => state.settings.appLang);
  const systemLang = useSelector((state) => state.settings.systemLang);
  const styles = useSelector((state) => state.settings.styles);
  const dispatch = useDispatch();

  const closeModal = () => {
    setModalVisible(false);
  }

  return <View style={{ flexDirection: 'column', alignItems: 'center', width: '100%', }}>
    <Toggle
      title='Use System Language'
      onValueChange={() => dispatch(setUseSystemLang(!useSystemLangEnabled))}
      value={useSystemLangEnabled}
    />
    <Select
      title='Current Lang:'
      openModal={() => setModalVisible(true)}
      currentSelection={appLang}
    />
    <ModalView modalVisible={modalVisible} closeModal={closeModal}>
      <Picker
        style={{ backgroundColor: 'white', width: '90%', height: '90%', borderRadius: 15 }}
        selectedValue='En'
        pickerData={['En', 'De']}
        onValueChange={value => {
          const lang = value.toLowerCase();
          dispatch(setLangToStorage(lang));
          setModalVisible(false);
        }}
      />
    </ModalView>
  </View>
}