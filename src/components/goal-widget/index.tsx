import React from 'react';
import { Card, FormControl } from 'react-bootstrap';
import { PartialFormatter } from 'nouislider';
import Slider from 'components/slider';

interface IGoalWidgetProps {
  header: string;
  color: string;
  className?: string;
  onChange: (arg: Array<string | number>) => void;
  min: number;
  max: number;
  start?: string | number | Array<string | number>;
  step?: number;
  connect?: boolean | 'lower' | 'upper' | boolean[];
  name: string;
  id: string;
  isFormEnabled?: boolean;
  tooltips: boolean | PartialFormatter | Array<boolean | PartialFormatter>;
}

const GoalWidget = ({
  id,
  header,
  color,
  min,
  max,
  step,
  start,
  connect,
  name,
  tooltips,
  className,
  isFormEnabled = false,
  onChange
}: IGoalWidgetProps) => (
  <Card className={className}>
    <Card.Header as="h4">{header}</Card.Header>
    <Card.Body>
      <Slider
        id={id}
        name={name}
        connect={connect}
        range={{
          min,
          max
        }}
        tooltips={tooltips}
        step={step}
        color={color}
        onChange={onChange}
        start={start}
      />
      { isFormEnabled && (
        <div className="d-flex align-items-center mt-2">
          <FormControl
            value={Array.isArray(start) ? start[0] : start}
            onChange={(e) => onChange([e.target.value, max])}
            className="me-2"
            type="number"
            step={step}
            maxLength={4}
          />
          <FormControl
            value={Array.isArray(start) ? start[1] : start}
            onChange={(e) => onChange([min, e.target.value])}
            type="number"
            step={step}
            maxLength={4}
          />
        </div>
      )}
    </Card.Body>
  </Card>
);

export default GoalWidget;
