import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { YearMonthDay } from './nutrition';

export interface IGetExercisesDataArgs {
  userId: number;
  date: YearMonthDay | undefined;
}

export const getExercisesData = createAsyncThunk(
  'nutrition/getExercisesData',
  async ({
    userId,
    date
  }: IGetExercisesDataArgs, { rejectWithValue, getState }) => {
    const { token } = (getState() as { user: { token: string } }).user;
    try {
      const { data } =
        typeof date === 'undefined'
          ? await axios.get(`/api/${userId}/exercises/`, {
            headers: {
              Authorization: `Token ${token}`
            }
          })
          : await axios.get(
            `/api/${userId}/exercises/${date.year}/${date.month}/${date.day}/`,
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

export interface IAddExerciseEntryArguments {
  name: string;
  approaches: number;
  counts: number;
  date?: YearMonthDay | undefined;
}

export const addExerciseEntry = createAsyncThunk(
  'nutrition/addExerciseEntry',
  async (args: IAddExerciseEntryArguments, { rejectWithValue, getState }) => {
    const { token } = (getState() as { user: { token: string } }).user;
    try {
      const { data } = typeof args.date !== 'undefined'
        ? await axios.post(
          '/api/exercises' +
          `/${args.date.year}/${args.date.month}/${args.date.day}/`,
          args,
          {
            headers: {
              Authorization: `Token ${token}`
            }
          }
        )
        : await axios.post('/api/exercises/', args, {
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

export interface IModifyExerciseEntryArguments {
  id: number;
  name: string;
  approaches: number;
  counts: number;
}

export const modifyExerciseEntry = createAsyncThunk(
  'nutrition/modifyExerciseEntry',
  async (
    { id, ...args }: IModifyExerciseEntryArguments,
    { rejectWithValue, getState }
  ) => {
    const { token } = (getState() as { user: { token: string } }).user;
    try {
      const { data } = await axios.put(`/api/exercises/${id}/`, args, {
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

export const delExerciseEntry = createAsyncThunk(
  'nutrition/delExerciseEntry',
  async (id: number, { rejectWithValue, getState }) => {
    const { token } = (getState() as { user: { token: string } }).user;
    try {
      await axios.delete(`/api/exercises/${id}/`, {
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
