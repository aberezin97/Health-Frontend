import React from 'react';
import { Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Chart from 'components/chart';
import { useAppSelector } from 'store';
import './index.css';

export interface IRatioWidgetProps {
  title: string;
}

const RatioWidget = ({ title }: IRatioWidgetProps) => {
  const [t] = useTranslation('nutrition');
  const { entries } = useAppSelector((state) => state.nutrition);
  return (
    <Card>
      <Card.Header as="h4">{title}</Card.Header>
      <Card.Body>
        <Chart
          id="ratio"
          data={{
            columns: [
              [
                t('calories'),
                entries.reduce(
                  (prev, current) =>
                    prev + (current.proteins / 100) * current.weight,
                  0
                )
              ],
              [
                t('fats'),
                entries.reduce(
                  (prev, current) =>
                    prev + (current.fats / 100) * current.weight,
                  0
                )
              ],
              [
                t('carbohydrates'),
                entries.reduce(
                  (prev, current) =>
                    prev + (current.carbohydrates / 100) * current.weight,
                  0
                )
              ]
            ],
            type: 'pie',
            colors: {
              [t('proteins')]: '#206bc4',
              [t('fats')]: '#d63939',
              [t('carbohydrates')]: '#2fb344'
            }
          }}
          size={{ height: 259 }}
        />
      </Card.Body>
    </Card>
  );
};

export default RatioWidget;
