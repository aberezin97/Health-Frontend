import React from 'react';
import {
  Modal, Form, Row, Col
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { useAppSelector, useAppDispatch } from 'store';
import Button from 'components/button';
import Input from 'components/input';
import { IWeightEntry } from 'store/slices/weightSlice';
import { addWeight, modifyWeight, delWeight } from 'controllers/weight';
import './index.css';

export interface IWeightModalProps {
  entry: IWeightEntry | null;
  onHide: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
}

const WeightModal = ({ entry, onHide, ...otherProps }: IWeightModalProps) => {
  const [t] = useTranslation('weight');
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.weight);
  const formik = useFormik({
    initialValues:
      entry !== null
        ? entry
        : {
          date: moment().format('yyyy-MM-DD'),
          weight: 1
        },
    onSubmit: (args) => {
      if (entry === null) {
        dispatch(addWeight(args))
          .unwrap()
          .then(() => onHide());
      } else {
        dispatch(modifyWeight({ id: entry.id, ...args }))
          .unwrap()
          .then(() => onHide());
      }
    }
  });
  return (
    <Modal centered size="sm" onHide={onHide} {...otherProps}>
      <Modal.Header closeButton>
        <Modal.Title>
          {entry === null ? t('add_entry') : t('modify_entry')}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <Row>
            <Input
              as={Col}
              sm={8}
              type="date"
              name="date"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.date}
              isValid={!!(!formik.errors.date && formik.touched.date)}
              isInvalid={!!(formik.errors.date && formik.touched.date)}
            >
              {t('date')}
            </Input>
            <Input
              as={Col}
              sm={4}
              type="number"
              name="weight"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.weight}
              isValid={!!(!formik.errors.weight && formik.touched.weight)}
              isInvalid={!!(formik.errors.weight && formik.touched.weight)}
            >
              {t('weight')}
            </Input>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          {entry === null ? (
            <Button variant="success" type="submit" isLoading={loading}>
              {t('add_entry')}
            </Button>
          ) : (
            <>
              <Button
                variant="danger"
                type="button"
                onClick={() => {
                  dispatch(delWeight(entry.id))
                    .unwrap()
                    .then(() => onHide());
                }}
                isLoading={loading}
              >
                {t('del_entry')}
              </Button>
              <Button variant="warning" type="submit" isLoading={loading}>
                {t('modify_entry')}
              </Button>
            </>
          )}
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default WeightModal;
