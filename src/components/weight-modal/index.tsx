import React from 'react';
import {
  Modal, Form, Row, Col, Alert
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { useAppSelector, useAppDispatch } from 'store';
import Button from 'components/button';
import Input from 'components/input';
import { EWeightTypeError, IWeightEntry } from 'store/slices/weightSlice';
import { addWeight, modifyWeight, delWeight } from 'controllers/weight';
import './index.css';

export interface IWeightModalShow {
  status: boolean;
  entry: IWeightEntry | null;
}

export interface IWeightModalProps {
  show: IWeightModalShow;
  onHide: React.Dispatch<React.SetStateAction<IWeightModalShow>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
}

const WeightModal = ({ show, onHide, ...otherProps }: IWeightModalProps) => {
  const [t] = useTranslation('weight');
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.weight);
  const formik = useFormik({
    initialValues:
      show.entry !== null
        ? show.entry
        : {
          date: moment().format('yyyy-MM-DD'),
          weight: 1
        },
    onSubmit: (args) => {
      if (show.entry === null) {
        dispatch(addWeight(args))
          .unwrap()
          .then(() => onHide({ status: false, entry: show.entry }));
      } else {
        dispatch(modifyWeight({ id: show.entry.id, ...args }))
          .unwrap()
          .then(() => onHide({ status: false, entry: show.entry }));
      }
    },
    enableReinitialize: true
  });
  return (
    <Modal
      centered
      size="sm"
      show={show.status}
      onHide={() => onHide({ status: false, entry: show.entry })}
      {...otherProps}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {show.entry === null ? t('add_entry') : t('modify_entry')}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          {
            error &&
            (
              error.type === EWeightTypeError.ADD_ENTRY ||
              error.type === EWeightTypeError.DEL_ENTRY ||
              error.type === EWeightTypeError.MODIFY_ENTRY
            ) ?
              <Row>
                <Alert
                  variant="danger"
                  onClose={() => null}
                  dismissible
                >
                  <Alert.Heading>Error</Alert.Heading>
                  <p>{error.explanation}</p>
                </Alert>
              </Row>
              :
              null
          }
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
          {show.entry === null ? (
            <Button variant="success" type="submit" isLoading={loading}>
              {t('add_entry')}
            </Button>
          ) : (
            <>
              <Button
                variant="danger"
                type="button"
                onClick={() => {
                  if (show.entry !== null) {
                    dispatch(delWeight(show.entry.id))
                      .unwrap()
                      .then(() => onHide({ status: false, entry: show.entry }));
                  }
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
