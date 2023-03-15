import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface YearMonthDay {
  year: string;
  month: string;
  day: string;
}

export interface IAddNutritionEntryArguments {
  name: string;
  time: string;
  calories: number;
  proteins: number;
  fats: number;
  carbohydrates: number;
  weight: number;
  date?: YearMonthDay | undefined;
  userId: number;
}

export const addNutritionEntry = createAsyncThunk(
  'nutrition/addNutritionEntry',
  async ({
    date,
    userId,
    ...args
  }: IAddNutritionEntryArguments, { rejectWithValue, getState }) => {
    const { token } = (getState() as { user: { token: string } }).user;
    try {
      const { data } = typeof date !== 'undefined'
        ? await axios.post(
          `/api/${userId}/nutrition` +
          `/${date.year}/${date.month}/${date.day}/`,
          args,
          {
            headers: {
              Authorization: `Token ${token}`
            }
          }
        )
        : await axios.post(`/api/${userId}/nutrition/`, args, {
          headers: {
            Authorization: `Token ${token}`
          }
        });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const delNutritionEntry = createAsyncThunk(
  'nutrition/delNutritionEntry',
  async (id: number, { rejectWithValue, getState }) => {
    const { token } = (getState() as { user: { token: string } }).user;
    try {
      await axios.delete(`/api/nutrition/${id}/`, {
        headers: {
          Authorization: `Token ${token}`
        }
      });
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export interface IModifyNutritionEntryArguments
  extends IAddNutritionEntryArguments {
  id: number;
}

export const modifyNutritionEntry = createAsyncThunk(
  'nutrition/modifyNutritionEntry',
  async (
    { id, ...args }: IModifyNutritionEntryArguments,
    { rejectWithValue, getState }
  ) => {
    const { token } = (getState() as { user: { token: string } }).user;
    try {
      const { data } = await axios.put(`/api/nutrition/${id}/`, args, {
        headers: {
          Authorization: `Token ${token}`
        }
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

interface IGetNutritionDataArgs {
  userId: number;
  date?: YearMonthDay;
}

export const getNutritionData = createAsyncThunk(
  'nutrition/getNutritionData',
  async ({
    userId,
    date
  }: IGetNutritionDataArgs, { rejectWithValue, getState }) => {
    const { token } = (getState() as { user: { token: string } }).user;
    try {
      const { data } =
        typeof date === 'undefined'
          ? await axios.get(`/api/${userId}/nutrition/`, {
            headers: {
              Authorization: `Token ${token}`
            }
          })
          : await axios.get(
            `/api/${userId}/nutrition/${date.year}/${date.month}/${date.day}/`,
            {
              headers: {
                Authorization: `Token ${token}`
              }
            }
          );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export interface IModifyNutritionGoalsArguments {
  date?: YearMonthDay | undefined;
  limitCalories: number;
  goalCalories: number;
  limitProteins: number;
  goalProteins: number;
  limitFats: number;
  goalFats: number;
  limitCarbohydrates: number;
  goalCarbohydrates: number;
  goalLiquid: number;
}

export const modifyNutritionGoals = createAsyncThunk(
  'nutrition/modifyNutritionGoals',
  async (
    { date, ...args }: IModifyNutritionGoalsArguments,
    { rejectWithValue, getState }
  ) => {
    const { token } = (getState() as { user: { token: string } }).user;
    try {
      const { data } =
        typeof date === 'undefined'
          ? await axios.put('/api/nutrition/modify_goals/', args, {
            headers: {
              Authorization: `Token ${token}`
            }
          })
          : await axios.put(
            `/api/nutrition/${date.year}/${date.month}/${date.day}` +
            '/modify_goals/',
            args,
            {
              headers: {
                Authorization: `Token ${token}`
              }
            }
          );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export interface IAddLiquidEntryArguments {
  date?: YearMonthDay | undefined;
  time: string;
  quantity: number;
  userId: number;
}

export const addLiquidEntry = createAsyncThunk(
  'nutrition/addLiquidEntry',
  async (
    { date, userId, ...args }: IAddLiquidEntryArguments,
    { rejectWithValue, getState }
  ) => {
    const { token } = (getState() as { user: { token: string } }).user;
    try {
      const { data } =
        typeof date === 'undefined'
          ? await axios.post(`/api/${userId}/nutrition/liquid/`, args, {
            headers: {
              Authorization: `Token ${token}`
            }
          })
          : await axios.post(
            // eslint-disable-next-line max-len
            `/api/${userId}/nutrition/liquid/${date.year}/${date.month}/${date.day}`,
            args,
            {
              headers: {
                Authorization: `Token ${token}`
              }
            }
          );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const delLiquidEntry = createAsyncThunk(
  'nutrition/delLiquidEntry',
  async (id: number, { rejectWithValue, getState }) => {
    const { token } = (getState() as { user: { token: string } }).user;
    try {
      await axios.delete(`/api/nutrition/liquid/${id}/`, {
        headers: {
          Authorization: `Token ${token}`
        }
      });
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
