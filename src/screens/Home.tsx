import React, { FC, memo, useCallback, useEffect } from 'react';
import { useHomeState } from '@features';
import { globalStyles } from '@utils';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeComponents } from '@components';

const { AppLogo, GifsList, SearchBar, Title, Loader } = HomeComponents;

/**
 * Home
 */
const Home: FC = memo(() => {
  const { getData, state, setState, loadMore } = useHomeState();

  useEffect(() => {
    getData();
  }, []);

  const onChangeText = useCallback(
    (searchText: string) => {
      setState({ searchText });
    },
    [setState],
  );
  return (
    <SafeAreaView edges={['top']} style={globalStyles.container}>
      <AppLogo />
      <SearchBar {...{ onChangeText, getData }} />
      {state.data.length !== 0 && <Title searchText={state.searchedText} />}
      {state.isLoading ? (
        <Loader />
      ) : (
        <GifsList
          data={state.data}
          {...{ loadMore, getData }}
          isLoadingMore={state.isLoadingMore}
        />
      )}
    </SafeAreaView>
  );
});

export default Home;
