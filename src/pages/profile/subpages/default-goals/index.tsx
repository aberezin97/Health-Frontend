import GoalsBody, { IGoals } from 'components/goals-body';
import React, { useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import Button from 'components/button';

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
    <Form>
      <Card.Body>
        <h2 className="mb-4">Default Goals</h2>
        <GoalsBody
          goals={goals}
          setGoals={setGoals}
        />
      </Card.Body>
      <Card.Footer className='bg-transparent d-flex justify-content-end'>
        <Button
          type='submit'
          isLoading={false}
          variant="success"
        >
          Change Default Goals
        </Button>
      </Card.Footer>
    </Form>
  );
};

export default DefaultGoalsSubPage;
