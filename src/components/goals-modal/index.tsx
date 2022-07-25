import React, { useState, useEffect } from 'react';
import { Modal, Card, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Button from 'components/button';
import Slider from 'components/slider';
import { useAppSelector, useAppDispatch } from 'store';
import { ENutritionTypeError } from 'store/slices/nutritionSlice';
import { modifyNutritionGoals, YearMonthDay } from 'controllers/nutrition';
import './index.css';

export interface IGoalsModalShow {
  status: boolean;
  date: YearMonthDay | undefined;
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
  useEffect(() => {
    setGoals({
      goalCalories,
      goalProteins,
      goalFats,
      goalCarbohydrates,
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
    limitCalories,
    limitProteins,
    limitFats,
    limitCarbohydrates
  ]);
  return (
    <Modal
      show={show.status}
      onHide={() => onHide({ status: false, date: show.date })}
      centered
      size="sm"
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
        <Card className="mb-2">
          <Card.Header as="h4">{t('calories')}</Card.Header>
          <Card.Body>
            <Slider
              id="calories-slider"
              type="range"
              name="calories"
              min={0}
              max={2500}
              step={1}
              color="#f59f00"
              onChange={([min, max]) => {
                setGoals((prevState) => ({
                  ...prevState,
                  goalCalories: min as number,
                  limitCalories: max as number
                }));
              }}
              start={[goals.goalCalories, goals.limitCalories]}
            />
          </Card.Body>
        </Card>
        <Card className="mb-2">
          <Card.Header as="h4">{t('proteins')}</Card.Header>
          <Card.Body>
            <Slider
              id="proteins-slider"
              type="range"
              name="proteins"
              min={0}
              max={500}
              step={1}
              color="#206bc4"
              onChange={([min, max]) => {
                setGoals((prevState) => ({
                  ...prevState,
                  goalProteins: min as number,
                  limitProteins: max as number
                }));
              }}
              start={[goals.goalProteins, goals.limitProteins]}
            />
          </Card.Body>
        </Card>
        <Card className="mb-2">
          <Card.Header as="h4">{t('fats')}</Card.Header>
          <Card.Body>
            <Slider
              id="fats-slider"
              type="range"
              name="fats"
              min={0}
              max={500}
              step={1}
              color="#d63939"
              onChange={([min, max]) => {
                setGoals((prevState) => ({
                  ...prevState,
                  goalFats: min as number,
                  limitFats: max as number
                }));
              }}
              start={[goals.goalFats, goals.limitFats]}
            />
          </Card.Body>
        </Card>
        <Card>
          <Card.Header as="h4">{t('carbohydrates')}</Card.Header>
          <Card.Body>
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
              start={[goals.goalCarbohydrates, goals.limitCarbohydrates]}
            />
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button
          type="button"
          variant="success"
          isLoading={loading}
          onClick={() => {
            dispatch(modifyNutritionGoals({ ...goals, date: show.date }))
              .unwrap()
              .then(() => onHide({ status: false, date: show.date }));
          }}
        >
          {t('modify_goals')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GoalsModal;
