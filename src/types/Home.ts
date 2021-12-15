import { Dispatch, SetStateAction } from 'react';

export type HomeContextState = {
  isLoading: boolean;
  data: GIF[];
  skip: number;
  error?: any;
  isLoadingMore: boolean;
  searchText: string;
  total?: number;
  searchedText: string;
};

export type HomeContextData = {
  state: HomeContextState;
  setState: Dispatch<SetStateAction<HomeContextState>>;
};

export type GIF = {
  id: string;
  username: string;
  title: string;
  updated_at: string;
  user: User;
  image: GifImage;
};

export type GifImage = {
  height: string;
  width: string;
  size: string;
  url: string;
};

export type User = {
  avatar_url: string;
  banner_image: string;
  banner_url: string;
  profile_url: string;
  username: string;
  display_name: string;
  description: string;
  instagram_url: string;
  website_url: string;
  is_verified: boolean;
};
