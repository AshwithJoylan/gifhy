import { HomeContextState, GIF } from '@types';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Api } from '@utils';
import { Toast } from '@components';

const LIMIT = 20;

const getGifsData = (data: any[]): GIF[] => {
  const newData: GIF[] = data.map(item => ({
    id: item.id,
    username: item.username,
    image: item.images.fixed_width_small,
    updated_at: item.update_datetime,
    title: item.title,
    user: item.user,
  }));
  return newData;
};

const getTrendingGifs: (
  skip: number,
  signal: AbortSignal,
) => Promise<{ gifs: GIF[]; total?: number }> = async (skip, signal) => {
  try {
    const params = {
      limit: LIMIT,
      offset: skip,
      rating: 'g',
    };
    const { data } = await Api.get(Api.EndPoints.TRENDING, params, signal);
    const gifsData = getGifsData(data.data);
    return { gifs: gifsData, total: data.pagination.total_count };
  } catch (error) {
    return { gifs: [] };
  }
};

const getSearchedGifs: (
  skip: number,
  text: string,
  signal: AbortSignal,
) => Promise<{ gifs: GIF[]; total?: number }> = async (skip, text, signal) => {
  try {
    const params = {
      limit: LIMIT,
      offset: skip,
      q: text,
      rating: 'g',
    };
    const { data } = await Api.get(Api.EndPoints.SEARCH, params, signal);
    const gifsData = getGifsData(data.data);
    return { gifs: gifsData, total: data.pagination.total_count };
  } catch (error) {
    return { gifs: [] };
  }
};

export const useHomeState = () => {
  const [state, setStateValue] = useState<HomeContextState>({
    isLoading: false,
    isLoadingMore: false,
    data: [],
    skip: 0,
    searchText: '',
    searchedText: '',
  });
  const controller = useRef<AbortController>();

  // used to set the state
  const setState = useCallback(
    (data: Partial<HomeContextState>) => {
      setStateValue(st => ({ ...st, ...data }));
    },
    [setStateValue],
  );

  useEffect(() => controller.current?.abort(), []);

  const getData = useCallback(
    async (override?: boolean) => {
      if (
        !override &&
        state.data.length > 0 &&
        state.searchText.length === 0 &&
        state.searchedText.length === 0
      )
        return Toast?.show({ text: 'Please write something' });
      controller.current = new AbortController();

      setState({ isLoading: true, skip: 0 });
      if (state.searchText.length === 0) {
        const { gifs, total } = await getTrendingGifs(
          state.skip,
          controller.current!.signal,
        );
        setState({
          isLoading: false,
          data: gifs,
          searchedText: '',
          skip: gifs.length > 0 ? state.skip : state.skip + LIMIT,
          total: total || state.total,
        });
      } else {
        const { gifs, total } = await getSearchedGifs(
          state.skip,
          state.searchText,
          controller.current!.signal,
        );
        setState({
          isLoading: false,
          data: gifs,
          searchedText: state.searchText,
          skip: gifs.length > 0 ? state.skip : state.skip + LIMIT,
          total: total || state.total,
        });
      }
    },
    [setState, state.skip, state.searchText, state.searchedText, state.data],
  );

  const loadMore = useCallback(async () => {
    if (state.isLoadingMore || !state.total || state.data.length >= state.total)
      return;

    controller.current = new AbortController();
    setState({ isLoadingMore: true });
    if (state.searchText.length === 0) {
      const { gifs, total } = await getTrendingGifs(
        state.skip + LIMIT,
        controller.current!.signal,
      );
      setState({
        isLoadingMore: false,
        data: [...state.data, ...gifs],
        skip: gifs.length === 0 ? state.skip : state.skip + LIMIT,
        total: total || state.total,
      });
    } else {
      const { gifs, total } = await getSearchedGifs(
        state.skip + LIMIT,
        state.searchText,
        controller.current!.signal,
      );
      setState({
        isLoadingMore: false,
        data: [...state.data, ...gifs],
        skip: gifs.length === 0 ? state.skip : state.skip + LIMIT,
        total: total || state.total,
      });
    }
  }, [
    setState,
    state.total,
    state.data,
    state.skip,
    state.searchText,
    state.isLoadingMore,
  ]);

  return useMemo(
    () => ({ state, setState, getData, loadMore }),
    [state, setState, getData, loadMore],
  );
};
