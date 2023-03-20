import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './index.css';

export interface IPageProps {
  pretitle?: string;
  title: string;
  children?: React.ReactNode;
  options?: React.ReactNode;
  forbidden?: boolean;
}

const Page = ({
  pretitle,
  title,
  children,
  options,
  forbidden = false
}: IPageProps) => (
  <div className="page-wrapper">
    <Container fluid="xl">
      <div className="page-header d-print-none">
        <Row className="g-2 align-items-center">
          <Col>
            {!forbidden && (
              <div className="page-pretitle">{pretitle}</div>
            )}
            <h2 className="page-title">{title}</h2>
          </Col>
          { !forbidden && (
            <Col xs="12" md="auto" className="ms-auto">
              {options}
            </Col>
          )}
        </Row>
      </div>
    </Container>
    <div className="page-body">
      <Container fluid="xl">
        {!forbidden ? children : (
          <div className='empty'>
            <div className='empty-img'>
              <i className="fas fa-low-vision fa-10x" />
            </div>
            <p className='empty-title'>
              You don&apos;t have rights to access this page
            </p>
            <p className='empty-subtitle text-muted'>
              User is not publicly available or restricted access to his page
            </p>
          </div>
        )}
      </Container>
    </div>
  </div>
);

export default Page;
