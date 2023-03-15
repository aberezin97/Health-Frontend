import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getStats = createAsyncThunk(
  'stats/getStats',
  async (userId: number, { rejectWithValue, getState }) => {
    const { token } = (getState() as { user: { token: string } }).user;
    try {
      const { data } = await axios.get(`/api/${userId}/stats/`, {
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
