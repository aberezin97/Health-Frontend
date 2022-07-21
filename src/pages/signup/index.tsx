import React, { useState } from 'react';
import { Card, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation, Trans } from 'react-i18next';
import { ROUTES } from 'routes';
import Input from 'components/input';
import Button from 'components/button';
import PageCenter from 'components/page-center';
import {
  emailRequiredValidator,
  passwordConfirmationRequiredValidator,
  passwordRequiredValidator,
  usernameRequiredValidator
} from 'utils/validators';
import { useAppDispatch, useAppSelector } from 'store';
import { ISignUpArguments, signUp } from 'controllers/user';
import { EUserTypeError, clearUserError } from 'store/slices/userSlice';
import './index.css';

const SignUpPage = () => {
  const [t] = useTranslation('user');
  const [isSignedUp, setIsSignedUp] = useState(false);
  const { error, loading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordConfirmation: ''
    },
    validationSchema: Yup.object({
      username: usernameRequiredValidator,
      email: emailRequiredValidator,
      password: passwordRequiredValidator,
      passwordConfirmation: passwordConfirmationRequiredValidator('password')
    }),
    onSubmit: async (args: ISignUpArguments) => {
      dispatch(signUp(args))
        .unwrap()
        .then(() => setIsSignedUp(true));
    }
  });
  return (
    <PageCenter>
      {!isSignedUp ? (
        <>
          {error && error.type === EUserTypeError.SIGN_UP ? (
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
            <Card.Header as="h4">{t('sign_up')}</Card.Header>
            <Form onSubmit={formik.handleSubmit}>
              <Card.Body>
                <Input
                  type="text"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    !!(formik.errors.username && formik.touched.username)
                  }
                  isValid={
                    !!(!formik.errors.username && formik.touched.username)
                  }
                  showErrorMessage={true}
                  errorMessage={formik.errors.username}
                  className="mb-2"
                >
                  {t('username')}
                </Input>
                <Input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={!!(formik.errors.email && formik.touched.email)}
                  isValid={!!(!formik.errors.email && formik.touched.email)}
                  showErrorMessage={true}
                  errorMessage={formik.errors.username}
                  className="mb-2"
                >
                  {t('email')}
                </Input>
                <Input
                  type="text"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    !!(formik.errors.firstName && formik.touched.firstName)
                  }
                  isValid={
                    !!(!formik.errors.firstName && formik.touched.firstName)
                  }
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
                  isInvalid={
                    !!(formik.errors.lastName && formik.touched.lastName)
                  }
                  isValid={
                    !!(!formik.errors.lastName && formik.touched.lastName)
                  }
                  showErrorMessage={true}
                  errorMessage={formik.errors.lastName}
                  className="mb-2"
                >
                  {t('last_name')}
                </Input>
                <Input
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    !!(formik.errors.password && formik.touched.password)
                  }
                  isValid={
                    !!(!formik.errors.password && formik.touched.password)
                  }
                  showErrorMessage={true}
                  errorMessage={formik.errors.password}
                  className="mb-2"
                >
                  {t('password')}
                </Input>
                <Input
                  type="password"
                  name="passwordConfirmation"
                  value={formik.values.passwordConfirmation}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    !!(
                      formik.errors.passwordConfirmation
                      && formik.touched.passwordConfirmation
                    )
                  }
                  isValid={
                    !!(
                      !formik.errors.passwordConfirmation
                      && formik.touched.passwordConfirmation
                    )
                  }
                  showErrorMessage={true}
                  errorMessage={formik.errors.passwordConfirmation}
                >
                  {t('confirm_password')}
                </Input>
              </Card.Body>
              <Card.Footer>
                <Button
                  isLoading={loading}
                  className="w-100"
                  type="submit"
                  variant="success"
                >
                  {t('sign_up')}
                </Button>
                <div className="text-center text-muted">
                  <Link to={ROUTES.SIGN_IN}>{t('i_have_an_account')}</Link>
                </div>
              </Card.Footer>
            </Form>
          </Card>
        </>
      ) : (
        <div className="text-center">
          <h1>{t('account_was_created')}</h1>
          <p className="h4 text-muted mb-5">
            <Trans
              t={t}
              components={{ u: <u /> }}
              values={{ email: formik.values.email }}
            >
              we_sent_activation_link
            </Trans>
          </p>
          <Link className="btn btn-success" to={ROUTES.SIGN_IN}>
            {t('sign_in')}
          </Link>
        </div>
      )}
    </PageCenter>
  );
};

export default SignUpPage;
