import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { Card, Form, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import Input from 'components/input';
import Button from 'components/button';
import PageCenter from 'components/page-center';
import { ROUTES } from 'routes';
import { resetPassword } from 'controllers/user';
import { EUserTypeError, clearUserError } from 'store/slices/userSlice';
import { useAppDispatch, useAppSelector } from 'store';
import {
  passwordRequiredValidator,
  passwordConfirmationRequiredValidator
} from 'utils/validators';
import './index.css';

const ResetPasswordPage = () => {
  const [t] = useTranslation('user');
  const [isReset, setIsReset] = useState(false);
  const dispatch = useAppDispatch();
  const { error, loading } = useAppSelector((state) => state.user);
  const { token } = useParams();
  const formik = useFormik({
    initialValues: {
      password: '',
      passwordConfirmation: ''
    },
    validationSchema: Yup.object({
      password: passwordRequiredValidator,
      passwordConfirmation: passwordConfirmationRequiredValidator('password')
    }),
    onSubmit: ({ password }) => {
      if (token !== undefined) {
        dispatch(resetPassword({ password, token }))
          .unwrap()
          .then(() => setIsReset(true));
      }
    }
  });
  return (
    <PageCenter>
      {!isReset ? (
        <>
          {error && error.type === EUserTypeError.RESET_PASSWORD ? (
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
            <Card.Header as="h4">{t('reset_password')}</Card.Header>
            <Form onSubmit={formik.handleSubmit}>
              <Card.Body>
                <Input
                  type="password"
                  name="password"
                  className="mb-2"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isValid={
                    !!(!formik.errors.password && formik.touched.password)
                  }
                  isInvalid={
                    !!(formik.errors.password && formik.touched.password)
                  }
                  showErrorMessage={true}
                  errorMessage={formik.errors.password}
                >
                  {t('new_password')}
                </Input>
                <Input
                  type="password"
                  name="passwordConfirmation"
                  value={formik.values.passwordConfirmation}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isValid={
                    !!(
                      !formik.errors.passwordConfirmation
                      && formik.touched.passwordConfirmation
                    )
                  }
                  isInvalid={
                    !!(
                      formik.errors.passwordConfirmation
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
                  className="w-100"
                  type="submit"
                  variant="success"
                  isLoading={loading}
                >
                  {t('set_new_password')}
                </Button>
                <div className="text-center text-muted">
                  <Link to={ROUTES.SIGN_IN}>{t('sign_in')}</Link>
                </div>
              </Card.Footer>
            </Form>
          </Card>
        </>
      ) : (
        <div className="text-center">
          <h1>{t('password_was_reset')}</h1>
          <p className="h4 text-muted mb-5">{t('we_reset_your_password')}</p>
          <Link className="btn btn-success" to={ROUTES.SIGN_IN}>
            {t('sign_in')}
          </Link>
        </div>
      )}
    </PageCenter>
  );
};

export default ResetPasswordPage;
