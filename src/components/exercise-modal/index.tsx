import Button from 'components/button';
import Input from 'components/input';
import {
  addExerciseEntry,
  delExerciseEntry,
  modifyExerciseEntry
} from 'controllers/exercises';
import { YearMonthDay } from 'controllers/nutrition';
import { useFormik } from 'formik';
import React from 'react';
import {
  Col, Form, Modal, ModalProps, Row
} from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from 'store';
import { IExerciseEntry } from 'store/slices/exercisesSlice';

export interface IExrciseModalState {
  show: boolean;
  entry?: IExerciseEntry;
  date?: YearMonthDay;
}

interface IExerciseModalProps extends ModalProps {
  state: IExrciseModalState;
}

const ExerciseModal = ({
  state,
  onHide,
  ...otherProps
}: IExerciseModalProps) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((reduxState) => reduxState.exercises);
  const formik = useFormik({
    initialValues: state.entry ? state.entry : {
      name: '',
      approaches: 0,
      counts: 0
    },
    onSubmit: (args) => {
      if (state.entry === undefined) {
        dispatch(addExerciseEntry({ ...args, date: state.date }))
          .unwrap()
          .then(() => {
            if (onHide !== undefined) {
              onHide();
            }
          });
      } else {
        dispatch(modifyExerciseEntry({ ...args, id: state.entry.id }))
          .unwrap()
          .then(() => {
            if (onHide !== undefined) {
              onHide();
            }
          });
      }
    },
    enableReinitialize: true
  });
  return (
    <Modal
      show={state.show}
      centered
      onHide={onHide}
      {...otherProps}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Exercise</Modal.Title>
      </Modal.Header>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <Row className='mb-2'>
            <Input
              as={Col}
              type="text"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
            >
          Name
            </Input>
          </Row>
          <Row>
            <Input
              as={Col}
              type="number"
              name="approaches"
              sm={6}
              onChange={formik.handleChange}
              value={formik.values.approaches}
            >
            Approaches
            </Input>
            <Input
              as={Col}
              type="number"
              name="counts"
              sm={6}
              onChange={formik.handleChange}
              value={formik.values.counts}
            >
            Counts
            </Input>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          {
            state.entry ? (
              <>
                <Button
                  type="button"
                  variant="danger"
                  isLoading={loading}
                  onClick={() => {
                    if (state.entry !== undefined) {
                      dispatch(delExerciseEntry(state.entry.id))
                        .unwrap()
                        .then(() => {
                          if (onHide !== undefined) {
                            onHide();
                          }
                        });
                    }
                  }}
                >
                  Del Entry
                </Button>
                <Button
                  type="submit"
                  variant="warning"
                  isLoading={loading}
                >
                  Modify Entry
                </Button>
              </>
            ) : (
              <Button
                type="submit"
                variant="success"
                isLoading={loading}
              >
          Add Entry
              </Button>
            )
          }

        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ExerciseModal;
