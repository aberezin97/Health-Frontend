import { createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import {
  getWeights,
  addWeight,
  delWeight,
  modifyWeight
} from 'controllers/weight';

export const enum EWeightTypeError {
  GET_WEIGHT_DATA = '@WeightTypeError/GetWeightDataError',
  GET_WEIGHT_DATA_FORBIDDEN = '@WeightTypeError/GetWeightDataForbiddenError',
  ADD_ENTRY = '@WeightTypeError/AddEntryError',
  DEL_ENTRY = '@WeightTypeError/DelEntryError',
  MODIFY_ENTRY = '@WeightTypeError/ModifyEntryError'
}

export type WeightError = {
  type: EWeightTypeError;
  explanation: string;
};

export enum EWeightLoadingType {
  GET_WEIGHTS_DATA,
  ADD_WEIGHT_ENTRY,
  DEL_WEIGHT_ENTRY,
  MODIFY_WEIGHT_ENTRY,
}

export interface IWeightEntry {
  id: number;
  date: string;
  weight: number;
}

export interface IWeightState {
  loading: Record<EWeightLoadingType, boolean>;
  error: null | WeightError;
  entries: IWeightEntry[];
}

const initialState: IWeightState = {
  loading: {
    [EWeightLoadingType.GET_WEIGHTS_DATA]: false,
    [EWeightLoadingType.ADD_WEIGHT_ENTRY]: false,
    [EWeightLoadingType.DEL_WEIGHT_ENTRY]: false,
    [EWeightLoadingType.MODIFY_WEIGHT_ENTRY]: false
  },
  error: null,
  entries: []
};

export const weightSlice = createSlice({
  name: 'weight',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Weight Data
      .addCase(getWeights.pending, (state) => {
        state.loading = {
          ...state.loading,
          [EWeightLoadingType.GET_WEIGHTS_DATA]: true
        };
        state.error = null;
      })
      .addCase(getWeights.fulfilled, (state, { payload }) => {
        state.loading = {
          ...state.loading,
          [EWeightLoadingType.GET_WEIGHTS_DATA]: false
        };
        state.entries = payload;
      })
      .addCase(getWeights.rejected, (state, { payload }) => {
        state.loading = {
          ...state.loading,
          [EWeightLoadingType.GET_WEIGHTS_DATA]: false
        };
        if ((payload as AxiosError).response?.status === 403) {
          state.error = {
            type: EWeightTypeError.GET_WEIGHT_DATA_FORBIDDEN,
            explanation: "Don't have rights"
          };
        } else {
          state.error = {
            type: EWeightTypeError.GET_WEIGHT_DATA,
            explanation: "Couldn't get weights"
          };
        }
      })
      // Add Weight Entry
      .addCase(addWeight.pending, (state) => {
        state.loading = {
          ...state.loading,
          [EWeightLoadingType.ADD_WEIGHT_ENTRY]: true
        };
        state.error = null;
      })
      .addCase(addWeight.fulfilled, (state, { payload }) => {
        state.loading = {
          ...state.loading,
          [EWeightLoadingType.ADD_WEIGHT_ENTRY]: false
        };
        state.entries = [...state.entries, payload];
      })
      .addCase(addWeight.rejected, (state) => {
        state.loading = {
          ...state.loading,
          [EWeightLoadingType.ADD_WEIGHT_ENTRY]: false
        };
        state.error = {
          type: EWeightTypeError.ADD_ENTRY,
          explanation: "Couldn't add weight"
        };
      })
      // Del Weight Entry
      .addCase(delWeight.pending, (state, { payload }) => {
        state.loading = {
          ...state.loading,
          [EWeightLoadingType.DEL_WEIGHT_ENTRY]: true
        };
        state.error = null;
      })
      .addCase(delWeight.fulfilled, (state, { payload }) => {
        state.loading = {
          ...state.loading,
          [EWeightLoadingType.DEL_WEIGHT_ENTRY]: false
        };
        state.entries = state.entries.filter((entry) => entry.id !== payload);
      })
      .addCase(delWeight.rejected, (state) => {
        state.loading = {
          ...state.loading,
          [EWeightLoadingType.DEL_WEIGHT_ENTRY]: false
        };
        state.error = {
          type: EWeightTypeError.DEL_ENTRY,
          explanation: "Couldn't delete weight"
        };
      })
      // Modify Weight Entry
      .addCase(modifyWeight.pending, (state) => {
        state.loading = {
          ...state.loading,
          [EWeightLoadingType.MODIFY_WEIGHT_ENTRY]: true
        };
        state.error = null;
      })
      .addCase(modifyWeight.fulfilled, (state, { payload }) => {
        state.loading = {
          ...state.loading,
          [EWeightLoadingType.MODIFY_WEIGHT_ENTRY]: false
        };
        state.entries = state.entries.map((entry) =>
          (entry.id !== payload.id ? entry : payload));
      })
      .addCase(modifyWeight.rejected, (state) => {
        state.loading = {
          ...state.loading,
          [EWeightLoadingType.MODIFY_WEIGHT_ENTRY]: false
        };
        state.error = {
          type: EWeightTypeError.MODIFY_ENTRY,
          explanation: "Couldn't modify weight"
        };
      });
  }
});

const weightReducer = weightSlice.reducer;

export default weightReducer;
