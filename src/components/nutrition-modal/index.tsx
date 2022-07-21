import React, { Fragment, useState } from 'react';
import {
  Modal, Form, Row, Col
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { Highlighter, Menu, MenuItem } from 'react-bootstrap-typeahead';
import { useTranslation } from 'react-i18next';
import { Option } from 'react-bootstrap-typeahead/types/types';
import Button from 'components/button';
import Input from 'components/input';
import { INutritionEntry } from 'store/slices/nutritionSlice';
import {
  addNutritionEntry,
  modifyNutritionEntry,
  delNutritionEntry
} from 'controllers/nutrition';
import { useAppDispatch, useAppSelector } from 'store';
import InputTypeahead from 'components/input-typeahead';
import { fieldRequiredValidator } from 'utils/validators';
import { getUserProducts } from 'controllers/user';
import { IUserProduct } from 'store/slices/userSlice';
import './index.css';

export interface INutritionModalShow {
  status: boolean;
  entry: INutritionEntry | null;
}

export interface INutritionModalProps {
  show: INutritionModalShow;
  onHide: (value: React.SetStateAction<INutritionModalShow>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
}

export const enum ProductType {
  RECENT = 'RECENT',
  USER = 'USER',
  GLOBAL = 'GLOBAL'
}

export interface IProduct extends IUserProduct {
  type: ProductType;
}

const NutritionModal = ({
  show,
  onHide,
  ...otherProps
}: INutritionModalProps) => {
  const [t] = useTranslation('nutrition');
  const dispatch = useAppDispatch();
  const { entries } = useAppSelector((state) => state.nutrition);
  const [options, setOptions] = useState<IProduct[]>([]);
  const [isUserProductsLoading, setIsUserProductsLoading] = useState(false);
  const formik = useFormik({
    initialValues:
      show.entry !== null
        ? show.entry
        : {
          id: 0,
          name: '',
          calories: 0,
          proteins: 0,
          fats: 0,
          carbohydrates: 0,
          weight: 1,
          time: moment().format('HH:mm')
        },
    validationSchema: Yup.object({
      name: fieldRequiredValidator,
      weight: fieldRequiredValidator,
      calories: fieldRequiredValidator,
      proteins: fieldRequiredValidator,
      fats: fieldRequiredValidator,
      carbohydrates: fieldRequiredValidator,
      time: fieldRequiredValidator
    }),
    onSubmit: (args) => {
      if (show.entry === null) {
        dispatch(addNutritionEntry(args))
          .unwrap()
          .then(() => {
            onHide({ status: false, entry: show.entry });
            formik.resetForm();
          });
      } else {
        dispatch(modifyNutritionEntry(args))
          .unwrap()
          .then(() => {
            onHide({ status: false, entry: show.entry });
            formik.resetForm();
          });
      }
    },
    enableReinitialize: true
  });
  return (
    <Modal
      centered
      size="lg"
      show={show.status}
      onHide={() => onHide({ status: false, entry: show.entry })}
      {...otherProps}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {show.entry === null ? t('add_entry') : t('modify_entry')}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <Row className="mb-2">
            <InputTypeahead
              id="name"
              type="text"
              name="name"
              labelKey="name"
              as={Col}
              sm={10}
              options={options}
              onChange={formik.handleChange}
              onSelect={(selected) => {
                const entity = selected[0] as INutritionEntry;
                if (entity !== undefined) {
                  formik.setFieldValue('name', entity.name);
                  formik.setFieldValue('calories', entity.calories);
                  formik.setFieldValue('proteins', entity.proteins);
                  formik.setFieldValue('fats', entity.fats);
                  formik.setFieldValue('carbohydrates', entity.carbohydrates);
                }
              }}
              onSearch={(query: string) => {
                setIsUserProductsLoading(true);
                dispatch(getUserProducts())
                  .unwrap()
                  .then((data) => {
                    setIsUserProductsLoading(false);
                    setOptions([
                      ...data.map((product: IUserProduct) => ({
                        ...product,
                        type: ProductType.USER
                      })),
                      ...entries.map((entry) => ({
                        ...(entry as IUserProduct),
                        type: ProductType.RECENT
                      }))
                    ]);
                  });
              }}
              value={formik.values.name}
              onBlur={formik.handleBlur}
              isLoading={isUserProductsLoading}
              isValid={!!(!formik.errors.name && formik.touched.name)}
              isInvalid={!!(formik.errors.name && formik.touched.name)}
              promptText={t('type_to_search')}
              renderMenu={(results, menuProps, state) => {
                if (results.length === 0) {
                  return (
                    <Menu {...menuProps}>
                      <MenuItem option={{}} position={0} disabled>
                        {menuProps.emptyLabel}
                      </MenuItem>
                    </Menu>
                  );
                }
                const categories: Record<string, Option[]> = {
                  [t('my_products')]: results.filter(
                    (item) => (item as IProduct).type === ProductType.USER
                  ),
                  [t('recent')]: results.filter(
                    (item) => (item as IProduct).type === ProductType.RECENT
                  )
                };
                let index = 0;
                const items = Object.keys(categories).map((category) => (
                  <Fragment key={category}>
                    {categories[category].length !== 0 && (
                      <Fragment>
                        {index !== 0 && <Menu.Divider />}
                        <Menu.Header>{category}</Menu.Header>
                      </Fragment>
                    )}
                    {categories[category].map((i) => {
                      const item = (
                        <MenuItem
                          key={index}
                          option={i}
                          position={index}
                          className="flex-column align-items-start"
                        >
                          <div>
                            <Highlighter search={state.text}>
                              {(i as IProduct).name}
                            </Highlighter>
                          </div>
                          <div>
                            <span className="info-product me-1">
                              {t('cals')}: {(i as IProduct).calories}
                            </span>
                            <span className="info-product me-1">
                              {t('proteins')}: {(i as IProduct).proteins}
                            </span>
                            <span className="info-product me-1">
                              {t('fats')}: {(i as IProduct).fats}
                            </span>
                            <span className="info-product">
                              {t('carbs')}: {(i as IProduct).carbohydrates}
                            </span>
                          </div>
                        </MenuItem>
                      );

                      index += 1;
                      return item;
                    })}
                  </Fragment>
                ));
                return <Menu {...menuProps}>{items}</Menu>;
              }}
            >
              {t('name')}
            </InputTypeahead>
            <Input
              type="number"
              name="weight"
              as={Col}
              sm={2}
              max={9999}
              min={1}
              step={1}
              value={formik.values.weight}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isValid={!!(!formik.errors.weight && formik.touched.weight)}
              isInvalid={!!(formik.errors.weight && formik.touched.weight)}
            >
              {t('weight')}
            </Input>
          </Row>
          <Row className="mb-2">
            <Input
              type="number"
              name="calories"
              as={Col}
              sm={3}
              max={9999}
              min={0}
              step={0.1}
              value={formik.values.calories}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isValid={!!(!formik.errors.calories && formik.touched.calories)}
              isInvalid={!!(formik.errors.calories && formik.touched.calories)}
            >
              {t('calories')}
            </Input>
            <Input
              type="number"
              name="proteins"
              as={Col}
              sm={3}
              max={9999}
              min={0}
              step={0.1}
              value={formik.values.proteins}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isValid={!!(!formik.errors.proteins && formik.touched.proteins)}
              isInvalid={!!(formik.errors.proteins && formik.touched.proteins)}
            >
              {t('proteins')}
            </Input>
            <Input
              type="number"
              name="fats"
              as={Col}
              sm={3}
              max={9999}
              min={0}
              step={0.1}
              value={formik.values.fats}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isValid={!!(!formik.errors.fats && formik.touched.fats)}
              isInvalid={!!(formik.errors.fats && formik.touched.fats)}
            >
              {t('fats')}
            </Input>
            <Input
              type="number"
              name="carbohydrates"
              as={Col}
              sm={3}
              max={9999}
              min={0}
              step={0.1}
              value={formik.values.carbohydrates}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isValid={
                !!(!formik.errors.carbohydrates && formik.touched.carbohydrates)
              }
              isInvalid={
                !!(formik.errors.carbohydrates && formik.touched.carbohydrates)
              }
            >
              {t('carbohydrates')}
            </Input>
          </Row>
          <Row>
            <Input
              as={Col}
              type="time"
              name="time"
              value={formik.values.time}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              isValid={!!(!formik.errors.time && formik.touched.time)}
              isInvalid={!!(formik.errors.time && formik.touched.time)}
            >
              {t('time')}
            </Input>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          {show.entry === null ? (
            <Button type="submit" variant="success" isLoading={false}>
              {t('add_entry')}
            </Button>
          ) : (
            <>
              <Button
                type="button"
                variant="danger"
                onClick={() => {
                  if (show.entry !== null) {
                    dispatch(delNutritionEntry(show.entry.id))
                      .unwrap()
                      .then(() => {
                        onHide({ status: false, entry: show.entry });
                        formik.resetForm();
                      });
                  }
                }}
                isLoading={false}
              >
                {t('del_entry')}
              </Button>
              <Button type="submit" variant="warning" isLoading={false}>
                {t('modify_entry')}
              </Button>
            </>
          )}
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default NutritionModal;
