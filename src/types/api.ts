export type Response<T = any> = {
  status: number;
  data: T;
};

export type Post = <T = any>(
  url: string,
  data: any,
  signal?: AbortSignal,
) => Promise<Response<T>>;

export type Get = <T = any>(
  url: string,
  params?: any,
  signal?: AbortSignal,
) => Promise<Response<T>>;
