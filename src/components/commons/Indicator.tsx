import { PulseIndicator, useColors } from '@slick-ui/core';
import React, { FC, memo } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';

/**
 * IndicatorProps
 */
type IndicatorProps = {
  style?: StyleProp<ViewStyle>;
  size?: number;
};

/**
 * Indicator
 */
const Indicator: FC<IndicatorProps> = memo(
  ({ style, size }) => {
    const colors = useColors();
    return (
      <View style={style}>
        <PulseIndicator {...{ size }} color={colors.lightText} count={4} />
      </View>
    );
  },
  (prev, next) => prev.size === next.size && prev.style === next.style,
);

export default Indicator;
