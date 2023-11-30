import { store } from './src/store';
import { Provider } from 'react-redux';
import App from './App';
import { registerRootComponent } from 'expo';

const Start = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default registerRootComponent(Start);