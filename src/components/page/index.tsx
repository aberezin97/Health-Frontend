import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './index.css';

export interface IPageProps {
  pretitle?: string;
  title: string;
  children?: React.ReactNode;
  options?: React.ReactNode;
}

const Page = ({
  pretitle, title, children, options
}: IPageProps) => (
  <div className="page-wrapper">
    <Container fluid="xl">
      <div className="page-header d-print-none">
        <Row className="g-2 align-items-center">
          <Col>
            <div className="page-pretitle">{pretitle}</div>
            <h2 className="page-title">{title}</h2>
          </Col>
          <Col xs="12" md="auto" className="ms-auto">
            {options}
          </Col>
        </Row>
      </div>
    </Container>
    <div className="page-body">
      <Container fluid="xl">
        {children}
      </Container>
    </div>
  </div>
);

export default Page;
