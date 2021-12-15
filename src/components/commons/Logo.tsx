import { useColors } from '@slick-ui/core';
import { FontSize, reSize } from '@utils';
import React, { FC, memo } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import Svg, { SvgProps, G, Path } from 'react-native-svg';
import Text from './Text';

/**
 * LogoProps
 */
type LogoProps = {
  style?: StyleProp<ViewStyle>;
};

const SvgLogo = (props: SvgProps) => (
  <Svg viewBox="0 0 64 64" {...props} width="40" height="40">
    <Path fill={'#00ff92'} d="M8.61 9.09h6.31v46.75H8.61z" />
    <Path fill={'#fff24d'} d="M8.61 3.06h26.37v6.46H8.61z" />
    <Path fill={'#00c9ff'} d="M8.73 55.23h45.68v6.46H8.73z" />
    <Path fill={'#971eff'} d="M48.1 22.62h6.31v32.62H48.1z" />
    <Path
      fill={'#ff6562'}
      d="M47.81 16.2V9.8h-6.53V3.05h-6.54v19.57h19.67V16.2h-6.6z"
    />
    <Path fill={'#5d1498'} d="M48.1 22.62h6.31l-6.31 6.47v-6.47z" />
    <Path fill={'#968f2d'} d="M34.74 9.44v-6.3l-6.47 6.3h6.47z" />
  </Svg>
);

/**
 * Logo
 */
const Logo: FC<LogoProps> = memo(
  props => {
    const colors = useColors();
    return (
      <View {...props}>
        <SvgLogo />
        <Text
          type="BOLD"
          style={{
            marginLeft: reSize(10),
            fontSize: FontSize.VERY_BIG,
            color: colors.darkText,
          }}>
          GIFHY
        </Text>
      </View>
    );
  },
  (prev, next) => prev.style === next.style,
);

export default Logo;
