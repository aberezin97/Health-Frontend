import { createSlice } from '@reduxjs/toolkit';
import {
  addExerciseEntry,
  delExerciseEntry,
  getExercisesData,
  modifyExerciseEntry
} from 'controllers/exercises';

export interface IExerciseEntry {
  id: number;
  name: string;
  approaches: number;
  counts: number;
}

interface IExercisesState {
  loading: boolean;
  entries: IExerciseEntry[]
}

const initialState: IExercisesState = {
  loading: false,
  entries: []
};

export const exercisesSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getExercisesData.pending, (state) => {
        state.loading = true;
        // state.error = null;
      })
      .addCase(getExercisesData.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.entries = payload;
        // state.loading = false;
        // state.limitCalories = payload.limitCalories;
        // state.limitProteins = payload.limitProteins;
        // state.limitFats = payload.limitFats;
        // state.limitCarbohydrates = payload.limitCarbohydrates;
        // state.goalCalories = payload.goalCalories;
        // state.goalProteins = payload.goalProteins;
        // state.goalFats = payload.goalFats;
        // state.goalCarbohydrates = payload.goalCarbohydrates;
        // state.goalLiquid = payload.goalLiquid;
        // state.entries = payload.entries;
        // state.liquidEntries = payload.liquidEntries;
      })
      .addCase(getExercisesData.rejected, (state) => {
        state.loading = false;
        // state.error = {
        //   type: ENutritionTypeError.GET_DATA,
        //   explanation: "Couldn't get nutrition data"
        // };
      })
      .addCase(addExerciseEntry.pending, (state) => {
        state.loading = true;
      })
      .addCase(addExerciseEntry.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.entries = [...state.entries, payload];
      })
      .addCase(addExerciseEntry.rejected, (state) => {
        state.loading = false;
      })
      .addCase(modifyExerciseEntry.pending, (state) => {
        state.loading = true;
      })
      .addCase(modifyExerciseEntry.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.entries = state.entries
          .map((entry) => (entry.id === payload.id ? payload : entry));
      })
      .addCase(modifyExerciseEntry.rejected, (state) => {
        state.loading = false;
      })
      .addCase(delExerciseEntry.pending, (state) => {
        state.loading = true;
      })
      .addCase(delExerciseEntry.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.entries = state.entries.filter((entry) => entry.id !== payload);
      })
      .addCase(delExerciseEntry.rejected, (state) => {
        state.loading = false;
      });
  }
});

const exerciseReducer = exercisesSlice.reducer;

export default exerciseReducer;
