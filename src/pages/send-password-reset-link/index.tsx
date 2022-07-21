import React, { useState } from 'react';
import { Card, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { useTranslation, Trans } from 'react-i18next';
import * as Yup from 'yup';
import Input from 'components/input';
import Button from 'components/button';
import PageCenter from 'components/page-center';
import { sendPasswordResetLink } from 'controllers/user';
import { useAppDispatch, useAppSelector } from 'store';
import { EUserTypeError, clearUserError } from 'store/slices/userSlice';
import { emailRequiredValidator } from 'utils/validators';
import { ROUTES } from 'routes';
import './index.css';

const SendPasswordResetLinkPage = () => {
  const [t] = useTranslation('user');
  const [isSent, setIsSent] = useState(false);
  const { loading, error } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: Yup.object({
      email: emailRequiredValidator
    }),
    onSubmit: async (args) => {
      dispatch(sendPasswordResetLink(args))
        .unwrap()
        .then(() => setIsSent(true));
    }
  });
  return (
    <PageCenter>
      {!isSent ? (
        <>
          {error && error.type === EUserTypeError.SEND_PASSWORD_RESET_LINK ? (
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
                <p className="text-muted">
                  <Trans t={t} components={{ strong: <strong /> }}>
                    send_password_reset_link_explanation
                  </Trans>
                </p>

                <Input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isValid={!!(!formik.errors.email && formik.touched.email)}
                  isInvalid={!!(formik.errors.email && formik.touched.email)}
                  showErrorMessage={true}
                  errorMessage={formik.errors.email}
                >
                  {t('email')}
                </Input>
              </Card.Body>
              <Card.Footer>
                <Button
                  className="w-100"
                  type="submit"
                  variant="success"
                  isLoading={loading}
                >
                  {t('send_link')}
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
          <h1>{t('password_reset_link_was_sent')}</h1>
          <p className="h4 text-muted mb-5">
            <Trans
              t={t}
              components={{ u: <u /> }}
              values={{ email: formik.values.email }}
            >
              we_sent_password_reset_link
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

export default SendPasswordResetLinkPage;
