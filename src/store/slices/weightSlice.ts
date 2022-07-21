import { createSlice } from '@reduxjs/toolkit';
import {
  getWeights,
  addWeight,
  delWeight,
  modifyWeight
} from 'controllers/weight';

export const enum EWeightTypeError {
  GET_WEIGHT_DATA = '@WeightTypeError/GetWeightDataError',
  ADD_ENTRY = '@WeightTypeError/AddEntryError',
  DEL_ENTRY = '@WeightTypeError/DelEntryError',
  MODIFY_ENTRY = '@WeightTypeError/ModifyEntryError'
}

export type WeightError = {
  type: EWeightTypeError;
  explanation: string;
};

export interface IWeightEntry {
  id: number;
  date: string;
  weight: number;
}

export interface IWeightState {
  loading: boolean;
  error: null | WeightError;
  entries: IWeightEntry[];
}

const initialState: IWeightState = {
  loading: false,
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
        state.loading = true;
        state.error = null;
      })
      .addCase(getWeights.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.entries = payload;
      })
      .addCase(getWeights.rejected, (state) => {
        state.loading = false;
        state.error = {
          type: EWeightTypeError.GET_WEIGHT_DATA,
          explanation: "Couldn't get weights"
        };
      })
      // Add Weight Entry
      .addCase(addWeight.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addWeight.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.entries = [...state.entries, payload];
      })
      .addCase(addWeight.rejected, (state) => {
        state.loading = false;
        state.error = {
          type: EWeightTypeError.ADD_ENTRY,
          explanation: "Couldn't add weight"
        };
      })
      // Del Weight Entry
      .addCase(delWeight.pending, (state, { payload }) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(delWeight.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.entries = state.entries.filter((entry) => entry.id !== payload);
      })
      .addCase(delWeight.rejected, (state) => {
        state.loading = false;
        state.error = {
          type: EWeightTypeError.DEL_ENTRY,
          explanation: "Couldn't delete weight"
        };
      })
      // Modify Weight Entry
      .addCase(modifyWeight.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(modifyWeight.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.entries = state.entries.map((entry) =>
          (entry.id !== payload.id ? entry : payload));
      })
      .addCase(modifyWeight.rejected, (state) => {
        state.loading = false;
        state.error = {
          type: EWeightTypeError.MODIFY_ENTRY,
          explanation: "Couldn't modify weight"
        };
      });
  }
});

const weightReducer = weightSlice.reducer;

export default weightReducer;
