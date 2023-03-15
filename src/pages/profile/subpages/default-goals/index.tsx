import GoalsBody, { IGoals } from 'components/goals-body';
import React, { useState } from 'react';

const DefaultGoalsSubPage = () => {
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
  return (
    <GoalsBody
      goals={goals}
      setGoals={setGoals}
    />
  );
};

export default DefaultGoalsSubPage;
