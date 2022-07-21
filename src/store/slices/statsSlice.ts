import { createSlice } from '@reduxjs/toolkit';
import { getStats } from 'controllers/stats';

export const enum EStatsTypeError {
  GET_STATS = '@StatsTypeError/GetStatsError'
}

export type StastError = {
  type: EStatsTypeError;
  explanation: string;
};

export interface IStatsEntry {
  date: string;
  weight: null | number;
  eatenCalories: number;
  eatenProteins: number;
  eatenFats: number;
  eatenCarbohydrates: number;
}

export interface IStatsState {
  loading: boolean;
  error: StastError | null;
  entries: IStatsEntry[];
}

const initialState: IStatsState = {
  loading: false,
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
        state.loading = true;
        state.error = null;
      })
      .addCase(getStats.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.entries = payload;
      })
      .addCase(getStats.rejected, (state) => {
        state.loading = false;
        state.error = {
          type: EStatsTypeError.GET_STATS,
          explanation: "Couldn't get stats"
        };
      });
  }
});

const statsReducer = statsSlice.reducer;

export default statsReducer;
