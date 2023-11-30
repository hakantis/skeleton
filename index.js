import { store } from './src/store';
import { Provider } from 'react-redux';
import App from './App';
import { registerRootComponent } from 'expo';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/helperfunctions';

const Start = () => {
  return (
    <Provider store={store}>
      <App />
      <Toast config={toastConfig} />
    </Provider>
  );
}

export default registerRootComponent(Start);