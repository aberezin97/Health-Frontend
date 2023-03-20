import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

import ChangeUserData from 'components/change-user-data';
import ChangeUserImage from 'components/change-user-image';
import { useAppSelector } from 'store';

const UserDataSubPage = () => {
  const userData = useAppSelector((state) => state.user.data);
  return (
    <>
      <Card.Body>
        <h2 className='mb-4'>User Data</h2>
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
