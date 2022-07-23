import React from 'react';
import { Card, ProgressBar } from 'react-bootstrap';
import './index.css';

export interface IProgressWidgetProps {
  text: string;
  value: number;
  limit: number;
  max: number;
  color: string;
}

const ProgressWidget = ({
  text,
  value,
  limit,
  max,
  color
}: IProgressWidgetProps) => (
  <Card>
    <Card.Body className="text-center">
      <h4>{text}</h4>
      <div
        className={`display-4 font-weight-bold mb-4 ${
          value > limit && limit > 0 ? 'text-danger' : ''
        }`}
      >
        {value.toFixed(1)}
      </div>
      <ProgressBar
        now={value}
        max={max || limit || value - 1}
        min={0}
        variant={color}
      />
    </Card.Body>
  </Card>
);

export default ProgressWidget;
