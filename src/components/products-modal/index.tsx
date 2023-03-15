import React from 'react';
import {
  Modal, Form, Row, Col
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import Input from 'components/input';
import Button from 'components/button';
import {
  addUserProduct,
  modifyUserProduct,
  delUserProduct
} from 'controllers/user';
import { IUserProduct } from 'store/slices/userSlice';
import { useAppDispatch, useAppSelector } from 'store';
import './index.css';

export interface IProductModalProps {
  entry: IUserProduct | null;
  show: boolean;
  onHide: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
}

const ProductModal = ({
  entry,
  show,
  onHide,
  ...otherProps
}: IProductModalProps) => {
  const [t] = useTranslation();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.user);
  const formik = useFormik({
    initialValues:
      entry !== null
        ? entry
        : {
          name: '',
          calories: 0,
          proteins: 0,
          fats: 0,
          carbohydrates: 0
        },
    onSubmit: (args) => {
      if (entry === null) {
        dispatch(addUserProduct(args))
          .unwrap()
          .then(() => onHide());
      } else {
        dispatch(modifyUserProduct({ id: entry.id, ...args }))
          .unwrap()
          .then(() => onHide());
      }
    },
    enableReinitialize: true
  });
  return (
    <Modal centered show={show} size="lg" onHide={onHide} {...otherProps}>
      <Modal.Header closeButton>
        <Modal.Title>
          {entry === null ? t('user:add_product') : t('user:modify_product')}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <Row>
            <Col md={12} className="mb-2">
              <Input
                type="text"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
                isValid={!!(!formik.errors.name && formik.touched.name)}
                isInvalid={!!(formik.errors.name && formik.touched.name)}
                as={Col}
              >
                {t('nutrition:name')}
              </Input>
            </Col>
          </Row>
          <Row>
            <Col sm={3} className="mb-2">
              <Input
                type="number"
                name="calories"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.calories}
                isValid={!!(!formik.errors.calories && formik.touched.calories)}
                isInvalid={
                  !!(formik.errors.calories && formik.touched.calories)
                }
                as={Col}
              >
                {t('nutrition:calories')}
              </Input>
            </Col>
            <Col sm={3} className="mb-2">
              <Input
                type="numer"
                name="proteins"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.proteins}
                isValid={!!(!formik.errors.proteins && formik.touched.proteins)}
                isInvalid={
                  !!(formik.errors.proteins && formik.touched.proteins)
                }
                as={Col}
              >
                {t('nutrition:proteins')}
              </Input>
            </Col>
            <Col sm={3} className="mb-2">
              <Input
                type="number"
                name="fats"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.fats}
                isValid={!!(!formik.errors.fats && formik.touched.fats)}
                isInvalid={!!(formik.errors.fats && formik.touched.fats)}
                as={Col}
              >
                {t('nutrition:fats')}
              </Input>
            </Col>
            <Col sm={3} className="mb-2">
              <Input
                type="number"
                name="carbohydrates"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.carbohydrates}
                isValid={
                  !!(
                    !formik.errors.carbohydrates && formik.touched.carbohydrates
                  )
                }
                isInvalid={
                  !!(
                    formik.errors.carbohydrates && formik.touched.carbohydrates
                  )
                }
                as={Col}
              >
                {t('nutrition:carbohydrates')}
              </Input>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          {entry === null ? (
            <Button variant="success" type="submit" isLoading={loading}>
              {t('user:add_product')}
            </Button>
          ) : (
            <>
              <Button
                type="button"
                variant="danger"
                onClick={() => {
                  dispatch(delUserProduct(entry.id))
                    .unwrap()
                    .then(() => onHide());
                }}
                isLoading={loading}
              >
                {t('user:del_product')}
              </Button>
              <Button type="submit" variant="warning" isLoading={loading}>
                {t('user:modify_product')}
              </Button>
            </>
          )}
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ProductModal;
