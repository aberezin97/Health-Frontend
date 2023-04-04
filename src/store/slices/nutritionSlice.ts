import { createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import {
  getNutritionData,
  addNutritionEntry,
  delNutritionEntry,
  modifyNutritionEntry,
  modifyNutritionGoals,
  addLiquidEntry,
  delLiquidEntry
} from 'controllers/nutrition';

export const enum ENutritionTypeError {
  GET_DATA = '@NutritionTypeError/GetDataError',
  GET_DATA_FORBIDDEN = '@NutritionTypeError/GetDataForbiddenError',
  ADD_ENTRY = '@NutritionTypeError/AddEntryError',
  DEL_ENTRY = '@NutritionTypeError/DelEntryError',
  MODIFY_ENTRY = '@NutritionTypeError/ModifyEntryError',
  MODIFY_GOALS = '@NutritionTypeError/ModifyGoalsError',
  ADD_LIQUID_ENTRY = '@NutritionTypeError/AddLiquidEntryError',
  DEL_LIQUID_ENTRY = '@NutritionTypeError/DelLiquidEntryError',
}

export type NutritionError = {
  type: ENutritionTypeError;
  explanation: string;
};

export enum ENutritionLoadingType {
  GET_NUTRITION_DATA,
  ADD_NUTRITION_ENTRY,
  DEL_NUTRITION_ENTRY,
  MODIFY_NUTRITION_ENTRY,
  MODIFY_NUTRITION_GOALS,
  ADD_LIQUID_ENTRY,
  DEL_LIQUID_ENTRY,
}

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

export interface ILiquidEntry {
  id: number;
  time: string;
  quantity: number;
}

export interface INutritionState {
  loading: Record<ENutritionLoadingType, boolean>;
  error: null | NutritionError;
  entries: INutritionEntry[];
  liquidEntries: ILiquidEntry[];
  limitCalories: number;
  limitProteins: number;
  limitFats: number;
  limitCarbohydrates: number;
  goalCalories: number;
  goalProteins: number;
  goalFats: number;
  goalCarbohydrates: number;
  goalLiquid: number;
}

const initialState: INutritionState = {
  loading: {
    [ENutritionLoadingType.GET_NUTRITION_DATA]: false,
    [ENutritionLoadingType.ADD_NUTRITION_ENTRY]: false,
    [ENutritionLoadingType.DEL_NUTRITION_ENTRY]: false,
    [ENutritionLoadingType.MODIFY_NUTRITION_ENTRY]: false,
    [ENutritionLoadingType.MODIFY_NUTRITION_GOALS]: false,
    [ENutritionLoadingType.ADD_LIQUID_ENTRY]: false,
    [ENutritionLoadingType.DEL_LIQUID_ENTRY]: false
  },
  error: null,
  entries: [],
  liquidEntries: [],
  limitCalories: 0,
  limitProteins: 0,
  limitFats: 0,
  limitCarbohydrates: 0,
  goalCalories: 0,
  goalProteins: 0,
  goalFats: 0,
  goalCarbohydrates: 0,
  goalLiquid: 0
};

export const nutritionSlice = createSlice({
  name: 'nutrition',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Nutrition Data
      .addCase(getNutritionData.pending, (state) => {
        state.loading = {
          ...state.loading,
          [ENutritionLoadingType.GET_NUTRITION_DATA]: true
        };
        state.error = null;
      })
      .addCase(getNutritionData.fulfilled, (state, { payload }) => {
        state.loading = {
          ...state.loading,
          [ENutritionLoadingType.GET_NUTRITION_DATA]: false
        };
        state.limitCalories = payload.limitCalories;
        state.limitProteins = payload.limitProteins;
        state.limitFats = payload.limitFats;
        state.limitCarbohydrates = payload.limitCarbohydrates;
        state.goalCalories = payload.goalCalories;
        state.goalProteins = payload.goalProteins;
        state.goalFats = payload.goalFats;
        state.goalCarbohydrates = payload.goalCarbohydrates;
        state.goalLiquid = payload.goalLiquid;
        state.entries = payload.entries;
        state.liquidEntries = payload.liquidEntries;
      })
      .addCase(getNutritionData.rejected, (state, { payload }) => {
        state.loading = {
          ...state.loading,
          [ENutritionLoadingType.GET_NUTRITION_DATA]: false
        };
        if ((payload as AxiosError).response?.status === 403) {
          state.error = {
            type: ENutritionTypeError.GET_DATA_FORBIDDEN,
            explanation: "Don't have rights"
          };
        } else {
          state.error = {
            type: ENutritionTypeError.GET_DATA,
            explanation: "Couldn't get nutrition data"
          };
        }
      })
      // Add Nutrition Entry
      .addCase(addNutritionEntry.pending, (state) => {
        state.loading = {
          ...state.loading,
          [ENutritionLoadingType.ADD_NUTRITION_ENTRY]: true
        };
        state.error = null;
      })
      .addCase(
        addNutritionEntry.fulfilled,
        (state, { payload }: { payload: INutritionEntry }) => {
          state.loading = {
            ...state.loading,
            [ENutritionLoadingType.ADD_NUTRITION_ENTRY]: false
          };
          state.entries = [...state.entries, payload];
        }
      )
      .addCase(addNutritionEntry.rejected, (state) => {
        state.loading = {
          ...state.loading,
          [ENutritionLoadingType.ADD_NUTRITION_ENTRY]: false
        };
        state.error = {
          type: ENutritionTypeError.ADD_ENTRY,
          explanation: "Couldn't add product"
        };
      })
      // Del Nutrtition Entry
      .addCase(delNutritionEntry.pending, (state) => {
        state.loading = {
          ...state.loading,
          [ENutritionLoadingType.DEL_NUTRITION_ENTRY]: true
        };
        state.error = null;
      })
      .addCase(delNutritionEntry.fulfilled, (state, { payload }) => {
        state.loading = {
          ...state.loading,
          [ENutritionLoadingType.DEL_NUTRITION_ENTRY]: false
        };
        state.entries = state.entries.filter((entry) => entry.id !== payload);
      })
      .addCase(delNutritionEntry.rejected, (state) => {
        state.loading = {
          ...state.loading,
          [ENutritionLoadingType.DEL_NUTRITION_ENTRY]: false
        };
        state.error = {
          type: ENutritionTypeError.DEL_ENTRY,
          explanation: "Couldn't del product"
        };
      })
      // Modify Nutrition Entry
      .addCase(modifyNutritionEntry.pending, (state) => {
        state.loading = {
          ...state.loading,
          [ENutritionLoadingType.MODIFY_NUTRITION_ENTRY]: true
        };
        state.error = null;
      })
      .addCase(modifyNutritionEntry.fulfilled, (state, { payload }) => {
        state.loading = {
          ...state.loading,
          [ENutritionLoadingType.MODIFY_NUTRITION_ENTRY]: false
        };
        state.entries = state.entries.map((entry) =>
          (entry.id !== payload.id ? entry : payload));
      })
      .addCase(modifyNutritionEntry.rejected, (state) => {
        state.loading = {
          ...state.loading,
          [ENutritionLoadingType.MODIFY_NUTRITION_ENTRY]: false
        };
        state.error = {
          type: ENutritionTypeError.MODIFY_ENTRY,
          explanation: "Couldn't modify product"
        };
      })
      // Modify Nutrition Goals
      .addCase(modifyNutritionGoals.pending, (state) => {
        state.loading = {
          ...state.loading,
          [ENutritionLoadingType.MODIFY_NUTRITION_GOALS]: true
        };
        state.error = null;
      })
      .addCase(modifyNutritionGoals.fulfilled, (state, { payload }) => {
        state.loading = {
          ...state.loading,
          [ENutritionLoadingType.MODIFY_NUTRITION_GOALS]: false
        };
        state.limitCalories = payload.limitCalories;
        state.goalCalories = payload.goalCalories;
        state.limitProteins = payload.limitProteins;
        state.goalProteins = payload.goalProteins;
        state.limitFats = payload.limitFats;
        state.goalFats = payload.goalFats;
        state.limitCarbohydrates = payload.limitCarbohydrates;
        state.goalCarbohydrates = payload.goalCarbohydrates;
        state.goalLiquid = payload.goalLiquid;
      })
      .addCase(modifyNutritionGoals.rejected, (state) => {
        state.loading = {
          ...state.loading,
          [ENutritionLoadingType.MODIFY_NUTRITION_GOALS]: false
        };
        state.error = {
          type: ENutritionTypeError.MODIFY_GOALS,
          explanation: "Couldn't change goals"
        };
      })
      // Add Liquid
      .addCase(addLiquidEntry.pending, (state) => {
        state.loading = {
          ...state.loading,
          [ENutritionLoadingType.ADD_LIQUID_ENTRY]: true
        };
        state.error = null;
      })
      .addCase(addLiquidEntry.fulfilled, (state, { payload }) => {
        state.loading = {
          ...state.loading,
          [ENutritionLoadingType.ADD_LIQUID_ENTRY]: false
        };
        state.liquidEntries = [
          ...state.liquidEntries,
          payload
        ];
      })
      .addCase(addLiquidEntry.rejected, (state) => {
        state.loading = {
          ...state.loading,
          [ENutritionLoadingType.ADD_LIQUID_ENTRY]: false
        };
        state.error = {
          type: ENutritionTypeError.ADD_LIQUID_ENTRY,
          explanation: "Couldn't add liquid"
        };
      })
      // Del Liquid
      .addCase(delLiquidEntry.pending, (state) => {
        state.loading = {
          ...state.loading,
          [ENutritionLoadingType.DEL_LIQUID_ENTRY]: true
        };
        state.error = null;
      })
      .addCase(delLiquidEntry.fulfilled, (state, { payload }) => {
        state.loading = {
          ...state.loading,
          [ENutritionLoadingType.DEL_LIQUID_ENTRY]: false
        };
        state.liquidEntries = state.liquidEntries
          .filter((liquid) => liquid.id !== payload);
      })
      .addCase(delLiquidEntry.rejected, (state) => {
        state.loading = {
          ...state.loading,
          [ENutritionLoadingType.DEL_LIQUID_ENTRY]: false
        };
        state.error = {
          type: ENutritionTypeError.DEL_LIQUID_ENTRY,
          explanation: "Couldn't del liquid"
        };
      });
  }
});

const nutritionReducer = nutritionSlice.reducer;

export default nutritionReducer;
