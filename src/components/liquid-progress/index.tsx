import React from 'react';
import { Card, ProgressBar } from 'react-bootstrap';

interface ILiquidProgress {
  max: number;
  value: number;
}

const LiquidProgress = ({ max, value }: ILiquidProgress) => (
  <Card>
    <div className='d-flex align-items-center p-3'>
      <strong className='me-2'>{value}</strong>
      <i className="fas fa-tint fa-lg me-2 text-info" />
      <ProgressBar
        min={0}
        max={max || value - 1}
        now={value}
        variant="info"
      />
    </div>
  </Card>
);

export default LiquidProgress;
