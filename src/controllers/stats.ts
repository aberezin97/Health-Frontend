import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getStats = createAsyncThunk(
  'stats/getStats',
  async (args, { rejectWithValue, getState }) => {
    const { token } = (getState() as { user: { token: string } }).user;
    try {
      const { data } = await axios.get('/api/stats/', {
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
