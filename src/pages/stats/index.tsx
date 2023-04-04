import React, { useEffect, useMemo } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Page, { EPageStatus } from 'components/page';
import StatsIntake from 'components/stats-intake';
import StatsRatio from 'components/stats-ratio';
import StatsCalories from 'components/stats-calories';
import { useAppDispatch, useAppSelector } from 'store';
import { getStats } from 'controllers/stats';
import './index.css';
import { useParams } from 'react-router-dom';
import { EStatsLoadingType, EStatsTypeError } from 'store/slices/statsSlice';

const StatsPage = () => {
  const [t] = useTranslation('navbar');
  const dispatch = useAppDispatch();
  const { error, loading } = useAppSelector((state) => state.stats);
  const { userId } = useParams();

  const pageStatus = useMemo(() => {
    if (loading[EStatsLoadingType.GET_STATS]) return EPageStatus.LOADING;
    if (error) {
      switch (error.type) {
      case EStatsTypeError.GET_DATA_FORBIDDEN:
        return EPageStatus.FORBIDDEN;
      default:
        break;
      }
    }
    return EPageStatus.OK;
  }, [error, loading]);

  useEffect(() => {
    dispatch(getStats(Number(userId)));
  }, [dispatch, userId]);

  return (
    <Page
      title={t('stats')}
      status={pageStatus}
    >
      <Row>
        <Col md={6} className="mb-2">
          <StatsIntake />
        </Col>
        <Col md={6} className="mb-2">
          <StatsRatio />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <StatsCalories />
        </Col>
      </Row>
    </Page>
  );
};

export default StatsPage;
