import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Page from 'components/page';
import StatsIntake from 'components/stats-intake';
import StatsRatio from 'components/stats-ratio';
import StatsCalories from 'components/stats-calories';
import { useAppDispatch } from 'store';
import { getStats } from 'controllers/stats';
import './index.css';
import { useParams } from 'react-router-dom';

const StatsPage = () => {
  const [t] = useTranslation('navbar');
  const dispatch = useAppDispatch();
  const { userId } = useParams();
  useEffect(() => {
    dispatch(getStats(Number(userId)));
  }, [dispatch, userId]);
  return (
    <Page title={t('stats')}>
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
