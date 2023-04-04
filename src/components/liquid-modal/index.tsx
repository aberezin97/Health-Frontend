import Button from 'components/button';
import Table from 'components/table';
import { addLiquidEntry, delLiquidEntry } from 'controllers/nutrition';
import { useFormik } from 'formik';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  Form,
  FormControl, InputGroup, Modal, ModalProps
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'store';
import { ENutritionLoadingType } from 'store/slices/nutritionSlice';

interface ILiquidModalProps extends ModalProps {
  userId: number;
}

const LiquidModal = ({ show, onHide, userId }: ILiquidModalProps) => {
  const dispatch = useAppDispatch();
  const { liquidEntries, loading } = useAppSelector((state) => state.nutrition);
  const [t] = useTranslation();
  const [entry, setEntry] = useState({
    time: moment().format('HH:mm'),
    quantity: 0
  });
  useEffect(() => {
    setEntry({
      time: moment().format('HH:mm'),
      quantity: 0
    });
  }, [show]);
  const formik = useFormik({
    initialValues: entry,
    onSubmit: (args) => {
      dispatch(addLiquidEntry({ ...args, userId }));
    },
    enableReinitialize: true
  });

  return (
    <Modal
      centered
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('nutrition:add_liquid')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table
          data={liquidEntries}
          columns={[
            {
              dataField: 'time',
              text: t('time'),
              sort: true
            },
            {
              dataField: 'quantity',
              text: t('quantity'),
              sort: true
            },
            {
              dataField: 'id',
              text: '',
              formatter: (cellContent, row) => (
                <Button
                  variant="danger"
                  onClick={() => {
                    dispatch(delLiquidEntry(row.id));
                  }}
                  isLoading={false}
                >
                  <i className="fas fa-trash text-white" />
                </Button>
              ),
              style: {
                textAlign: 'right'
              }
            }
          ]}
        />
      </Modal.Body>
      <Modal.Footer>
        <Form className='w-100' onSubmit={formik.handleSubmit}>
          <InputGroup>
            <InputGroup.Text><i className="far fa-clock" /></InputGroup.Text>
            <FormControl
              value={formik.values.time}
              name="time"
              type="time"
              onChange={formik.handleChange}
            />
            <InputGroup.Text><i className="fas fa-tint" /></InputGroup.Text>
            <FormControl
              value={formik.values.quantity}
              name="quantity"
              type="number"
              step={1}
              onChange={formik.handleChange}
            />
            <Button
              isLoading={loading[ENutritionLoadingType.ADD_LIQUID_ENTRY]}
              variant="success"
              type="submit"
            >
              {t('nutrition:add_entry')}
            </Button>
          </InputGroup>
        </Form>
      </Modal.Footer>
    </Modal>
  );
};

export default LiquidModal;
