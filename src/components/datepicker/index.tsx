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
          : `${date.year}-${date.month}-${date.day}`,
      buttonText: {
        // eslint-disable-next-line max-len
        previousMonth: '<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M15 6l-6 6l6 6"></path></svg>',
        // eslint-disable-next-line max-len
        nextMonth: '<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M9 6l6 6l-6 6"></path></svg>'
      }
    });

    picker.on('selected', onSelect);

    return () => {
      picker.destroy();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return <div id={id} />;
};

export default Datepicker;
