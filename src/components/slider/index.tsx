import React, { useEffect } from 'react';
import noUiSlider from 'nouislider';
import './index.css';

export interface ISliderProps {
  id: string;
  color: string;
  onChange: (arg: Array<string | number>) => void;
  start: string | number | Array<string | number>;
  max: number;
  step?: number;
  min: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
}

const Slider = ({
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <div id={id} className="form-range" style={{ color }} {...otherProps} />
  );
};

export default Slider;
