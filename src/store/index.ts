import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import weightReducer from './slices/weightSlice';
import userReducer from './slices/userSlice';
import nutritionReducer from './slices/nutritionSlice';
import statsReducer from './slices/statsSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'nutrition', 'weight', 'stats']
};

export const reducer = persistReducer(
  persistConfig,
  combineReducers({
    weight: weightReducer,
    user: userReducer,
    nutrition: nutritionReducer,
    stats: statsReducer
  })
);

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
});

export const persistor = persistStore(store);

export default store;

type RootStateType = ReturnType<typeof store.getState>;
type AppDispatchType = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;
