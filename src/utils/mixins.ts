import { useMemo } from 'react';
import { Dimensions, useWindowDimensions } from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;

const guidelineBaseWidth = 400;
const bigScreenWidth = 595;

/**
 * Gives the resized value for the size
 * @param size Size in number
 * @returns size according to the screen width
 *
 * ```
 * style={{ width: reSize(12) }}
 * ```
 */
export const reSize = (size: number) => {
  const sizeResize = (WINDOW_WIDTH / guidelineBaseWidth) * size;
  return sizeResize > size ? size : sizeResize;
};

export const useIsBig = () => {
  const { width } = useWindowDimensions();
  const isBig = width >= bigScreenWidth;
  return useMemo(() => ({ isBig }), [isBig]);
};

const getRandomInt = (max: number) => Math.floor(Math.random() * max);

const ListHeights = [reSize(200), reSize(250), reSize(290)];

export const useRandomHeight = () => {
  const height = useMemo(() => {
    const value = getRandomInt(2);
    return ListHeights[value];
  }, []);
  return height;
};

export const useNumberOfColumns = () => {
  const { width, height } = useWindowDimensions();
  const columns = useMemo(() => (width > bigScreenWidth ? 4 : 2), [width]);
  return useMemo(() => ({ columns, width, height }), [columns, width, height]);
};
