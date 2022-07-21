import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import Datepicker from 'components/datepicker';
import { YearMonthDay } from 'controllers/nutrition';
import './index.css';

export interface IDateModal {
  date: YearMonthDay | undefined;
  setDate: React.Dispatch<React.SetStateAction<YearMonthDay | undefined>>;
  onHide: () => void;
  show: boolean;
}

const DateModal = ({
  show, onHide, date, setDate
}: IDateModal) => {
  const [t, i18n] = useTranslation('nutrition');
  const [tempDate, setTempDate] = useState<YearMonthDay | undefined>(date);
  return (
    <Modal show={show} onHide={onHide} centered size="sm">
      <Modal.Header closeButton>
        <Modal.Title>{t('change_date')}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <Datepicker
          id="date-picker"
          lang={i18n.language}
          date={tempDate}
          onSelect={({ dateInstance }: { dateInstance: Date }) => {
            setTempDate({
              year: moment(dateInstance).format('YYYY'),
              month: moment(dateInstance).format('MM'),
              day: moment(dateInstance).format('DD')
            });
          }}
        />
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button
          variant="success"
          onClick={() => {
            setDate(tempDate);
            onHide();
          }}
        >
          {t('change_date')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DateModal;
