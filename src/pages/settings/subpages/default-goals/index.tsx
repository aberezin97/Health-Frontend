import GoalsBody, { IGoals } from 'components/goals-body';
import React, { useEffect, useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import Button from 'components/button';
import { useAppDispatch, useAppSelector } from 'store';
import { changeUserDefaultGoals, getUserDefaultGoals } from 'controllers/user';
import { useTranslation } from 'react-i18next';

const DefaultGoalsSubPage = () => {
  const [t] = useTranslation();
  const userData = useAppSelector(((state) => state.user.data));
  const dispatch = useAppDispatch();
  const [goals, setGoals] = useState<IGoals>({
    goalCalories: 0,
    goalCarbohydrates: 0,
    goalFats: 0,
    goalLiquid: 0,
    goalProteins: 0,
    limitCalories: 0,
    limitCarbohydrates: 0,
    limitFats: 0,
    limitProteins: 0
  });

  useEffect(() => {
    setGoals({
      goalCalories: userData?.defaultGoalCalories || 0,
      goalCarbohydrates: userData?.defaultGoalCarbohydrates || 0,
      goalFats: userData?.defaultGoalFats || 0,
      goalProteins: userData?.defaultGoalProteins || 0,
      limitProteins: userData?.defaultLimitProteins || 0,
      limitFats: userData?.defaultLimitFats || 0,
      limitCalories: userData?.defaultLimitCalories || 0,
      limitCarbohydrates: userData?.defaultLimitCarbohydrates || 0,
      goalLiquid: userData?.defaultGoalLiquid || 0
    });
  }, [userData]);

  useEffect(() => {
    dispatch(getUserDefaultGoals());
  }, []);

  return (
    <Form>
      <Card.Body>
        <h2 className="mb-4">{t('nutrition:default_goals')}</h2>
        <GoalsBody
          goals={goals}
          setGoals={setGoals}
        />
      </Card.Body>
      <Card.Footer className='bg-transparent d-flex justify-content-end'>
        <Button
          isLoading={false}
          variant="success"
          onClick={() => {
            dispatch(changeUserDefaultGoals({
              defaultGoalCalories: goals.goalCalories,
              defaultGoalCarbohydrates: goals.goalCarbohydrates,
              defaultGoalFats: goals.goalFats,
              defaultGoalLiquid: goals.goalLiquid,
              defaultGoalProteins: goals.goalProteins,
              defaultLimitCalories: goals.limitCalories,
              defaultLimitCarbohydrates: goals.limitCarbohydrates,
              defaultLimitFats: goals.limitFats,
              defaultLimitProteins: goals.limitProteins
            }));
          }}
        >
          {t('nutrition:change_default_goals')}
        </Button>
      </Card.Footer>
    </Form>
  );
};

export default DefaultGoalsSubPage;
