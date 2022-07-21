import { createSlice } from '@reduxjs/toolkit';
import {
  getNutritionData,
  addNutritionEntry,
  delNutritionEntry,
  modifyNutritionEntry,
  modifyNutritionGoals
} from 'controllers/nutrition';

export const enum ENutritionTypeError {
  GET_DATA = '@NutritionTypeError/GetDataError',
  ADD_ENTRY = '@NutritionTypeError/AddEntryError',
  DEL_ENTRY = '@NutritionTypeError/DelEntryError',
  MODIFY_ENTRY = '@NutritionTypeError/ModifyEntryError',
  MODIFY_GOALS = '@NutritionTypeError/ModifyGoalsError'
}

export type NutritionError = {
  type: ENutritionTypeError;
  explanation: string;
};

export interface INutritionEntry {
  id: number;
  time: string;
  name: string;
  calories: number;
  proteins: number;
  fats: number;
  carbohydrates: number;
  weight: number;
}

export interface INutritionState {
  loading: boolean;
  error: null | NutritionError;
  entries: INutritionEntry[];
  limitCalories: number;
  limitProteins: number;
  limitFats: number;
  limitCarbohydrates: number;
  goalCalories: number;
  goalProteins: number;
  goalFats: number;
  goalCarbohydrates: number;
}

const initialState: INutritionState = {
  loading: false,
  error: null,
  entries: [],
  limitCalories: 0,
  limitProteins: 0,
  limitFats: 0,
  limitCarbohydrates: 0,
  goalCalories: 0,
  goalProteins: 0,
  goalFats: 0,
  goalCarbohydrates: 0
};

export const nutritionSlice = createSlice({
  name: 'nutrition',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Nutrition Data
      .addCase(getNutritionData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNutritionData.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.limitCalories = payload.limitCalories;
        state.limitProteins = payload.limitProteins;
        state.limitFats = payload.limitFats;
        state.limitCarbohydrates = payload.limitCarbohydrates;
        state.goalCalories = payload.goalCalories;
        state.goalProteins = payload.goalProteins;
        state.goalFats = payload.goalFats;
        state.goalCarbohydrates = payload.goalCarbohydrates;
        state.entries = payload.entries;
      })
      .addCase(getNutritionData.rejected, (state) => {
        state.loading = false;
        state.error = {
          type: ENutritionTypeError.GET_DATA,
          explanation: "Couldn't get nutrition data"
        };
      })
      // Add Nutrition Entry
      .addCase(addNutritionEntry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addNutritionEntry.fulfilled,
        (state, { payload }: { payload: INutritionEntry }) => {
          state.loading = false;
          state.entries = [...state.entries, payload];
        }
      )
      .addCase(addNutritionEntry.rejected, (state) => {
        state.loading = false;
        state.error = {
          type: ENutritionTypeError.ADD_ENTRY,
          explanation: "Couldn't add product"
        };
      })
      // Del Nutrtition Entry
      .addCase(delNutritionEntry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(delNutritionEntry.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.entries = state.entries.filter((entry) => entry.id !== payload);
      })
      .addCase(delNutritionEntry.rejected, (state) => {
        state.loading = false;
        state.error = {
          type: ENutritionTypeError.DEL_ENTRY,
          explanation: "Couldn't del product"
        };
      })
      // Modify Nutrition Entry
      .addCase(modifyNutritionEntry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(modifyNutritionEntry.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.entries = state.entries.map((entry) =>
          (entry.id !== payload.id ? entry : payload));
      })
      .addCase(modifyNutritionEntry.rejected, (state) => {
        state.loading = false;
        state.error = {
          type: ENutritionTypeError.MODIFY_ENTRY,
          explanation: "Couldn't modify product"
        };
      })
      // Modify Nutrition Goals
      .addCase(modifyNutritionGoals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(modifyNutritionGoals.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.limitCalories = payload.limitCalories;
        state.goalCalories = payload.goalCalories;
        state.limitProteins = payload.limitProteins;
        state.goalProteins = payload.goalProteins;
        state.limitFats = payload.limitFats;
        state.goalFats = payload.goalFats;
        state.limitCarbohydrates = payload.limitCarbohydrates;
        state.goalCarbohydrates = payload.goalCarbohydrates;
      })
      .addCase(modifyNutritionGoals.rejected, (state) => {
        state.loading = false;
        state.error = {
          type: ENutritionTypeError.MODIFY_GOALS,
          explanation: "Couldn't change goals"
        };
      });
  }
});

const nutritionReducer = nutritionSlice.reducer;

export default nutritionReducer;
