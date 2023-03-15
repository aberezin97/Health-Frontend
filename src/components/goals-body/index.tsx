import GoalWidget from 'components/goal-widget';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export interface IGoals {
  goalCalories: number;
  goalProteins: number;
  goalFats: number;
  goalCarbohydrates: number;
  goalLiquid: number;
  limitCalories: number;
  limitProteins: number;
  limitFats: number;
  limitCarbohydrates: number;
}

interface IGoalsBodyProps {
  goals: IGoals;
  setGoals: React.Dispatch<React.SetStateAction<IGoals>>;
}

const GoalsBody = ({ goals, setGoals }: IGoalsBodyProps) => {
  const [t] = useTranslation('nutrition');
  return (
    <>
      <Row>
        <Col>
          <Col>
            <GoalWidget
              header={t('liquid')}
              id="liquid-slider"
              className='mb-2'
              name="liquid"
              connect="lower"
              min={0}
              max={2500}
              tooltips={true}
              step={100}
              color="#4299e1"
              onChange={([value]) => {
                setGoals((prevState) => ({
                  ...prevState,
                  goalLiquid: value as number
                }));
              }}
              start={goals.goalLiquid}
            />
          </Col>
        </Col>
      </Row>
      <Row>
        <Col>
          <GoalWidget
            header={t('calories')}
            id="calories-slider"
            name="calories"
            className='mb-2'
            connect={true}
            min={0}
            max={2500}
            tooltips={[true, true]}
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
            isFormEnabled={true}
          />
        </Col>
        <Col>
          <GoalWidget
            header={t('proteins')}
            id="proteins-slider"
            name="proteins"
            className='mb-2'
            connect={true}
            min={0}
            max={500}
            tooltips={[true, true]}
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
            isFormEnabled={true}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <GoalWidget
            header={t('fats')}
            id="fats-slider"
            name="fats"
            className='mb-2'
            connect={true}
            min={0}
            max={500}
            tooltips={[true, true]}
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
            isFormEnabled={true}
          />
        </Col>
        <Col>
          <GoalWidget
            header={t('carbohydrates')}
            id="carbohydrates-slider"
            name="carbohydrates"
            className='mb-2'
            connect={true}
            min={0}
            max={500}
            tooltips={[true, true]}
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
            isFormEnabled={true}
          />
        </Col>
      </Row>
    </>
  );
};

export default GoalsBody;
