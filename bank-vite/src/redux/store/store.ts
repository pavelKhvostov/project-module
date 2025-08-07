import { configureStore, combineReducers } from '@reduxjs/toolkit';
import applicationReducer from '../slices/applicationSlice';
import offersReducer from '../slices/offerSlices';
import scoringReducer from '../slices/scoringSlice';
import { loadStateFromLocalStorage, saveStateToLocalStorage } from './localStorage';

const rootReducer = combineReducers({
  application: applicationReducer,
  offers: offersReducer,
  scoring: scoringReducer,
});

const preloadedState = loadStateFromLocalStorage();

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  devTools: {
    name: 'CreditApp',
    trace: true,
    traceLimit: 25,
  },
});

// для тестов
export const getStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: false,
  });

store.subscribe(() => {
  const currentState = store.getState();
  saveStateToLocalStorage(currentState);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
