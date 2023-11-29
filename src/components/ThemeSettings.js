import { useContext, useEffect, useState } from 'react';
import { Switch, View, Text, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../ContextProviders';
import { getAsyncStorageData, setAsyncStorageData } from '../storages';
import { Picker } from 'react-native-wheel-pick';
import Modal from 'react-native-modal';

export const ThemeSettings = () => {
  const { setTheme, theme, styles } = useContext(ThemeContext);
  const [isEnabled, setIsEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);
  const [appTheme, setAppTheme] = useState();

  const toggleSwitch = async () => {
    setIsEnabled(previousState => !previousState);
    await setAsyncStorageData('useSystemTheme', !isEnabled);
  };

  useEffect(() => {
    const useSystemTheme = async () => {
      const useSystemTheme = await getAsyncStorageData('useSystemTheme');
      setIsEnabled(useSystemTheme);
    }

    useSystemTheme();
  }, [])

  return <View style={{ flexDirection: 'column', alignItems: 'center', width: '100%', }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
      <Text>Use System Theme</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
    <Modal isVisible={modalVisible} style={{ justifyContent: 'center', alignItems: 'center', gap: 20, }}>
      <View style={{ width: '90%', height: 250, borderRadius: 15, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
        <Picker
          style={{ backgroundColor: 'white', width: '90%', height: '90%', borderRadius: 15 }}
          selectedValue='Light'
          pickerData={['Light', 'Dark']}
          onValueChange={value => {
            const themeMode = value.toLowerCase();
            setAsyncStorageData('appTheme', themeMode);
            setTheme(themeMode);
            setModalVisible(false);
          }}
        />
      </View>
      <TouchableOpacity
        style={{ width: '90%', backgroundColor: 'white', height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 15 }}
        onPress={() => setModalVisible(false)}>
        <Text style={{ color: 'red' }}>Hide Modal</Text>
      </TouchableOpacity>
    </Modal>
  </View>
}