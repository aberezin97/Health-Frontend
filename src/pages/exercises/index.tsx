import React, { useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import Page, { EPageStatus } from 'components/page';
import './index.css';
import { useTranslation } from 'react-i18next';
import { Button, Col, Row } from 'react-bootstrap';
import DateModal from 'components/date-modal';
import Table from 'components/table';
import { useAppDispatch, useAppSelector } from 'store';
import { getExercisesData } from 'controllers/exercises';
import ExerciseModal, { IExrciseModalState } from 'components/exercise-modal';
import {
  EExerciseLoadingType,
  EExercisesTypeError
} from 'store/slices/exercisesSlice';
import { useParams } from 'react-router-dom';

const ExercisesPage = () => {
  const {
    entries,
    loading,
    error
  } = useAppSelector((state) => state.exercises);
  const dispatch = useAppDispatch();
  const { userId } = useParams();
  const [t] = useTranslation(['exercises']);
  const [showDateModal, setShowDateModal] = useState<boolean>(false);
  const [modalState, setModalState] = useState<IExrciseModalState>({
    show: false,
    date: undefined,
    entry: undefined
  });

  useEffect(() => {
    dispatch(getExercisesData({
      date: modalState.date,
      userId: Number(userId)
    }));
  }, [dispatch, modalState.date, userId]);

  const pageStatus = useMemo(() => {
    if (loading[EExerciseLoadingType.GET_EXERCISES_DATA]) {
      return EPageStatus.LOADING;
    }
    if (error) {
      switch (error.type) {
      case EExercisesTypeError.GET_EXERCISES_DATA_FORBIDDEN:
        return EPageStatus.FORBIDDEN;
      default:
        break;
      }
    }
    return EPageStatus.OK;
  }, [loading, error]);

  return (
    <Page
      pretitle={
        modalState.date === undefined ||
        moment().format('MMM Do YYYY') ===
        // eslint-disable-next-line max-len
        moment(`${modalState.date.year}-${modalState.date.month}-${modalState.date.day}`).format('MMM Do YYYY')
          ? t('today')
          // eslint-disable-next-line max-len
          : moment(`${modalState.date.year}-${modalState.date.month}-${modalState.date.day}`)
            .format('MMM Do YYYY')
      }
      status={pageStatus}
      title="Упражнения"
      options={
        <div className="btn-list">
          <Button
            type="button"
            variant="white"
            onClick={() => setShowDateModal(true)}
          >
            <i className="mt-1 mb-1 fas fa-calendar-alt fa-md"></i>
          </Button>
        </div>
      }
    >
      <Row>
        <Col>
          <Table
            sort={{ dateField: 'time', order: 'desc' }}
            data={entries}
            columns={[
              {
                dataField: 'name',
                text: t('name'),
                sort: true,
                headerStyle: { width: '100%' },
                style: {
                  textTransform: 'lowercase'
                }
              },
              {
                dataField: 'approaches',
                text: t('approaches'),
                sort: true,
                headerStyle: { width: '100px' },
                style: {
                  textAlign: 'center'
                }
              },
              {
                dataField: 'counts',
                text: t('counts'),
                sort: true,
                headerStyle: { width: '80px' },
                style: {
                  textAlign: 'center'
                }
              }
            ]}
            rowEvents={{
              onClick: (e, row, rowIndex) => {
                setModalState((prev) => ({
                  ...prev,
                  show: true,
                  entry: row
                }));
              }
            }}
            addEntryButtonText={t('add_entry')}
            onClickAddEntryButton={() => {
              setModalState((prev) => ({
                ...prev,
                show: true,
                entry: undefined
              }));
            }}
          />
        </Col>
      </Row>
      <DateModal
        show={showDateModal}
        onHide={() => setShowDateModal(false)}
        date={modalState.date}
        onDateClick={(date) => {
          setModalState((prev) => ({
            ...prev,
            date
          }));
        }}
      />
      <ExerciseModal
        state={modalState}
        onHide={() => {
          setModalState((prev) => ({
            ...prev,
            show: false
          }));
        }}
      />
    </Page>
  );
};

export default ExercisesPage;
