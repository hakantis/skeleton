import { StyleSheet } from 'react-native';

export const makeStyles = (colors) => StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    padding: 20,
  },
  textColor: {
    color: colors.text,
  }
});