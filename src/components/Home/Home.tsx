import React, { FC, memo, useCallback, useMemo } from 'react';
import { ReHighlight, useColors } from '@slick-ui/core';
import { GIF } from '@types';
import {
  AppConfig,
  AppSizes,
  FontSize,
  globalStyles,
  reSize,
  useNumberOfColumns,
  useRandomHeight,
} from '@utils';
import { Image, Platform, View } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import styles from './style';
import { Text, Search, Indicator, Logo, VerifiedIcon } from '../commons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';


/**
 * Loader
 */
export const Loader: FC = memo(() => {
  return <Indicator style={globalStyles.containerCentered} size={reSize(40)} />;
});
/**
 * Logo
 */
export const AppLogo = memo(() => {
  const { left } = useSafeAreaInsets();
  return (
    <Logo
      style={[
        styles.logo,
        {
          paddingHorizontal: left || AppSizes.PADDING,
          marginTop: left ? AppSizes.PADDING : reSize(10),
        },
      ]}
    />
  );
});

/**
 * SearchBar
 */

type SearchBarProps = {
  value?: string;
  onChangeText: (text: string) => void;
  getData: () => void;
};
export const SearchBar: FC<SearchBarProps> = memo(
  ({ getData, ...rest }) => {
    const { left } = useSafeAreaInsets();
    const { width, height } = useNumberOfColumns();
    const searchStyle = useMemo(
      () =>
        Platform.OS === 'android'
          ? styles.searchBar
          : width > height
          ? [styles.searchBarTop, { marginHorizontal: left }]
          : styles.searchBar,
      [width, height, left],
    );
    return (
      <Search
        style={searchStyle}
        {...rest}
        returnKeyType="search"
        onSubmitEditing={getData}
      />
    );
  },
  (prev, next) =>
    prev.onChangeText === next.onChangeText &&
    prev.getData === next.getData &&
    prev.value === next.value,
);

/**
 * Title
 */
export const Title = ({ searchText }: { searchText: string }) => {
  const { left } = useSafeAreaInsets();
  const colors = useColors();
  return (
    <Text
      type="BOLD"
      style={{
        marginTop: reSize(10),
        marginBottom: reSize(10),
        fontSize: FontSize.VERY_BIG,
        marginLeft: left || AppSizes.PADDING,
        color: colors.darkText,
      }}>
      {searchText.length > 0 ? searchText : 'Trending'}
    </Text>
  );
};

/**
 * Item
 */
type GifItemProps = { item: GIF; index: number; columns: number };

type ProfileImageProps = {
  image?: string;
  isVerified?: boolean;
};
const ProfileImage: FC<ProfileImageProps> = memo(
  ({ image, isVerified }) => {
    const colors = useColors();
    return (
      <View>
        <View
          style={[styles.userImage, { backgroundColor: colors.background }]}>
          <Image style={globalStyles.container} source={{ uri: image }} />
        </View>
        {isVerified && <VerifiedIcon />}
      </View>
    );
  },
  (prev, next) =>
    prev.image === next.image && prev.isVerified === next.isVerified,
);

export const GifItem: FC<GifItemProps> = memo(
  ({ item, index, columns }) => {
    const height = useRandomHeight();
    const colors = useColors();
    const itemMargins = useMemo(() => {
      const isValid =
        columns === 2
          ? index % 2 === 0
          : index % 2 === 0
          ? true
          : (index + 1) % 4 !== 0;

      return {
        marginRight: isValid ? reSize(10) : 0,
      };
    }, [index, columns]);

    const itemStyle = useMemo(
      () => ({
        height,
        backgroundColor: colors.lightBackground,
      }),
      [colors.lightBackground, height],
    );

    return (
      <ReHighlight
        key={item.id}
        style={[styles.itemContainer, itemStyle, itemMargins]}>
        <View style={[styles.gifImageStyle]}>
          <Image
            style={[globalStyles.container]}
            source={{ uri: item.image.url }}
            resizeMethod="scale"
            resizeMode="cover"
          />
        </View>

        <View style={styles.infoContainer}>
          <ProfileImage
            image={item.user?.avatar_url}
            isVerified={item.user?.is_verified}
          />
          <View style={globalStyles.container}>
            <Text
              numberOfLines={1}
              style={[styles.name, { color: colors.lightText }]}>
              {item.username || item.title}
            </Text>
          </View>
        </View>
      </ReHighlight>
    );
  },
  (prev, next) =>
    prev.index === next.index &&
    prev.item === next.item &&
    prev.columns === next.columns,
);

/**
 * GifsList
 */

type GifsListProps = {
  data: GIF[];
  getData: (override?: boolean) => void;
  isLoadingMore: boolean;
  loadMore: () => void;
};

const TopGradient = memo(() => {
  const colors = useColors();
  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: reSize(40),
      }}>
      <LinearGradient
        colors={[colors.background, '#00000000']}
        style={{ flex: 1 }}
      />
    </View>
  );
});

export const GifsList: FC<GifsListProps> = memo(
  ({ data, loadMore: onEndReached, isLoadingMore, getData }) => {
    const { bottom, left, right } = useSafeAreaInsets();

    const { columns, width, height } = useNumberOfColumns();
    const renderItem = useCallback(
      ({ item, i }: { item: GIF; i: number }) => (
        <GifItem {...{ item }} key={i} index={i} {...{ columns }} />
      ),
      [columns],
    );

    const paddingHorizontal = useMemo(
      () =>
        Platform.OS === 'android'
          ? AppSizes.PADDING
          : width > height
          ? left
          : AppSizes.PADDING,
      [width, height, left],
    );

    const ListFooterComponent = useCallback(
      () => (true ? <Indicator style={styles.indicator} /> : <View />),
      [isLoadingMore],
    );

    return (
      <MasonryList
        fadingEdgeLength={20}
        onRefresh={() => getData(true)}
        contentContainerStyle={{
          paddingHorizontal,
          alignSelf: 'stretch',
          paddingBottom: bottom || reSize(10),
        }}
        onEndReachedThreshold={AppConfig.END_THRESHOLD}
        ListFooterComponent={ListFooterComponent()}
        {...{ renderItem, data, onEndReached }}
        numColumns={columns}
        keyPrefix="item"
      />
    );
  },
  (prev, next) =>
    prev.data.length === next.data.length &&
    prev.loadMore === next.loadMore &&
    prev.isLoadingMore === next.isLoadingMore &&
    prev.getData === next.getData,
);
