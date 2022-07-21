import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import noUiSlider from 'nouislider';
import './index.css';

export interface ISliderProps {
  children: string | JSX.Element | JSX.Element[];
  id: string;
  color: string;
  value?: string | number | string[] | undefined;
  onChange: (arg: Array<string | number>) => void;
  start: string | number | Array<string | number>;
  max: number;
  step?: number;
  min: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
}

const Slider = ({
  children,
  id,
  min,
  max,
  step,
  start,
  onChange,
  color,
  ...otherProps
}: ISliderProps) => {
  useEffect(() => {
    const slider = noUiSlider.create(
      document.getElementById(id) as HTMLElement,
      {
        start,
        step,
        tooltips: [true, true],
        connect: true,
        range: {
          min,
          max
        }
      }
    );

    slider.on('change', onChange);

    return () => {
      slider.destroy();
    };
  }, []);
  return (
    <Card {...otherProps}>
      <Card.Header as="h4">{children}</Card.Header>
      <Card.Body>
        <div id={id} className="form-range" style={{ color }} />
      </Card.Body>
    </Card>
  );
};

export default Slider;
