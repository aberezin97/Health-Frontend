import React, { useEffect, useRef } from 'react';
import noUiSlider, { API, Options } from 'nouislider';
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
  const slider = useRef<undefined | API>(undefined);

  // Creating
  useEffect(() => {
    slider.current = noUiSlider.create(
      document.getElementById(id) as HTMLElement,
      {
        start,
        step,
        tooltips,
        connect,
        range
      }
    );

    slider.current.on('change', onChange);

    return () => {
      slider.current?.destroy();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Updating
  useEffect(() => {
    if (slider.current) {
      slider.current.updateOptions({
        start,
        step,
        tooltips,
        range
      }, true);
    }
  }, [step, range, tooltips, start]);

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
