import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { View, StyleSheet } from 'react-native';
import Text from './Text';
import Animated, {
  withTiming,
  withSpring,
  useSharedValue,
  withDelay,
  Easing,
  runOnJS,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@slick-ui/core';
import { FontSize, reSize } from '@utils';

/**
 * ToastProps
 * @export
 * @interface ToastProps
 */
export interface ToastProps {
  /**
   * Tost text
   */
  text: string;
  /**
   * Toast Type
   * @default 'default'
   */
  type?: 'error' | 'success' | 'default';
  /**
   * Function  to call when Toast is finished
   * @default ()=>{}
   */
  onDone?: () => void;
}

/**
 * ToastInterface
 */
export interface ToastInterface {
  show: (props: ToastProps) => void;
}

/**
 * Toast State
 */
interface ToastState {
  text: string;
  type?: 'error' | 'success' | 'default';
  visible: boolean;
}

/**
 * Default Values
 */
const DURATION = 1000;

let duration = DURATION;

let onDone: (() => void) | undefined;

/**
 * Toast
 */
const Toast = forwardRef<ToastInterface>(({}, ref) => {
  /**
   * State
   */
  const [{ visible, text, type }, setState] = useState<ToastState>({
    visible: false,
    text: '',
  });

  /**
   * Constant Values
   */
  const colors = useColors();
  const { bottom } = useSafeAreaInsets();

  /**
   * Animated Values
   */
  const value = useSharedValue(0);

  /**
   * Function to clearState of the Alert
   */
  const clearState = useCallback(() => {
    onDone?.();
    // onDone = undefined;
    setState(st => ({
      ...st,
      visible: false,
      text: '',
      type: undefined,
    }));
  }, [setState]);

  useEffect(() => {
    if (visible) {
      value.value = withSpring(
        1,
        {
          damping: 15,
          mass: 1,
          stiffness: 121.6,
          overshootClamping: false,
          restSpeedThreshold: 0.001,
          restDisplacementThreshold: 0.001,
        },
        finished => {
          console.log('finished:', finished);
          if (finished) {
            value.value = withDelay(
              duration || DURATION,
              withTiming(
                0,
                {
                  duration: 300,
                  easing: Easing.linear,
                },
                isFinished => {
                  if (isFinished) {
                    runOnJS(clearState)();
                  }
                },
              ),
            );
          }
        },
      );
    }
  }, [visible, clearState, value]);
  /**
   *
   * @param props Open Alert
   * @description Opens up Alert used in ref object in Root
   */
  const show = useCallback(
    ({ onDone: oD, type: toastType, ...rest }: ToastProps) => {
      onDone = oD;
      setState(st => ({
        ...st,
        ...rest,
        visible: true,
        type: toastType || 'default',
      }));
    },
    [setState],
  );

  /**
   * Handler to bind open menu to ref object
   */
  useImperativeHandle(
    ref,
    () => ({
      show,
    }),
    [show],
  );

  const color = type
    ? ['error', 'success'].includes(type)
      ? '#fff'
      : colors.darkText
    : colors.darkText;

  const backgroundColor =
    type === 'error'
      ? colors.error
      : type === 'success'
      ? colors.success
      : colors.background;

  /**
   * Animated styles for Parent
   */
  const viewStyle = useAnimatedStyle(() => ({
    opacity: value.value,
  }));

  /**
   * Animated styles for Alert View
   */
  const subViewStyle = useAnimatedStyle(() => ({
    transform: [{ scale: value.value }],
  }));

  return visible ? (
    <View pointerEvents="none" style={[styles.container]}>
      <Animated.View style={[styles.subContainer, viewStyle]} />
      <Animated.View
        style={[
          styles.toastContainer,
          {
            bottom: reSize(100) + bottom,
            backgroundColor,
          },
          subViewStyle,
        ]}>
        <Text
          type="REGULAR"
          style={[
            styles.text,
            {
              color,
            },
          ]}>
          {text}
        </Text>
      </Animated.View>
    </View>
  ) : (
    <View />
  );
});

export default memo(Toast);

const styles = StyleSheet.create({
  text: {
    fontSize: FontSize.REGULAR,
    marginHorizontal: reSize(30),
    textAlign: 'center',
  },
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    zIndex: 5,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  subContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  toastContainer: {
    position: 'absolute',
    paddingVertical: reSize(10),
    marginHorizontal: reSize(30),
    zIndex: 3,
    borderRadius: reSize(30),
    overflow: 'hidden',
  },
});
