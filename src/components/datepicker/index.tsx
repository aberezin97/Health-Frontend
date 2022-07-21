import React, { useEffect } from 'react';
import Litepicker from 'litepicker';
import { YearMonthDay } from '../../controllers/nutrition';
import './index.css';

export interface IDatepickerProps {
  date: YearMonthDay | undefined;
  lang: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSelect: (...args: any[]) => void;
  id: string;
}

const Datepicker = ({
  id, lang, date, onSelect
}: IDatepickerProps) => {
  useEffect(() => {
    const picker = new Litepicker({
      element: document.getElementById(id) as HTMLElement,
      lang,
      inlineMode: true,
      singleMode: true,
      startDate:
        date === undefined
          ? new Date()
          : `${date.year}-${date.month}-${date.day}`
    });

    picker.on('selected', onSelect);

    return () => {
      picker.destroy();
    };
  }, []);
  return <div id={id} />;
};

export default Datepicker;
