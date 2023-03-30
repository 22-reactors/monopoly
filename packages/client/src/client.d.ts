import type { RootState } from './reduxstore/monopolyStore';

declare global {
  const __SERVER_PORT__: number;
  interface Window {
    initialState?: RootState;
  }
}
