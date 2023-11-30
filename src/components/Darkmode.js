import { useTranslation } from 'react-i18next';
import { Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loadStyles } from '../slices/SystemSettingsSlice';

export const DarkmodeSwitcher = () => {
  const { t } = useTranslation();
  const useSystemThemeEnabled = useSelector((state) => state.settings.useSystemTheme);
  const appTheme = useSelector((state) => state.settings.appTheme);
  const systemTheme = useSelector((state) => state.settings.systemTheme);
  const dispatch = useDispatch();

  return <Button
    title="Switch Theme"
    onPress={() => dispatch(!useSystemThemeEnabled ? loadStyles(appTheme) : loadStyles(systemTheme))}
  />
}