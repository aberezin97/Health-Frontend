import React from 'react';
import { Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Chart from 'components/chart';
import { useAppSelector } from 'store';
import './index.css';

const StatsIntake = () => {
  const [t] = useTranslation();
  const { entries } = useAppSelector((state) => state.stats);
  return (
    <Card>
      <Card.Header as="h4">{t('stats:intake_pfc_for_last_month')}</Card.Header>
      <Card.Body>
        <Chart
          id="chart-intake"
          data={{
            columns: [
              [
                t('nutrition:proteins'),
                entries.reduce(
                  (prev, current) => prev + current.eatenProteins,
                  0
                )
              ],
              [
                t('nutrition:fats'),
                entries.reduce((prev, current) => prev + current.eatenFats, 0)
              ],
              [
                t('nutrition:carbohydrates'),
                entries.reduce(
                  (prev, current) => prev + current.eatenCarbohydrates,
                  0
                )
              ]
            ],
            type: 'bar',
            colors: {
              [t('nutrition:proteins')]: '#206bc4',
              [t('nutrition:fats')]: '#d63939',
              [t('nutrition:carbohydrates')]: '#2fb344'
            }
          }}
          axis={{
            x: undefined
          }}
        />
      </Card.Body>
    </Card>
  );
};

export default StatsIntake;
