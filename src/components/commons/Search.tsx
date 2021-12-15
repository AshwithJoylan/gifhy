import { ReHighlight, useColors } from '@slick-ui/core';
import { AppSizes, FontFamily, FontSize, IconSize, reSize } from '@utils';
import React, { FC, memo } from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextInputProps,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

/**
 * SearchBarProps
 */
type SearchBarProps = TextInputProps & {
  value?: string;
  style?: StyleProp<ViewStyle>;
};

/**
 * SearchBar
 */
const SearchBar: FC<SearchBarProps> = ({ style, ...props }) => {
  const colors = useColors();
  return (
    <View
      style={[
        style,
        styles.container,

        {
          backgroundColor: colors.lightBackground,
        },
      ]}>
      <TextInput
        {...props}
        placeholder="Search here"
        placeholderTextColor={colors.lightText}
        style={[styles.input, { color: colors.darkText }]}
      />
      <ReHighlight
        overlayColor="transparent"
        onPress={props.onSubmitEditing as any}>
        <Icon name="ios-search" size={IconSize.BIG} color={colors.lightText} />
      </ReHighlight>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    height: reSize(50),
    paddingHorizontal: AppSizes.PADDING,
    borderRadius: AppSizes.RADIUS,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontFamily: FontFamily.REGULAR,
    fontSize: FontSize.REGULAR,
  },
});
