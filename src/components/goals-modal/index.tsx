import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Button from 'components/button';
import Slider from 'components/slider';
import { useAppSelector, useAppDispatch } from 'store';
import { modifyNutritionGoals } from 'controllers/nutrition';
import './index.css';

export interface IGoalsModalProps {
  show: boolean;
  onHide: () => void;
}

const GoalsModal = ({ show, onHide }: IGoalsModalProps) => {
  const [t] = useTranslation('nutrition');
  const dispatch = useAppDispatch();
  const {
    goalCalories,
    goalProteins,
    goalFats,
    goalCarbohydrates,
    limitCalories,
    limitProteins,
    limitFats,
    limitCarbohydrates
  } = useAppSelector((state) => state.nutrition);
  const [goals, setGoals] = useState({
    goalCalories,
    goalProteins,
    goalFats,
    goalCarbohydrates,
    limitCalories,
    limitProteins,
    limitFats,
    limitCarbohydrates
  });
  return (
    <Modal show={show} onHide={onHide} centered size="sm">
      <Modal.Header closeButton>
        <Modal.Title>{t('modify_goals')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Slider
          id="calories-slider"
          type="range"
          name="calories"
          min={0}
          max={2500}
          step={1}
          className="mb-2"
          color="#f76707"
          onChange={([min, max]) => {
            setGoals((prevState) => ({
              ...prevState,
              goalCalories: min as number,
              limitCalories: max as number
            }));
          }}
          start={[goalCalories, limitCalories]}
        >
          {t('calories')}
        </Slider>
        <Slider
          id="proteins-slider"
          type="range"
          name="proteins"
          min={0}
          max={500}
          step={1}
          className="mb-2"
          color="#206bc4"
          onChange={([min, max]) => {
            setGoals((prevState) => ({
              ...prevState,
              goalProteins: min as number,
              limitProteins: max as number
            }));
          }}
          start={[goalProteins, limitProteins]}
        >
          {t('proteins')}
        </Slider>
        <Slider
          id="fats-slider"
          type="range"
          name="fats"
          min={0}
          max={500}
          step={1}
          className="mb-2"
          color="#d63939"
          onChange={([min, max]) => {
            setGoals((prevState) => ({
              ...prevState,
              goalFats: min as number,
              limitFats: max as number
            }));
          }}
          start={[goalFats, limitFats]}
        >
          {t('fats')}
        </Slider>
        <Slider
          id="carbohydrates-slider"
          type="range"
          name="carbohydrates"
          min={0}
          max={500}
          step={1}
          color="#2fb344"
          onChange={([min, max]) => {
            setGoals((prevState) => ({
              ...prevState,
              goalCarbohydrates: min as number,
              limitCarbohydrates: max as number
            }));
          }}
          start={[goalCarbohydrates, limitCarbohydrates]}
        >
          {t('carbohydrates')}
        </Slider>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button
          type="button"
          variant="success"
          isLoading={false}
          onClick={() => {
            dispatch(modifyNutritionGoals(goals))
              .unwrap()
              .then(() => onHide());
          }}
        >
          {t('modify_goals')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GoalsModal;
