import React, { useState } from 'react';
import {
  Card, Row, Col
} from 'react-bootstrap';

interface ISubPage {
  title: string;
  id: number;
  page: () => JSX.Element;
}

interface ISubPageCategory {
  header: string;
  subPages: ISubPage[];
}

// interface ISubpagerProps {
//   categories:
// }

interface ISubpagerProps {
  categories: ISubPageCategory[];
}

const Subpager = ({ categories }: ISubpagerProps) => {
  const [currentSubPage, setCurrentSubPage] = useState<ISubPage>();
  return (
    <Card>
      <Row className='g-0'>
        <Col sm={3} className="d-none d-md-block border-end">
          <Card.Body>
            {/* {
              profileSubCategories.map((category) => (
                <React.Fragment key={category.header}>
                  <h4 className='subheader'>{category.header}</h4>
                  <ListGroup
                    className='list-group-transparent'
                  >
                    {category.subPages.map((subPage) => (
                      <ListGroup.Item
                        action
                        active={subPage.value === currentSubPage.value}
                        key={subPage.value}
                        onClick={() => setCurrentSubPage(subPage)}
                      >
                        {subPage.title}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </React.Fragment>
              ))
            } */}
          </Card.Body>
        </Col>
        <Col className='d-flex flex-column'>
          {/* <Card.Body>
            <h2 className='mb-4'>{currentSubPage.title}</h2>
            { currentSubPage.value === EProfileSubPageValues.USER_DATA && (
              <UserDataSubPage />
            )}
            { currentSubPage.value === EProfileSubPageValues.DEFAULT_GOALS && (
              <DefaultGoalsSubPage />
            )}
          </Card.Body>
          <Card.Footer className='bg-transparent'>
          </Card.Footer> */}
        </Col>
      </Row>
    </Card>
  );
};
