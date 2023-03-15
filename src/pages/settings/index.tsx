import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Page from 'components/page';
import ChangeUserPassword from 'components/change-user-password';
import DeleteAccount from 'components/delete-account';
import './index.css';

const SettingsPage = () => {
  const [t] = useTranslation('navbar');
  return (
    <Page title={t('settings')}>
      <Row>
        <Col lg={4} md={6} className="mb-2">
          <ChangeUserPassword />
        </Col>
        <Col lg={4} md={6}>
          <DeleteAccount />
        </Col>
      </Row>
    </Page>
  );
};

export default SettingsPage;
