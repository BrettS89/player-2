import { ActionTypes, Action } from './types';

interface AppLoading {
  status: boolean;
  message?: string;
}

export const appLoad: Action<any> = (payload) => ({
  type: ActionTypes.ON_APP_LOAD,
  payload,
});

export const setAppInitialized: Action<boolean> = payload => ({
  type: ActionTypes.SET_APP_INITIALIZED,
  payload,
})

export const setAppLoading: Action<AppLoading> = (payload) => ({
  type: ActionTypes.SET_APP_LOADING,
  payload,
});

export const setAppError: Action<string> = (payload) => ({
  type: ActionTypes.SET_APP_ERROR,
  payload,
});

export const setAppInfo: Action<string> = (payload) => ({
  type: ActionTypes.SET_APP_INFO,
  payload,
});
