import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from 'store';
import { getWeights } from 'controllers/weight';
import WeightModal, { IWeightModalShow } from 'components/weight-modal';
import Table from 'components/table';
import Chart from 'components/chart';
import Page from 'components/page';
import './index.css';
import { useParams } from 'react-router-dom';
import { EWeightTypeError } from 'store/slices/weightSlice';

const WeightPage = () => {
  const { userId } = useParams();
  const [t] = useTranslation('weight');
  const [showModal, setShowModal] = useState<IWeightModalShow>({
    status: false,
    entry: null
  });
  const dispatch = useAppDispatch();
  const { entries, error } = useAppSelector((state) => state.weight);
  const myData = useAppSelector((state) => state.user.data);
  useEffect(() => {
    dispatch(getWeights(Number(userId)));
  }, [dispatch, userId]);
  return (
    <Page
      title={t('weight')}
      forbidden={error?.type === EWeightTypeError.GET_WEIGHT_DATA_FORBIDDEN}
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
                setShowModal({ status: true, entry: row });
              } : undefined
            }}
            addEntryButtonText={t('add_entry')}
            onClickAddEntryButton={() => {
              setShowModal({ status: true, entry: null });
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
