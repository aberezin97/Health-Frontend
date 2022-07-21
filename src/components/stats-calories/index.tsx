import React from 'react';
import { Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Chart from 'components/chart';
import { useAppSelector } from 'store';
import './index.css';

const StatsCalories = () => {
  const [t] = useTranslation();
  const { entries } = useAppSelector((state) => state.stats);
  return (
    <Card>
      <Card.Header as="h4">
        {t('stats:intake_calories_for_last_month')}
      </Card.Header>
      <Card.Body>
        <Chart
          id="chart-calories"
          data={{
            x: t('nutrition:date'),
            columns: [
              [
                t('nutrition:calories'),
                ...entries.map((entry) => entry.eatenCalories)
              ],
              [t('nutrition:date'), ...entries.map((entry) => entry.date)]
            ],
            type: 'line',
            colors: {
              [t('nutrition:calories')]: '#f59f00'
            }
          }}
          axis={{
            x: {
              type: 'category',
              show: true
            }
          }}
        />
      </Card.Body>
    </Card>
  );
};

export default StatsCalories;
