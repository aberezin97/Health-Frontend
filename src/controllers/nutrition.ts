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
}

export const addNutritionEntry = createAsyncThunk(
  'nutrition/addNutritionEntry',
  async (args: IAddNutritionEntryArguments, { rejectWithValue, getState }) => {
    const { token } = (getState() as { user: { token: string } }).user;
    try {
      const { data } = args.date
        ? await axios.post(
          `/api/nutrition
          /${args.date.year}/${args.date.month}/${args.date.day}/`,
          args,
          {
            headers: {
              Authorization: `Token ${token}`
            }
          }
        )
        : await axios.post('/api/nutrition/', args, {
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

export type GetNutritionDataArgs = YearMonthDay | undefined;

export const getNutritionData = createAsyncThunk(
  'nutrition/getNutritionData',
  async (args: GetNutritionDataArgs, { rejectWithValue, getState }) => {
    const { token } = (getState() as { user: { token: string } }).user;
    try {
      const { data } =
        typeof args === 'undefined'
          ? await axios.get('/api/nutrition/', {
            headers: {
              Authorization: `Token ${token}`
            }
          })
          : await axios.get(
            `/api/nutrition/${args.year}/${args.month}/${args.day}/`,
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
