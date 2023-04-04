import { createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { getStats } from 'controllers/stats';

export const enum EStatsTypeError {
  GET_STATS = '@StatsTypeError/GetStatsError',
  GET_DATA_FORBIDDEN = '@StatsTypeError/GetDataForbiddenError',
}

export type StastError = {
  type: EStatsTypeError;
  explanation: string;
};

export enum EStatsLoadingType {
  GET_STATS,
}

export interface IStatsEntry {
  date: string;
  weight: null | number;
  eatenCalories: number;
  eatenProteins: number;
  eatenFats: number;
  eatenCarbohydrates: number;
}

export interface IStatsState {
  loading: Record<EStatsLoadingType, boolean>;
  error: StastError | null;
  entries: IStatsEntry[];
}

const initialState: IStatsState = {
  loading: {
    [EStatsLoadingType.GET_STATS]: false
  },
  error: null,
  entries: []
};

export const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStats.pending, (state) => {
        state.loading = {
          ...state.loading,
          [EStatsLoadingType.GET_STATS]: true
        };
        state.error = null;
      })
      .addCase(getStats.fulfilled, (state, { payload }) => {
        state.loading = {
          ...state.loading,
          [EStatsLoadingType.GET_STATS]: false
        };
        state.entries = payload;
      })
      .addCase(getStats.rejected, (state, { payload }) => {
        state.loading = {
          ...state.loading,
          [EStatsLoadingType.GET_STATS]: false
        };
        if ((payload as AxiosError).response?.status === 403) {
          state.error = {
            type: EStatsTypeError.GET_DATA_FORBIDDEN,
            explanation: "Don't have rights"
          };
        } else {
          state.error = {
            type: EStatsTypeError.GET_STATS,
            explanation: "Couldn't get nutrition data"
          };
        }
      });
  }
});

const statsReducer = statsSlice.reducer;

export default statsReducer;
