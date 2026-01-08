export const fontSize = {
  h1: 28,
  h2: 24,
  h3: 20,
  title: 16,
  body: 14,
  caption: 12,

  label: 14,
  button: 16,
};

export const lineHeight = {
  h1: 36,
  h2: 32,
  h3: 28,
  title: 24,
  body: 20,
  caption: 18,

  label: 20,
  button: 24,
};

import { TextStyle } from 'react-native';

export const fontWeight: Record<
  'regular' | 'medium' | 'semibold' | 'bold',
  TextStyle['fontWeight']
> = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};
