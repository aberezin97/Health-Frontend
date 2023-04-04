import { createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import {
  addExerciseEntry,
  delExerciseEntry,
  getExercisesData,
  modifyExerciseEntry
} from 'controllers/exercises';

export enum EExercisesTypeError {
  GET_EXERCISES_DATA = '@ExercisesTypeError/GetExercisesDataError',
  // eslint-disable-next-line max-len
  GET_EXERCISES_DATA_FORBIDDEN = '@ExercisesTypeError/GetExercisesDataForbiddenError',
}

export interface IExerciseEntry {
  id: number;
  name: string;
  approaches: number;
  counts: number;
}

export type ExercisesError = {
  type: EExercisesTypeError;
  explanation: string;
};

export enum EExerciseLoadingType {
  GET_EXERCISES_DATA,
  ADD_EXERCISE_ENTRY,
}

interface IExercisesState {
  loading: Record<EExerciseLoadingType, boolean>;
  error: ExercisesError | null;
  entries: IExerciseEntry[]
}

const initialState: IExercisesState = {
  loading: {
    [EExerciseLoadingType.GET_EXERCISES_DATA]: false,
    [EExerciseLoadingType.ADD_EXERCISE_ENTRY]: false
  },
  error: null,
  entries: []
};

export const exercisesSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Exercises Data
      .addCase(getExercisesData.pending, (state) => {
        state.loading = {
          ...state.loading,
          [EExerciseLoadingType.GET_EXERCISES_DATA]: true
        };
        state.error = null;
      })
      .addCase(getExercisesData.fulfilled, (state, { payload }) => {
        state.loading = {
          ...state.loading,
          [EExerciseLoadingType.GET_EXERCISES_DATA]: false
        };
        state.entries = payload;
      })
      .addCase(getExercisesData.rejected, (state, { payload }) => {
        state.loading = {
          ...state.loading,
          [EExerciseLoadingType.GET_EXERCISES_DATA]: false
        };
        if ((payload as AxiosError).response?.status === 403) {
          state.error = {
            type: EExercisesTypeError.GET_EXERCISES_DATA_FORBIDDEN,
            explanation: "Don't have rights"
          };
        } else {
          state.error = {
            type: EExercisesTypeError.GET_EXERCISES_DATA,
            explanation: "Couldn't get nutrition data"
          };
        }
      })
      // Add Exercise Entry
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
      // Modify Exercise Entry
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
      // Del Exercise Entry
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
