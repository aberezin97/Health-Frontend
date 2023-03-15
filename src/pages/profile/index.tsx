import React, { useState } from 'react';
import Page from 'components/page';
import {
  Row, Col, Card, ListGroup
} from 'react-bootstrap';
import UserDataSubPage from './subpages/user-data';
import DefaultGoalsSubPage from './subpages/default-goals';

enum EProfileSubPageValues {
  USER_DATA,
  DEFAULT_GOALS,
  PRIVACY,
}

interface ISubPage<T> {
  title: string;
  value: T;
}

interface ISubPageCategory<T> {
  header: string;
  subPages: Array<ISubPage<T>>;
}

const profileSubCategories: Array<ISubPageCategory<EProfileSubPageValues>> = [
  {
    header: 'Profile Settings',
    subPages: [
      {
        title: 'User Data',
        value: EProfileSubPageValues.USER_DATA
      },
      {
        title: 'Default Goals',
        value: EProfileSubPageValues.DEFAULT_GOALS
      },
      {
        title: 'Privacy',
        value: EProfileSubPageValues.PRIVACY
      }
    ]
  }
];

const ProfilePage = () => {
  const [
    currentSubPage,
    setCurrentSubPage
  ] = useState<ISubPage<EProfileSubPageValues>>(
    profileSubCategories[0].subPages[0]
  );

  return (
    <Page title='Профиль'>
      <Card>
        <Row className='g-0'>
          <Col sm={3} className="d-none d-md-block border-end">
            <Card.Body>
              {
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
              }
            </Card.Body>
          </Col>
          <Col className='d-flex flex-column'>
            <Card.Body>
              <h2 className='mb-4'>{currentSubPage.title}</h2>
              { currentSubPage.value === EProfileSubPageValues.USER_DATA && (
                <UserDataSubPage />
              )}
              { currentSubPage.value === EProfileSubPageValues.DEFAULT_GOALS && (
                <DefaultGoalsSubPage />
              )}
            </Card.Body>
            <Card.Footer className='bg-transparent'>
            </Card.Footer>
          </Col>
        </Row>
      </Card>

    </Page>
  );
};

export default ProfilePage;
