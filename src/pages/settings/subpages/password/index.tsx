import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import ChangeUserPassword from 'components/change-user-password';
import { useTranslation } from 'react-i18next';

const ChangePasswordSubPage = () => {
  const [t] = useTranslation();
  return (
    <>
      <Card.Body>
        <h2 className='mb-4'>{t('user:change_user_password')}</h2>
        <Row>
          <Col>
            <ChangeUserPassword />
          </Col>
        </Row>
      </Card.Body>
    </>
  );
};

export default ChangePasswordSubPage;
