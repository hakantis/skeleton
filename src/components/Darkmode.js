import { useContext } from 'react';
import { Button } from 'react-native';
import { ThemeContext } from '../ContextProviders';

export const DarkmodeSwitcher = () => {
  const { setTheme, theme, styles } = useContext(ThemeContext);

  return <Button
    title="Switch Theme"
    onPress={() => setTheme(theme === 'light' ? 'dark' : 'light')}
  />
}