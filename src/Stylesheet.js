import { StyleSheet } from 'react-native';

export const makeStyles = (colors) => StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
  textColor: {
    color: colors.text,
  }
});