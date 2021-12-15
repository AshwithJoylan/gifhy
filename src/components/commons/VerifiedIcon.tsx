import { Colors, globalStyles, reSize } from '@utils';
import React, { FC, memo } from 'react';
import { View, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
/**
 * VerifiedIconProps
 */
type VerifiedIconProps = {
  style?: StyleProp<ViewStyle>;
};

/**
 * VerifiedIcon
 */
const VerifiedIcon: FC<VerifiedIconProps> = memo(
  ({ style }) => {
    return (
      <View style={[style, globalStyles.verifiedIcon]}>
        <IonIcons
          name="ios-checkmark"
          size={reSize(5)}
          color={Colors.BACKGROUND_DARK_MODE}
        />
      </View>
    );
  },
  (prev, next) => prev.style === next.style,
);

export default VerifiedIcon;
