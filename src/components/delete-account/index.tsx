import React from 'react';
import { Card, Form, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import Input from 'components/input';
import Button from 'components/button';
import { useAppDispatch, useAppSelector } from 'store';
import { EUserTypeError, clearUserError } from 'store/slices/userSlice';
import { delAccount } from 'controllers/user';
import './index.css';

const DeleteAccount = () => {
  const [t] = useTranslation('user');
  const { loading, error } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      password: ''
    },
    onSubmit: (args) => {
      dispatch(delAccount(args));
    }
  });
  return (
    <Card>
      <Card.Header as="h4">{t('delete_account')}</Card.Header>
      <Form onSubmit={formik.handleSubmit}>
        <Card.Body>
          {error !== null && error.type === EUserTypeError.DEL_ACCOUNT ? (
            <Alert
              variant="danger"
              onClose={() => dispatch(clearUserError())}
              dismissible
            >
              {error.explanation}
            </Alert>
          ) : null}
          <p className="text-muted">{t('del_account_info')}</p>
          <Input
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!(formik.errors.password && formik.touched.password)}
            isValid={!!(!formik.errors.password && formik.touched.password)}
          >
            {t('password')}
          </Input>
        </Card.Body>
        <Card.Footer>
          <Button
            className="w-100"
            variant="danger"
            type="submit"
            isLoading={loading}
          >
            {t('delete_account')}
          </Button>
        </Card.Footer>
      </Form>
    </Card>
  );
};

export default DeleteAccount;
