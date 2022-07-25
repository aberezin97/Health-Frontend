import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from 'store';
import { getNutritionData, YearMonthDay } from 'controllers/nutrition';
import NutritionModal, {
  INutritionModalShow
} from 'components/nutrition-modal';
import GoalsModal, { IGoalsModalShow } from 'components/goals-modal';
import DateModal from 'components/date-modal';
import Page from 'components/page';
import ProgressWidget from 'components/progress-widget';
import RatioWidget from 'components/ratio-widget';
import Table from 'components/table';
import './index.css';

const NutritionPage = () => {
  const [t] = useTranslation(['nutrition']);
  const [showNutritionModal, setShowNutritionModal] =
    useState<INutritionModalShow>({ status: false, entry: null });
  const [showDateModal, setShowDateModal] = useState(false);
  const [date, setDate] = useState<YearMonthDay | undefined>(undefined);
  const [showGoalsModal, setShowGoalsModal] = useState<IGoalsModalShow>(
    { status: false, date }
  );
  const dispatch = useAppDispatch();
  const {
    entries,
    limitCalories,
    limitProteins,
    limitFats,
    limitCarbohydrates,
    goalCalories,
    goalProteins,
    goalFats,
    goalCarbohydrates
  } = useAppSelector((state) => state.nutrition);
  useEffect(() => {
    dispatch(getNutritionData(date));
  }, [dispatch, date]);
  return (
    <Page
      pretitle={
        date === undefined ||
        moment().format('MMM Do YYYY') ===
          moment(`${date.year}-${date.month}-${date.day}`).format('MMM Do YYYY')
          ? t('today')
          : moment(`${date.year}-${date.month}-${date.day}`)
            .format('MMM Do YYYY')
      }
      title={t('nutrition')}
      options={
        <div className="btn-list">
          <Button
            type="button"
            variant="white"
            onClick={() => null}
            disabled
          >
            <i className="mt-1 mb-1 fas fa-tint fa-md"></i>
          </Button>
          <Button
            type="button"
            variant="white"
            onClick={() => setShowDateModal(true)}
          >
            <i className="mt-1 mb-1 fas fa-calendar-alt fa-md"></i>
          </Button>
          <Button
            type="button"
            variant="white"
            onClick={() => setShowGoalsModal({ status: true, date })}
          >
            <i className="mt-1 mb-1 fas fa-sliders-h fa-md"></i>
          </Button>
        </div>
      }
    >
      <Row>
        <Col lg={8}>
          <Row>
            <Col sm="6" className="mb-2">
              <ProgressWidget
                text={t('calories')}
                value={entries.reduce(
                  (prev, curr) => prev + (curr.calories / 100) * curr.weight,
                  0
                )}
                limit={limitCalories}
                max={goalCalories}
                color="yellow"
              />
            </Col>
            <Col sm="6" className="mb-2">
              <ProgressWidget
                text={t('proteins')}
                value={entries.reduce(
                  (prev, curr) => prev + (curr.proteins / 100) * curr.weight,
                  0
                )}
                limit={limitProteins}
                max={goalProteins}
                color="blue"
              />
            </Col>
            <Col sm="6" className="mb-2">
              <ProgressWidget
                text={t('fats')}
                value={entries.reduce(
                  (prev, curr) => prev + (curr.fats / 100) * curr.weight,
                  0
                )}
                limit={limitFats}
                max={goalFats}
                color="red"
              />
            </Col>
            <Col sm="6" className="mb-2">
              <ProgressWidget
                text={t('carbohydrates')}
                value={entries.reduce(
                  (prev, curr) =>
                    prev + (curr.carbohydrates / 100) * curr.weight,
                  0
                )}
                limit={limitCarbohydrates}
                max={goalCarbohydrates}
                color="green"
              />
            </Col>
          </Row>
        </Col>
        <Col lg={4} className="mb-2">
          <RatioWidget title={t('pfc_ratio')} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Table
            sort={{ dateField: 'time', order: 'desc' }}
            data={entries}
            columns={[
              {
                dataField: 'time',
                text: t('time'),
                sort: true,
                headerStyle: { width: '85px' }
              },
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
                dataField: 'calories',
                text: t('cals'),
                sort: true,
                headerStyle: { width: '80px' },
                style: {
                  textAlign: 'center'
                }
              },
              {
                dataField: 'proteins',
                text: t('proteins'),
                sort: true,
                headerStyle: { width: '80px' },
                style: {
                  textAlign: 'center'
                }
              },
              {
                dataField: 'fats',
                text: t('fats'),
                sort: true,
                headerStyle: { width: '80px' },
                style: {
                  textAlign: 'center'
                }
              },
              {
                dataField: 'carbohydrates',
                text: t('carbs'),
                sort: true,
                headerStyle: { width: '80px' },
                style: {
                  textAlign: 'center'
                }
              },
              {
                dataField: 'weight',
                text: t('weight'),
                sort: true,
                headerStyle: { width: '80px' },
                style: {
                  textAlign: 'center'
                }
              }
            ]}
            rowEvents={{
              onClick: (e, row, rowIndex) => {
                setShowNutritionModal({ status: true, entry: row });
              }
            }}
            addEntryButtonText={t('add_entry')}
            onClickAddEntryButton={() => {
              setShowNutritionModal({ status: true, entry: null });
            }}
          />
          <NutritionModal
            show={showNutritionModal}
            onHide={setShowNutritionModal}
          />
          <GoalsModal
            show={showGoalsModal}
            onHide={setShowGoalsModal}
          />
          <DateModal
            show={showDateModal}
            onHide={() => setShowDateModal(false)}
            date={date}
            setDate={setDate}
          />
        </Col>
      </Row>
    </Page>
  );
};

export default NutritionPage;
