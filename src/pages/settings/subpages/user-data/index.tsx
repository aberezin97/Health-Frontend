import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

import ChangeUserData from 'components/change-user-data';
import ChangeUserImage from 'components/change-user-image';
import { useAppSelector } from 'store';
import { useTranslation } from 'react-i18next';

const UserDataSubPage = () => {
  const [t] = useTranslation();
  const userData = useAppSelector((state) => state.user.data);
  return (
    <>
      <Card.Body>
        <h2 className='mb-4'>{t('user:user_data')}</h2>
        <Row>
          <Col xl={6} className="mb-2">
            <ChangeUserData initialValues={userData} />
          </Col>
          <Col xl={6} className="mb-2">
            <ChangeUserImage initialValues={userData} />
          </Col>
        </Row>
      </Card.Body>
    </>
  );
};

export default UserDataSubPage;
