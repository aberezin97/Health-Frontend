import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'store';
import Page from 'components/page';
import ChangeUserData from 'components/change-user-data';
import ChangeUserPassword from 'components/change-user-password';
import ChangeUserImage from 'components/change-user-image';
import DeleteAccount from 'components/delete-account';
import './index.css';

const SettingsPage = () => {
  const [t] = useTranslation('navbar');
  const userData = useAppSelector((state) => state.user.data);
  return (
    <Page title={t('settings')}>
      <Row>
        <Col lg={4} md={6} className="mb-2">
          <ChangeUserData initialValues={userData} />
        </Col>
        <Col lg={4} md={6} className="mb-2">
          <ChangeUserPassword />
        </Col>
        <Col lg={4} md={6} className="mb-2">
          <ChangeUserImage initialValues={userData} />
        </Col>
        <Col lg={4} md={6}>
          <DeleteAccount />
        </Col>
      </Row>
    </Page>
  );
};

export default SettingsPage;
