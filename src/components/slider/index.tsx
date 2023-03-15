import React, { useEffect } from 'react';
import noUiSlider, { Options } from 'nouislider';
import './index.css';
import cn from 'classnames';

export interface ISliderProps extends Options {
  id: string;
  color: string;
  onChange: (arg: Array<string | number>) => void;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
}

const Slider = ({
  id,
  step,
  start,
  range,
  onChange,
  connect,
  tooltips,
  color,
  className,
  ...otherProps
}: ISliderProps) => {
  useEffect(() => {
    const slider = noUiSlider.create(
      document.getElementById(id) as HTMLElement,
      {
        start,
        step,
        tooltips,
        connect,
        range
      }
    );

    slider.on('change', onChange);

    return () => {
      slider.destroy();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <div
      id={id}
      className={cn('form-range', className)}
      style={{ color }}
      {...otherProps}
    />
  );
};

export default Slider;
