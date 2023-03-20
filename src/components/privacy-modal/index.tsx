import Button from 'components/button';
import Input from 'components/input';
import { IUserShort } from 'pages/root';
import React from 'react';
import {
  Modal, Row, Col, ModalProps, Form
} from 'react-bootstrap';
import './index.css';

export interface IPrivacyModalState {
    show: boolean;
    modify: boolean;
    data: IUserShort | null;
}

interface IPrivacyModalProps extends ModalProps {
  state: IPrivacyModalState
}

const PrivacyModal = ({ state, ...otherProps }: IPrivacyModalProps) => (
  <Modal
    show={state.show}
    size="md"
    centered
    {...otherProps}
  >
    <Modal.Header closeButton>
      <Modal.Title>Add Rule</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Row className='mb-2'>
        <Col sm="auto">
          <span
            className="avatar avatar-4"
            style={{ backgroundImage: `url(${state.data?.image})` }}
          />
        </Col>
        <Col>
          <Input
            disabled={true}
            value={state.data?.username}
          >
            Username
          </Input>
        </Col>
      </Row>
      <Row className='mb-2'>
        <Col>
          <Input
            disabled={true}
            value={state.data?.firstName}
          >
            First Name
          </Input>
        </Col>
        <Col>
          <Input
            disabled={true}
            value={state.data?.lastName}
          >
            Last Name
          </Input>
        </Col>
      </Row>
      <Row className='mb-2'>
        <Col>
          <Form.Label>
            Nutrition
          </Form.Label>
          <Form.Select>
            <option>NONE</option>
            <option>READ</option>
            <option>READWRITE</option>
          </Form.Select>
        </Col>
      </Row>
      <Row className='mb-2'>
        <Col>
          <Form.Label>
            Weight
          </Form.Label>
          <Form.Select>
            <option>NONE</option>
            <option>READ</option>
          </Form.Select>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Label>
            Exercises
          </Form.Label>
          <Form.Select>
            <option>NONE</option>
            <option>READ</option>
            <option>READWRITE</option>
          </Form.Select>
        </Col>
      </Row>
    </Modal.Body>
    <Modal.Footer>
      <Button isLoading={false} variant="success">Add Rule</Button>
    </Modal.Footer>
  </Modal>
);

export default PrivacyModal;
