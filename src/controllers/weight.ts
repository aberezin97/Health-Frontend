import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getWeights = createAsyncThunk(
  'weight/getWeights',
  async (args, { rejectWithValue, getState }) => {
    const { token } = (getState() as { user: { token: string } }).user;
    try {
      const { data } = await axios.get('/api/weight/', {
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

export interface IAddWeightArguments {
  date: string;
  weight: number;
}

export const addWeight = createAsyncThunk(
  'weight/addWeight',
  async (args: IAddWeightArguments, { rejectWithValue, getState }) => {
    const { token } = (getState() as { user: { token: string } }).user;
    try {
      const { data } = await axios.post('/api/weight/', args, {
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

export const delWeight = createAsyncThunk(
  'weight/delWeight',
  async (id: number, { rejectWithValue, getState }) => {
    const { token } = (getState() as { user: { token: string } }).user;
    try {
      await axios.delete(`/api/weight/${id}/`, {
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

export interface IModifyWeightArguments extends IAddWeightArguments {
  id: number;
}

export const modifyWeight = createAsyncThunk(
  'weight/modifyWeight',
  async (
    { id, ...args }: IModifyWeightArguments,
    { rejectWithValue, getState }
  ) => {
    const { token } = (getState() as { user: { token: string } }).user;
    try {
      const { data } = await axios.put(`/api/weight/${id}/`, args, {
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
