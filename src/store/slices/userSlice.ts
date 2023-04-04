import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  signIn,
  signUp,
  activateUser,
  changeUserData,
  changeUserPassword,
  changeUserImage,
  sendPasswordResetLink,
  resetPassword,
  getUserProducts,
  addUserProduct,
  modifyUserProduct,
  delUserProduct,
  delAccount,
  getUserPermissions,
  getUserDefaultGoals,
  delUserPermission,
  createUserPermission,
  modifyUserPermission
} from 'controllers/user';
import { IUserShort } from 'pages/root';

export const enum EUserTypeError {
  SIGN_IN = '@UserTypeError/SignInError',
  SIGN_UP = '@UserTypeError/SignUpError',
  ACTIVATE = '@UserTypeError/ActivateError',
  SEND_PASSWORD_RESET_LINK = '@UserTypeError/SendPasswordResetLinkError',
  RESET_PASSWORD = '@UserTypeError/ResetPasswordError',
  CHANGE_DATA = '@UserTypeError/ChangeDataError',
  CHANGE_PASSWORD = '@UserTypeError/ChangePasswordError',
  CHANGE_IMAGE = '@UserTypeError/ChangeImageError',
  GET_PRODUCTS = '@UserTypeError/GetProductsError',
  ADD_PRODUCT = '@UserTypeError/AddProductError',
  DEL_PRODUCT = '@UserTypeError/DelProductError',
  MODIFY_PRODUCT = '@UserTypeError/ModifyProductError',
  DEL_ACCOUNT = '@UserTypeError/DelAccountError'
}

export type UserError = {
  type: EUserTypeError;
  explanation: string;
};

export const enum ELanguage {
  EN = 'en',
  RU = 'ru'
}

export type UserData = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string | null;
  defaultGoalLiquid: number;
  defaultGoalCalories: number;
  defaultGoalProteins: number;
  defaultGoalFats: number;
  defaultGoalCarbohydrates: number;
  defaultLimitCalories: number;
  defaultLimitProteins: number;
  defaultLimitFats: number;
  defaultLimitCarbohydrates: number;
};

export interface IUserProduct {
  id: number;
  name: string;
  calories: number;
  proteins: number;
  fats: number;
  carbohydrates: number;
}

export enum EPermissionType {
  NONE = 0,
  READ = 1,
  READWRITE = 2
}

export interface IPermission {
  id: number;
  receiver: IUserShort;
  weight: EPermissionType,
  nutrition: EPermissionType,
  exercises: EPermissionType,
  stats: EPermissionType
}

export interface IUserState {
  data: null | UserData;
  loading: boolean;
  language: ELanguage;
  error: null | UserError;
  token: null | string;
  products: IUserProduct[];
  permissions: IPermission[];
}

const initialState: IUserState = {
  data: null,
  loading: false,
  language: ELanguage.EN,
  error: null,
  token: null,
  products: [],
  permissions: []
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserError(state) {
      state.error = null;
    },
    signOut(state) {
      state.data = null;
      state.loading = false;
      state.error = null;
      state.token = null;
      state.products = [];
    },
    changeLanguage(state, action: PayloadAction<ELanguage>) {
      state.language = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Sign In
      .addCase(signIn.pending, (state, { payload }) => {
        state.data = null;
        state.loading = true;
        state.error = null;
        state.token = null;
        state.products = [];
      })
      .addCase(
        signIn.fulfilled,
        (
          state,
          { payload }: { payload: { token: string; data: UserData } }
        ) => {
          state.data = payload.data;
          state.loading = false;
          state.error = null;
          state.token = payload.token;
        }
      )
      .addCase(signIn.rejected, (state, { payload }) => {
        state.data = null;
        state.loading = false;
        state.error = {
          type: EUserTypeError.SIGN_IN,
          explanation: 'Unable to sign in with provided credentials.'
        };
      })
      // Sign Up
      .addCase(signUp.pending, (state) => {
        state.data = null;
        state.loading = true;
        state.error = null;
        state.token = null;
        state.products = [];
      })
      .addCase(signUp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signUp.rejected, (state) => {
        state.loading = false;
        state.error = {
          type: EUserTypeError.SIGN_UP,
          explanation: 'Unable to sign up with provided credentials.'
        };
      })
      // Activate User
      .addCase(activateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(activateUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.token = payload.token;
        state.data = payload.data;
      })
      .addCase(activateUser.rejected, (state) => {
        state.loading = false;
        state.error = {
          type: EUserTypeError.ACTIVATE,
          explanation: "Couldn't activate user"
        };
      })
      // Send Password Reset Link
      .addCase(sendPasswordResetLink.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendPasswordResetLink.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendPasswordResetLink.rejected, (state) => {
        state.loading = false;
        state.error = {
          type: EUserTypeError.SEND_PASSWORD_RESET_LINK,
          explanation: "Couldn't send rest link"
        };
      })
      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state) => {
        state.loading = false;
        state.error = {
          type: EUserTypeError.RESET_PASSWORD,
          explanation: "Couldn't reset password"
        };
      })
      // Change User Data
      .addCase(changeUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        changeUserData.fulfilled,
        (
          state,
          {
            payload
          }: {
            payload: { username: string; firstName: string; lastName: string };
          }
        ) => {
          state.loading = false;
          if (state.data !== null) {
            state.data.username = payload.username;
            state.data.firstName = payload.firstName;
            state.data.lastName = payload.lastName;
          }
        }
      )
      .addCase(changeUserData.rejected, (state) => {
        state.loading = false;
        state.error = {
          type: EUserTypeError.CHANGE_DATA,
          explanation: "Couldn't change user data"
        };
      })
      // Change User Password
      .addCase(changeUserPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeUserPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(changeUserPassword.rejected, (state) => {
        state.loading = false;
        state.error = {
          type: EUserTypeError.CHANGE_PASSWORD,
          explanation: "Couldn't change user password"
        };
      })
      // Change User Image
      .addCase(changeUserImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        changeUserImage.fulfilled,
        (
          state,
          {
            payload
          }: {
            payload: { image: string };
          }
        ) => {
          state.loading = false;
          if (state.data !== null) {
            state.data.image = payload.image;
          }
        }
      )
      .addCase(changeUserImage.rejected, (state) => {
        state.loading = false;
        state.error = {
          type: EUserTypeError.CHANGE_IMAGE,
          explanation: "Couldn't change user image"
        };
      })
      // Get User Products
      .addCase(getUserProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProducts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.products = payload;
      })
      .addCase(getUserProducts.rejected, (state) => {
        state.loading = false;
        state.error = {
          type: EUserTypeError.GET_PRODUCTS,
          explanation: "Couldn't get user products"
        };
      })
      // Add User Products
      .addCase(addUserProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUserProduct.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.products = [...state.products, payload];
      })
      .addCase(addUserProduct.rejected, (state) => {
        state.loading = false;
        state.error = {
          type: EUserTypeError.ADD_PRODUCT,
          explanation: "Couldn't add user product"
        };
      })
      // Modify User Product
      .addCase(modifyUserProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(modifyUserProduct.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.products = state.products.map((product) =>
          (product.id !== payload.id ? product : payload));
      })
      .addCase(modifyUserProduct.rejected, (state) => {
        state.loading = false;
        state.error = {
          type: EUserTypeError.MODIFY_PRODUCT,
          explanation: "Couldn't modify user product"
        };
      })
      // Del User Product
      .addCase(delUserProduct.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(delUserProduct.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.products = state.products.filter(
          (product) => product.id !== payload
        );
      })
      .addCase(delUserProduct.rejected, (state) => {
        state.loading = false;
        state.error = {
          type: EUserTypeError.DEL_PRODUCT,
          explanation: "Couldn't delete user product"
        };
      })
      // Del User Account
      .addCase(delAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(delAccount.fulfilled, (state) => {
        state.loading = false;
        state.data = null;
        state.token = null;
        state.products = [];
      })
      .addCase(delAccount.rejected, (state) => {
        state.loading = false;
        state.error = {
          type: EUserTypeError.DEL_ACCOUNT,
          explanation: "Couldn't delete user account"
        };
      })
      // Get User Permissions
      .addCase(getUserPermissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserPermissions.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.permissions = payload;
      })
      .addCase(getUserPermissions.rejected, (state) => {
        state.loading = false;
      })
      // Get User Default Goals
      .addCase(getUserDefaultGoals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserDefaultGoals.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = {
          ...state.data,
          ...payload
        };
      })
      // TODO: getUserDefaultGoals.rejected
      // Del User Permission
      .addCase(delUserPermission.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(delUserPermission.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.permissions = state.permissions.filter(
          (permission) => permission.id !== payload
        );
      })
      // TODO : delUserPermission.rejected
      .addCase(createUserPermission.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUserPermission.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.permissions = [
          ...state.permissions,
          payload
        ];
      })
      .addCase(modifyUserPermission.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(modifyUserPermission.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.permissions = state.permissions.map(
          (permission) => (permission.id === payload.id
            ? { ...permission, ...payload }
            : permission)
        );
      });
  }
});

const userReducer = userSlice.reducer;

export const { clearUserError, changeLanguage, signOut } = userSlice.actions;

export default userReducer;
