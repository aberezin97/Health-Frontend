import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { EPermissionType } from 'store/slices/userSlice';

export interface ISignInArguments {
  username: string;
  password: string;
}

export const signIn = createAsyncThunk(
  'user/signIn',
  async (args: ISignInArguments, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/user/signin/', args);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export interface ISignUpArguments {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export const signUp = createAsyncThunk(
  'user/signUp',
  async (args: ISignUpArguments, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/user/signup/', args);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export interface IActivateUserArguments {
  uidb64: string;
  token: string;
}

export const activateUser = createAsyncThunk(
  'user/activate',
  async ({ uidb64, token }: IActivateUserArguments, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `/api/user/activate/${uidb64}/${token}/`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export interface ISendPasswordResetLinkArguments {
  email: string;
}

export const sendPasswordResetLink = createAsyncThunk(
  'user/sendPasswordResetLink',
  async (args: ISendPasswordResetLinkArguments, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/user/password_reset/', args);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export interface IResetPasswordArguments {
  password: string;
  token: string;
}

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (args: IResetPasswordArguments, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        '/api/user/password_reset/confirm/',
        args
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export interface IChangeUserPasswordArguments {
  oldPassword: string;
  newPassword: string;
}

export const changeUserPassword = createAsyncThunk(
  'user/changeUserPassword',
  async (args: IChangeUserPasswordArguments, { rejectWithValue, getState }) => {
    const { token } = (getState() as { user: { token: string } }).user;
    try {
      const { data } = await axios.put('/api/user/change_password/', args, {
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

export interface IChangeUserDataArguments {
  username: string;
  firstName: string;
  lastName: string;
}

export const changeUserData = createAsyncThunk(
  'user/changeUserData',
  async (args: IChangeUserDataArguments, { rejectWithValue, getState }) => {
    const { token } = (getState() as { user: { token: string } }).user;
    try {
      const { data } = await axios.put('/api/user/change_data/', args, {
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

export const changeUserImage = createAsyncThunk(
  'user/changeUserImage',
  async (arg: FormData, { rejectWithValue, getState }) => {
    const { token } = (getState() as { user: { token: string } }).user;
    try {
      const { data } = await axios.put('/api/user/change_image/', arg, {
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

export const getUserProducts = createAsyncThunk(
  'user/getProducts',
  async (args, { rejectWithValue, getState }) => {
    try {
      const { token } = (getState() as { user: { token: string } }).user;
      const { data } = await axios.get('/api/user/products/', {
        headers: { Authorization: `Token ${token}` }
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export interface IAddUserProduct {
  name: string;
  calories: number;
  proteins: number;
  fats: number;
  carbohydrates: number;
}

export const addUserProduct = createAsyncThunk(
  'user/addProduct',
  async (args: IAddUserProduct, { rejectWithValue, getState }) => {
    const { token } = (getState() as { user: { token: string } }).user;
    try {
      const { data } = await axios.post('/api/user/products/', args, {
        headers: { Authorization: `Token ${token}` }
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export interface IModifyUserProduct extends IAddUserProduct {
  id: number;
}

export const modifyUserProduct = createAsyncThunk(
  'user/modifyProduct',
  async (
    { id, ...args }: IModifyUserProduct,
    { rejectWithValue, getState }
  ) => {
    const { token } = (getState() as { user: { token: string } }).user;
    try {
      const { data } = await axios.put(`/api/user/products/${id}/`, args, {
        headers: { Authorization: `Token ${token}` }
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const delUserProduct = createAsyncThunk(
  'user/delProduct',
  async (id: number, { rejectWithValue, getState }) => {
    const { token } = (getState() as { user: { token: string } }).user;
    try {
      axios.delete(`/api/user/products/${id}/`, {
        headers: { Authorization: `Token ${token}` }
      });
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export interface IDelAccountArgs {
  password: string;
}

export const delAccount = createAsyncThunk(
  'user/delAccount',
  async (args: IDelAccountArgs, { rejectWithValue, getState }) => {
    const { token } = (getState() as { user: { token: string } }).user;
    try {
      const { data } = await axios.delete('/api/user/delete/', {
        headers: { Authorization: `Token ${token}` },
        data: args
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export interface IChangeUserDefaultGoalsArguments {
  defaultGoalLiquid: number;
  defaultGoalCalories: number;
  defaultGoalProteins: number;
  defaultGoalFats: number;
  defaultGoalCarbohydrates: number;
  defaultLimitCalories: number;
  defaultLimitProteins: number;
  defaultLimitFats: number;
  defaultLimitCarbohydrates: number;
}

export const changeUserDefaultGoals = createAsyncThunk(
  'user/changeDefaultGoals',
  async (
    args: IChangeUserDefaultGoalsArguments,
    { rejectWithValue, getState }
  ) => {
    const { token } = (getState() as { user: { token: string } }).user;
    try {
      const { data } = await axios.put(
        '/api/user/default_goals/',
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

export const getUserDefaultGoals = createAsyncThunk(
  'user/getUserDefaultGoals',
  async (args, { rejectWithValue, getState }) => {
    const { token } = (getState() as { user: { token: string } }).user;
    try {
      const { data } = await axios.get(
        '/api/user/default_goals/',
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

export const getUserPermissions = createAsyncThunk(
  'user/getPermissions',
  async (args, { rejectWithValue, getState }) => {
    const { token } = (getState() as { user: { token: string } }).user;
    try {
      const { data } = await axios.get(
        '/api/user/permissions/',
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

export const delUserPermission = createAsyncThunk(
  'user/delPermission',
  async (id: number, { rejectWithValue, getState }) => {
    const { token } = (getState() as { user: { token: string } }).user;
    try {
      await axios.delete(
        `/api/user/permissions/${id}`,
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      );
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export interface ICreateUserPermissionArgs {
  receiver: number;
  stats: EPermissionType;
  exercises: EPermissionType;
  nutrition: EPermissionType;
  weight: EPermissionType;
}

export const createUserPermission = createAsyncThunk(
  'user/createPermission',
  async (args: ICreateUserPermissionArgs, { rejectWithValue, getState }) => {
    const { token } = (getState() as { user: { token: string } }).user;
    try {
      const { data } = await axios.post(
        '/api/user/create_permission/',
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

interface IModifyUserPermissionArgs {
  id: number;
  exercises: EPermissionType;
  weight: EPermissionType;
  stats: EPermissionType;
  nutrition: EPermissionType;
}

export const modifyUserPermission = createAsyncThunk(
  'user/modifyPermission',
  async ({
    id,
    ...args
  }: IModifyUserPermissionArgs, { rejectWithValue, getState }) => {
    const { token } = (getState() as { user: { token: string } }).user;
    try {
      const { data } = await axios.put(
        `/api/user/permissions/${id}/`,
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
