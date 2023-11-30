import { TouchableOpacity, View, Text } from 'react-native';
import { useSelector } from 'react-redux';

export const Select = (props) => {
  const {
    title,
    openModal,
    currentSelection
  } = props;
  const styles = useSelector((state) => state.settings.styles);

  return <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
    <Text style={styles.textColor}>{title}</Text>
    <TouchableOpacity onPress={openModal}>
      <Text style={styles.textColor}>{currentSelection}</Text>
    </TouchableOpacity>
  </View>
}