import React, { useState } from 'react';
import { Card, Form, Alert } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'store';
import { changeUserPassword } from 'controllers/user';
import { EUserTypeError, clearUserError } from 'store/slices/userSlice';
import {
  passwordRequiredValidator,
  passwordConfirmationRequiredValidator
} from 'utils/validators';
import Input from 'components/input';
import Button from 'components/button';
import './index.css';

const ChangeUserPassword = () => {
  const [t] = useTranslation('user');
  const [isChanged, setIsChanged] = useState(false);
  const { error, loading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      newPasswordConfirmation: ''
    },
    validationSchema: Yup.object({
      newPassword: passwordRequiredValidator,
      newPasswordConfirmation:
        passwordConfirmationRequiredValidator('newPassword')
    }),
    onSubmit: (args) => {
      dispatch(changeUserPassword(args))
        .unwrap()
        .then(() => {
          setIsChanged(true);
        });
    }
  });
  return (
    <Card>
      <Card.Header as="h4">{t('change_user_password')}</Card.Header>
      <Form onSubmit={formik.handleSubmit}>
        <Card.Body>
          {isChanged ? (
            <Alert
              variant="success"
              onClose={() => setIsChanged(false)}
              dismissible
            >
              Your password was successfully changed
            </Alert>
          ) : null}
          {error !== null && error.type === EUserTypeError.CHANGE_PASSWORD ? (
            <Alert
              variant="danger"
              onClose={() => dispatch(clearUserError())}
              dismissible
            >
              {error.explanation}
            </Alert>
          ) : null}
          <Input
            type="password"
            name="oldPassword"
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mb-2"
          >
            {t('old_password')}
          </Input>
          <Input
            type="password"
            name="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isValid={
              !!(!formik.errors.newPassword && formik.touched.newPassword)
            }
            isInvalid={
              !!(formik.errors.newPassword && formik.touched.newPassword)
            }
            showErrorMessage={true}
            errorMessage={formik.errors.newPassword}
            className="mb-2"
          >
            {t('new_password')}
          </Input>
          <Input
            type="password"
            name="newPasswordConfirmation"
            value={formik.values.newPasswordConfirmation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isValid={
              !!(
                !formik.errors.newPasswordConfirmation
                && formik.touched.newPasswordConfirmation
              )
            }
            isInvalid={
              !!(
                formik.errors.newPasswordConfirmation
                && formik.touched.newPasswordConfirmation
              )
            }
            showErrorMessage={true}
            errorMessage={formik.errors.newPasswordConfirmation}
          >
            {t('confirm_password')}
          </Input>
        </Card.Body>
        <Card.Footer>
          <Button
            type="submit"
            className="w-100"
            variant="success"
            isLoading={loading}
          >
            {t('change_user_password')}
          </Button>
        </Card.Footer>
      </Form>
    </Card>
  );
};

export default ChangeUserPassword;
