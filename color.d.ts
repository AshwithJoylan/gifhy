import '@slick-ui/core';

interface MyColors {
  error: string;
}
// and extend them!
declare module '@slick-ui/core' {
  export interface BaseColors extends MyColors {}
}
