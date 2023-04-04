import React, { useEffect, useMemo, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from 'store';
import { getWeights } from 'controllers/weight';
import WeightModal, { IWeightModalShow } from 'components/weight-modal';
import Table from 'components/table';
import Chart from 'components/chart';
import Page, { EPageStatus } from 'components/page';
import './index.css';
import { useParams } from 'react-router-dom';
import { EWeightLoadingType, EWeightTypeError } from 'store/slices/weightSlice';

const WeightPage = () => {
  const { userId } = useParams();
  const [t] = useTranslation('weight');
  const [showModal, setShowModal] = useState<IWeightModalShow>({
    status: false,
    entry: null,
    userId: Number(userId)
  });
  const dispatch = useAppDispatch();
  const { entries, error, loading } = useAppSelector((state) => state.weight);
  const myData = useAppSelector((state) => state.user.data);
  useEffect(() => {
    dispatch(getWeights(Number(userId)));
  }, [dispatch, userId]);

  const pageStatus = useMemo(() => {
    if (loading[EWeightLoadingType.GET_WEIGHTS_DATA]) {
      return EPageStatus.LOADING;
    }
    if (error) {
      switch (error.type) {
      case EWeightTypeError.GET_WEIGHT_DATA_FORBIDDEN:
        return EPageStatus.FORBIDDEN;
      default:
        break;
      }
    }
    return EPageStatus.OK;
  }, [error, loading]);

  return (
    <Page
      title={t('weight')}
      status={pageStatus}
    >
      <Row>
        <Col lg={12} className="mb-2">
          <Card>
            <Card.Header as="h4">
              {t('change_of_the_weight_for_last_month')}
            </Card.Header>
            <Card.Body>
              <Chart
                id="weight-chart"
                data={{
                  x: 'x',
                  columns: [
                    [
                      t('weight'),
                      ...entries.map(
                        (entry) => entry.weight
                      )
                    ],
                    [
                      'x',
                      ...entries.map(
                        (entry) => entry.date
                      )
                    ]
                  ],
                  type: 'line',
                  colors: {
                    [t('weight')]: '#f59f00'
                  }
                }}
                axis={{
                  x: {
                    type: 'category',
                    show: true
                  }
                }}
                legend={{
                  show: false
                }}
              ></Chart>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={12}>
          <Table
            sort={{ dateField: 'date', order: 'desc' }}
            data={entries}
            columns={[
              {
                dataField: 'date',
                text: t('date'),
                sort: true,
                headerStyle: { width: '100%' }
              },
              {
                dataField: 'weight',
                text: t('weight'),
                sort: true,
                headerStyle: { width: '85px' },
                style: {
                  textAlign: 'center'
                }
              }
            ]}
            rowEvents={{
              onClick: myData?.id === Number(userId) ? (e, row, rowIndex) => {
                setShowModal({
                  status: true,
                  entry: row,
                  userId: Number(userId)
                });
              } : undefined
            }}
            addEntryButtonText={t('add_entry')}
            onClickAddEntryButton={() => {
              setShowModal({
                status: true,
                entry: null,
                userId: Number(userId)
              });
            }}
            isAddButtonDisabled={myData?.id !== Number(userId)}
          />
        </Col>
      </Row>
      <WeightModal show={showModal} onHide={setShowModal} />
    </Page>
  );
};

export default WeightPage;
