import React from 'react';
import Page from 'components/page';
import {
  Row, Col, Card, ListGroup
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { SETTINGS_ROUTES, ROUTES } from 'routes';

interface ISubPage {
  title: string;
  link: string;
}

interface ISubPageCategory {
  header: string;
  subPages: ISubPage[];
}

const profileSubCategories: ISubPageCategory[] = [
  {
    header: 'settings:profile_settings',
    subPages: [
      {
        title: 'user:user_data',
        link: SETTINGS_ROUTES.USER_DATA
      },
      {
        title: 'nutrition:default_goals',
        link: SETTINGS_ROUTES.DEFAULT_GOALS
      }
    ]
  },
  {
    header: 'settings:security_settings',
    subPages: [
      {
        title: 'privacy:privacy',
        link: SETTINGS_ROUTES.PRIVACY
      },
      {
        title: 'user:change_user_password',
        link: SETTINGS_ROUTES.CHANGE_PASSWORD
      },
      {
        title: 'user:delete_account',
        link: SETTINGS_ROUTES.DELETE_ACCOUNT
      }
    ]
  }
];

const SettingsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [t] = useTranslation();

  return (
    <Page title={t('navbar:settings')}>
      <Card>
        <Row className='g-0'>
          <Col sm={3} className="d-none d-md-block border-end">
            <Card.Body>
              {
                profileSubCategories.map((category) => (
                  <React.Fragment key={category.header}>
                    <h4 className='subheader mt-4'>{t(category.header)}</h4>
                    <ListGroup
                      className='list-group-transparent'
                    >
                      {category.subPages.map((subPage) => (
                        <ListGroup.Item
                          action
                          // eslint-disable-next-line max-len
                          active={`${ROUTES.SETTINGS}/${subPage.link}` === location.pathname}
                          key={subPage.link}
                          onClick={() => navigate(subPage.link)}
                        >
                          {t(subPage.title)}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </React.Fragment>
                ))
              }
            </Card.Body>
          </Col>
          <Col className='d-flex flex-column'>
            <Outlet />
          </Col>
        </Row>
      </Card>

    </Page>
  );
};

export default SettingsPage;
