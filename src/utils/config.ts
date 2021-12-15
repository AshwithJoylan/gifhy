import { BaseColors, darkColors, lightColors } from '@slick-ui/core';
import { StyleSheet } from 'react-native';
import { reSize } from './mixins';

export const AppScreens = {
  HOME: {
    name: 'Home',
    title: 'GIFHY',
  },
};

export const FontSize = {
  VERY_BIG: reSize(24),
  BIG: reSize(18),
  MEDIUM: reSize(16),
  REGULAR: reSize(14),
  SMALL: reSize(12),
};

export const IconSize = {
  BIG: reSize(18),
  MEDIUM: reSize(16),
  REGULAR: reSize(14),
  SMALL: reSize(12),
};

export const AppSizes = {
  RADIUS: reSize(16),
  BUTTON_HEIGHT: reSize(50),
  PADDING: reSize(20),
};

export const AppConfig = { END_THRESHOLD: 0.1 };

export const Colors = {
  PRIMARY: '#5669FF',
  SECONDARY: '#00F8FF',
  BACKGROUND: '#FFFFFF',
  LIGHT_BACKGROUND: '#EAEBFA60',
  BACKGROUND_DARK_MODE: '#2D2D3A',
  LIGHT_BACKGROUND_DARK_MODE: '#393948',
  DARK_TEXT: '#040415',
  LIGHT_TEXT: '#D2CFD6',
  DARK_TEXT_DARK_MODE: '#FFFFFF',
  LIGHT_TEXT_DARK_MODE: '#888891',
  ERROR: '#F0635A',
};

const light: BaseColors = {
  ...lightColors,
  primary: Colors.PRIMARY,
  secondary: Colors.SECONDARY,
  darkText: Colors.DARK_TEXT,
  lightText: Colors.LIGHT_TEXT,
  background: Colors.BACKGROUND,
  error: Colors.ERROR,
  lightBackground: Colors.LIGHT_BACKGROUND,
};

const dark: BaseColors = {
  ...darkColors,
  primary: Colors.PRIMARY,
  secondary: Colors.SECONDARY,
  darkText: Colors.DARK_TEXT_DARK_MODE,
  lightText: Colors.LIGHT_TEXT_DARK_MODE,
  background: Colors.BACKGROUND_DARK_MODE,
  error: Colors.ERROR,
  lightBackground: Colors.LIGHT_BACKGROUND_DARK_MODE,
};

export const theme = { dark, light };

export const FontFamily = {
  BOLD: 'AirbnbCerealApp-Bold',
  REGULAR: 'AirbnbCerealApp-Book',
  MEDIUM: 'AirbnbCerealApp-Medium',
};

export type FontType = 'BOLD' | 'REGULAR' | 'MEDIUM';

const styles = StyleSheet.create({
  regular: {
    fontFamily: FontFamily.REGULAR,
    fontWeight: '400',
  },
  bold: {
    fontFamily: FontFamily.BOLD,
    fontWeight: '700',
  },
  medium: {
    fontFamily: FontFamily.MEDIUM,
    fontWeight: '500',
  },
});

export const Font = {
  BOLD: styles.bold,
  REGULAR: styles.regular,
  MEDIUM: styles.medium,
};
