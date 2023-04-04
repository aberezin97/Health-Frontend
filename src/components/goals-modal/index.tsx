import React, { useState, useEffect } from 'react';
import {
  Modal, Alert
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Button from 'components/button';
import { useAppSelector, useAppDispatch } from 'store';
import {
  ENutritionLoadingType,
  ENutritionTypeError
} from 'store/slices/nutritionSlice';
import { modifyNutritionGoals, YearMonthDay } from 'controllers/nutrition';
import './index.css';
import GoalsBody from 'components/goals-body';

export interface IGoalsModalShow {
  status: boolean;
  date: YearMonthDay | undefined;
  id: number;
}

export interface IGoalsModalProps {
  show: IGoalsModalShow;
  onHide: React.Dispatch<React.SetStateAction<IGoalsModalShow>>;
}

const GoalsModal = ({ show, onHide }: IGoalsModalProps) => {
  const [t] = useTranslation('nutrition');
  const dispatch = useAppDispatch();
  const {
    error,
    loading,
    goalLiquid,
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
    goalLiquid,
    limitCalories,
    limitProteins,
    limitFats,
    limitCarbohydrates
  });
  useEffect(() => {
    setGoals({
      goalCalories,
      goalProteins,
      goalFats,
      goalCarbohydrates,
      goalLiquid,
      limitCalories,
      limitProteins,
      limitFats,
      limitCarbohydrates
    });
  }, [
    goalCalories,
    goalProteins,
    goalFats,
    goalCarbohydrates,
    goalLiquid,
    limitCalories,
    limitProteins,
    limitFats,
    limitCarbohydrates
  ]);
  return (
    <Modal
      show={show.status}
      onHide={() => onHide({ status: false, id: 0, date: show.date })}
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('modify_goals')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && error.type === ENutritionTypeError.MODIFY_GOALS
          ?
          <Alert
            variant="danger"
            onClose={() => null}
            dismissible
          >
            <Alert.Heading>Error</Alert.Heading>
            <p>{error.explanation}</p>
          </Alert>
          :
          null
        }
        <GoalsBody
          goals={goals}
          setGoals={setGoals}
        />

      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button
          type="button"
          variant="success"
          isLoading={loading[ENutritionLoadingType.MODIFY_NUTRITION_GOALS]}
          onClick={() => {
            dispatch(modifyNutritionGoals({
              ...goals,
              id: show.id,
              date: show.date
            }))
              .unwrap()
              .then(() => onHide({ status: false, id: 0, date: show.date }));
          }}
        >
          {t('modify_goals')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GoalsModal;
