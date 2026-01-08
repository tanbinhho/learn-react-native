import { Text, useColorScheme } from 'react-native';
import { textColors } from './colors';
import { fontSize, fontWeight, lineHeight } from './typography';

type TextVariant = 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'label' | 'button';

type TextColor =
  | 'primary'
  | 'secondary'
  | 'muted'
  | 'inverse'
  | 'danger'
  | 'success'
  | 'info'
  | 'warning'
  | 'default'
  | 'caption'
  | 'light'
  | 'menu'
  | 'checkbox'
  | 'number';

type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';

interface AppTextProps {
  children: React.ReactNode;
  variant?: TextVariant;
  color?: TextColor;
  weight?: TextWeight;
  align?: 'left' | 'center' | 'right';
  numberOfLines?: number;
}

export const AppText = ({
  children,
  variant = 'body',
  color = 'primary',
  weight = 'regular',
  align = 'left',
  numberOfLines,
}: AppTextProps) => {
  const theme = useColorScheme() ?? 'light';

  return (
    <Text
      numberOfLines={numberOfLines}
      style={{
        fontSize: fontSize[variant],
        lineHeight: lineHeight[variant],
        fontWeight: fontWeight[weight],
        color: textColors[theme][color],
        textAlign: align,
      }}
    >
      {children}
    </Text>
  );
};
