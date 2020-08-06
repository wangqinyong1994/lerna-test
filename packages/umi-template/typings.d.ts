declare module '*.css';
declare module '*.less';
declare module '*.png';

interface Window {
  g_app: {
    _store: {
      getState: () => any;
      dispatch: (action: any) => any;
    };
  };
}
