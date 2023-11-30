import Toast from 'react-native-toast-message';
import { View, Text, ActivityIndicator } from 'react-native';

export const toastConfig = {
  loader: ({ text1 }) => (
    <View style={{
      height: 200,
      width: 250,
      backgroundColor: '#DFD8D9',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: 20,
      borderRadius: 15
    }}>
      <ActivityIndicator size="large" color="blue" />
      <Text>{text1}</Text>
    </View>
  )
}

export const showToast = (props) => {
  const {
    type,
    text1,
    text2,
    position,
    visibilityTime,
    autoHide,
    onPress,
    topOffset,
    bottomOffset,
  } = props;

  return Toast.show({
    type: type ? type : 'success',
    text1: text1 ? text1 : '',
    text2: text2 ? text2 : '',
    position: position ? position : 'top',
    visibilityTime: visibilityTime ? visibilityTime : 2500,
    autoHide: autoHide ? autoHide : true,
    onPress: () => { onPress },
    topOffset: topOffset ? topOffset : 50,
    bottomOffset: bottomOffset ? bottomOffset : 50,
  });
}

export const hideToast = () => {
  return Toast.hide();
}