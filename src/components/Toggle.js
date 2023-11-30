import { Switch, View, Text } from 'react-native';
import { useSelector } from 'react-redux';

export const Toggle = (props) => {
  const {
    title,
    value,
    onValueChange
  } = props;
  const useSystemLangEnabled = useSelector((state) => state.settings.useSystemLang);
  const styles = useSelector((state) => state.settings.styles);

  return <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
    <Text style={styles.textColor}>{title}</Text>
    <Switch
      trackColor={{ false: '#767577', true: '#81b0ff' }}
      thumbColor={useSystemLangEnabled ? '#f5dd4b' : '#f4f3f4'}
      ios_backgroundColor="#3e3e3e"
      value={value}
      onValueChange={onValueChange}
    />
  </View>
}