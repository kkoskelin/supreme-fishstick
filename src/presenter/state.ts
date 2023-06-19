export type State = {
  randomInfo?: Record<string, string>;
  currentPage: string;
};

export type Link = {
  href: string;
  name: string;
  current?: boolean;
};

export const state: State = {
  currentPage: '',
};
