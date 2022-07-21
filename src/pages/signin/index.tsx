import React from 'react';
import { Card, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { ROUTES } from 'routes';
import Input from 'components/input';
import Button from 'components/button';
import PageCenter from 'components/page-center';
import { useAppDispatch, useAppSelector } from 'store';
import { ISignInArguments, signIn } from 'controllers/user';
import { EUserTypeError, clearUserError } from 'store/slices/userSlice';
import {
  usernameRequiredValidator,
  passwordRequiredValidator
} from 'utils/validators';
import './index.css';

const SignInPage = () => {
  const [t] = useTranslation('user');
  const { loading, error } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: usernameRequiredValidator,
      password: passwordRequiredValidator
    }),
    onSubmit: (args: ISignInArguments) => {
      dispatch(signIn(args));
    }
  });

  return (
    <PageCenter>
      {error && error.type === EUserTypeError.SIGN_IN ? (
        <Alert
          variant="danger"
          onClose={() => dispatch(clearUserError())}
          dismissible
        >
          <Alert.Heading>Error</Alert.Heading>
          <p>{error.explanation}</p>
        </Alert>
      ) : null}
      <Card>
        <Card.Header as="h4">{t('sign_in')}</Card.Header>
        <Form onSubmit={formik.handleSubmit}>
          <Card.Body>
            <Input
              type="text"
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
              isInvalid={!!(formik.errors.username && formik.touched.username)}
              className="mb-2"
            >
              {t('username')}
            </Input>
            <Input
              type="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              isInvalid={!!(formik.errors.password && formik.touched.password)}
            >
              <>
                {t('password')}
                <span className="form-label-description">
                  <Link to={ROUTES.RESET}>{t('reset_password')}</Link>
                </span>
              </>
            </Input>
          </Card.Body>
          <Card.Footer>
            <Button
              isLoading={loading}
              className="w-100"
              type="submit"
              variant="success"
            >
              {t('sign_in')}
            </Button>
            <div className="text-center text-muted">
              <Link to={ROUTES.SIGN_UP}>{t('create_an_account')}</Link>
            </div>
          </Card.Footer>
        </Form>
      </Card>
    </PageCenter>
  );
};

export default SignInPage;
