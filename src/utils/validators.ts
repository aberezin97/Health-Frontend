import * as Yup from 'yup';

export const fieldValidator = Yup.string();

export const usernameValidator = Yup.string()
  .min(3, 'Must be at least 3 characters.')
  .max(16, 'Must be at most 16 characters.')
  .matches(/^[^\W_]+$/, 'Can consist only from digits and letters.');

export const passwordValidator = Yup.string()
  .min(8, 'Must be at least 8 characters.')
  .max(128, 'Must be at most 128 characters.')
  .matches(/\D+/g, "Can't consist only from digits.");

export const emailValidator = Yup.string().email('Invalid email.');

// Required
const requiredMessage = 'Required field.';

export const fieldRequiredValidator = fieldValidator.required(requiredMessage);

export const usernameRequiredValidator =
  usernameValidator.required(requiredMessage);

export const passwordRequiredValidator =
  passwordValidator.required(requiredMessage);

export const emailRequiredValidator = emailValidator.required(requiredMessage);

export const passwordConfirmationRequiredValidator = (ref: string) =>
  fieldRequiredValidator.oneOf([Yup.ref(ref), null], 'Passwords must match.');
