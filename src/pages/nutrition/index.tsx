import React, { useEffect, useMemo, useState } from 'react';
import {
  Row, Col, Button
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from 'store';
import { getNutritionData, YearMonthDay } from 'controllers/nutrition';
import NutritionModal, {
  INutritionModalShow
} from 'components/nutrition-modal';
import GoalsModal, { IGoalsModalShow } from 'components/goals-modal';
import DateModal from 'components/date-modal';
import Page, { EPageStatus } from 'components/page';
import ProgressWidget from 'components/progress-widget';
import RatioWidget from 'components/ratio-widget';
import Table from 'components/table';
import './index.css';
import { numberSortFunc } from 'utils/sorters';
import LiquidModal from 'components/liquid-modal';
import LiquidProgress from 'components/liquid-progress';
import { useParams } from 'react-router-dom';
import {
  ENutritionLoadingType,
  ENutritionTypeError
} from 'store/slices/nutritionSlice';

const NutritionPage = () => {
  const [t] = useTranslation(['nutrition']);
  const { userId } = useParams();
  const [showLiquidModal, setLiquidModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [date, setDate] = useState<YearMonthDay | undefined>(undefined);
  const [showNutritionModal, setShowNutritionModal] =
    useState<INutritionModalShow>({ status: false, date, entry: null });
  const [showGoalsModal, setShowGoalsModal] = useState<IGoalsModalShow>(
    { status: false, date, id: Number(userId) }
  );
  const dispatch = useAppDispatch();
  const {
    loading,
    error,
    entries,
    liquidEntries,
    limitCalories,
    limitProteins,
    limitFats,
    limitCarbohydrates,
    goalLiquid,
    goalCalories,
    goalProteins,
    goalFats,
    goalCarbohydrates
  } = useAppSelector((state) => state.nutrition);
  useEffect(() => {
    dispatch(getNutritionData({
      userId: Number(userId),
      date
    }));
  }, [dispatch, date, userId]);

  const pageStatus = useMemo(() => {
    if (loading[ENutritionLoadingType.GET_NUTRITION_DATA]) {
      return EPageStatus.LOADING;
    }
    if (error) {
      switch (error.type) {
      case ENutritionTypeError.GET_DATA_FORBIDDEN:
        return EPageStatus.FORBIDDEN;
      default:
        break;
      }
    }
    return EPageStatus.OK;
  }, [error, loading]);

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
            onClick={() => setLiquidModal(true)}
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
            onClick={() => setShowGoalsModal({
              status: true,
              date,
              id: Number(userId)
            })}
          >
            <i className="mt-1 mb-1 fas fa-sliders-h fa-md"></i>
          </Button>
        </div>
      }
      status={pageStatus}
    >
      <Row className='mb-2'>
        <Col>
          <LiquidProgress
            max={goalLiquid}
            value={liquidEntries.reduce((prev, curr) => (
              prev + curr.quantity
            ), 0)}
          />
        </Col>
      </Row>
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
                sort: true
                // classes: 'w-1',
                // headerClasses: 'w-1'
                // headerStyle: { width: '85px' }
              },
              {
                dataField: 'name',
                text: t('name'),
                sort: true
                // classes: 'w-100',
                // headerClasses: 'w-1'
                // headerStyle: { width: '100%' },
                // style: {
                //   textTransform: 'lowercase'
                // }
              },
              {
                dataField: 'calories',
                text: t('cals'),
                sort: true,
                // classes: 'w-1',
                // headerClasses: 'w-1',
                // headerStyle: { width: '80px' },
                // style: {
                //   textAlign: 'center'
                // },
                sortFunc: numberSortFunc
              },
              {
                dataField: 'proteins',
                text: t('proteins'),
                sort: true,
                // classes: 'w-1',
                // headerClasses: 'w-1',
                // headerStyle: { width: '80px' },
                // style: {
                //   textAlign: 'center'
                // },
                sortFunc: numberSortFunc
              },
              {
                dataField: 'fats',
                text: t('fats'),
                sort: true,
                // classes: 'w-1',
                // headerClasses: 'w-1',
                // headerStyle: { width: '80px' },
                // style: {
                //   textAlign: 'center'
                // },
                sortFunc: numberSortFunc
              },
              {
                dataField: 'carbohydrates',
                text: t('carbs'),
                sort: true,
                // classes: 'w-1',
                // headerClasses: 'w-1',
                // headerStyle: { width: '80px' },
                // style: {
                //   textAlign: 'center'
                // },
                sortFunc: numberSortFunc
              },
              {
                dataField: 'weight',
                text: t('weight'),
                sort: true,
                // classes: 'w-1',
                // headerClasses: 'w-1',
                // headerStyle: { width: '80px' },
                // style: {
                //   textAlign: 'center'
                // },
                sortFunc: numberSortFunc
              }
            ]}
            rowEvents={{
              onClick: (e, row, rowIndex) => {
                setShowNutritionModal({ status: true, date, entry: row });
              }
            }}
            addEntryButtonText={t('add_entry')}
            onClickAddEntryButton={() => {
              setShowNutritionModal({ status: true, date, entry: null });
            }}
          />
          <NutritionModal
            show={showNutritionModal}
            onHide={setShowNutritionModal}
            userId={Number(userId)}
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
          <LiquidModal
            show={showLiquidModal}
            onHide={() => setLiquidModal(false)}
            userId={Number(userId)}
          />
        </Col>
      </Row>
    </Page>
  );
};

export default NutritionPage;
