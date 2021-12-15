import React, { FC, useMemo } from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { Font, FontType } from '@utils';

/**
 * TextProps
 */
export type TextProps = RNTextProps & {
  type?: FontType;
};

/**
 * Text
 */
const Text: FC<TextProps> = ({
  style,
  type = 'REGULAR',
  children,
  ...rest
}) => {
  const fontFamily = useMemo(() => Font[type], [type]);
  return (
    <RNText style={[style, fontFamily]} {...rest}>
      {children}
    </RNText>
  );
};

export default Text;
