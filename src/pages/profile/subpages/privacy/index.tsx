import InputSearchUser from 'components/input-search-user';
import React, { useState } from 'react';
import {
  Card, Form, ListGroup
} from 'react-bootstrap';
import PrivacyModal, { IPrivacyModalState } from 'components/privacy-modal';

const PrivacySubPage = () => {
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [modalState, setModalState] = useState<IPrivacyModalState>({
    show: false,
    modify: false,
    data: null
  });
  return (
    <>
      <Card.Body>
        <h2 className='mb-4'>Privacy</h2>
        <Form.Check
          type='switch'
          label="Your profile is publicly available"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
        />
        <Card>
          <Card.Header className='align-items-center justify-content-between'>
            <h4 className='mb-0'>Share Profile</h4>
            <InputSearchUser
              onChange={(userData) => {
                setModalState({
                  show: true,
                  modify: false,
                  data: userData
                });
              }}
            />
          </Card.Header>
          <Card.Body>
            <ListGroup></ListGroup>
          </Card.Body>
        </Card>
      </Card.Body>
      <PrivacyModal
        state={modalState}
        onHide={() => {
          setModalState((prev) => ({
            ...prev,
            show: false
          }));
        }}
      />
    </>
  );
};

export default PrivacySubPage;
