import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import DeleteAccount from 'components/delete-account';
import { useTranslation } from 'react-i18next';

const DeleteAccountSubPage = () => {
  const [t] = useTranslation();
  return (
    <>
      <Card.Body>
        <h2 className='mb-4'>{t('user:delete_account')}</h2>
        <Row>
          <Col>
            <DeleteAccount />
          </Col>
        </Row>
      </Card.Body>
    </>
  );
};

export default DeleteAccountSubPage;
