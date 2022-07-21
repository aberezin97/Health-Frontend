import React, { useState } from 'react';
import { Card, Form, Alert } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from 'store';
import { changeUserData } from 'controllers/user';
import { EUserTypeError, clearUserError } from 'store/slices/userSlice';
import { usernameRequiredValidator } from 'utils/validators';
import Input from 'components/input';
import Button from 'components/button';
import './index.css';

export interface IChangeUserDataProps {
  initialValues: {
    username: string;
    firstName: string;
    lastName: string;
  } | null;
}

const ChangeUserData = ({ initialValues }: IChangeUserDataProps) => {
  const [t] = useTranslation('user');
  const [isChanged, setIsChanged] = useState(false);
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.user);
  const formik = useFormik({
    initialValues:
      initialValues !== null
        ? initialValues
        : { username: '', firstName: '', lastName: '' },
    validationSchema: Yup.object({
      username: usernameRequiredValidator
    }),
    onSubmit: (args) => {
      dispatch(changeUserData(args))
        .unwrap()
        .then(() => {
          setIsChanged(true);
        });
    }
  });
  return (
    <Card>
      <Card.Header as="h4">{t('change_user_data')}</Card.Header>
      <Form onSubmit={formik.handleSubmit}>
        <Card.Body>
          {isChanged ? (
            <Alert
              variant="success"
              onClose={() => setIsChanged(false)}
              dismissible
            >
              Your data was successfully changed
            </Alert>
          ) : null}
          {error !== null && error.type === EUserTypeError.CHANGE_DATA ? (
            <Alert
              variant="danger"
              onClose={() => dispatch(clearUserError())}
              dismissible
            >
              {error.explanation}
            </Alert>
          ) : null}
          <Input
            type="text"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isValid={!!(!formik.errors.username && formik.touched.username)}
            isInvalid={!!(formik.errors.username && formik.touched.username)}
            showErrorMessage={true}
            errorMessage={formik.errors.username}
            className="mb-2"
          >
            {t('username')}
          </Input>
          <Input
            type="text"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isValid={!!(!formik.errors.firstName && formik.touched.firstName)}
            isInvalid={!!(formik.errors.firstName && formik.touched.firstName)}
            showErrorMessage={true}
            errorMessage={formik.errors.firstName}
            className="mb-2"
          >
            {t('first_name')}
          </Input>
          <Input
            type="text"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isValid={!!(!formik.errors.lastName && formik.touched.lastName)}
            isInvalid={!!(formik.errors.lastName && formik.touched.lastName)}
            showErrorMessage={true}
            errorMessage={formik.errors.lastName}
          >
            {t('last_name')}
          </Input>
        </Card.Body>
        <Card.Footer>
          <Button
            type="submit"
            className="w-100"
            variant="success"
            isLoading={loading}
          >
            {t('change_user_data')}
          </Button>
        </Card.Footer>
      </Form>
    </Card>
  );
};

export default ChangeUserData;
