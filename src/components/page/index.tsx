import React from 'react';
import {
  Container, Row, Col, Spinner
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './index.css';

export enum EPageStatus {
  LOADING,
  FORBIDDEN,
  OK
}

export interface IPageProps {
  pretitle?: string;
  title: string;
  children?: React.ReactNode;
  options?: React.ReactNode;
  status?: EPageStatus;
}

const Page = ({
  pretitle,
  title,
  children,
  options,
  status = EPageStatus.OK
}: IPageProps) => {
  const [t] = useTranslation();
  return (
    <div className="page-wrapper">
      <Container fluid="xl">
        <div className="page-header d-print-none">
          <Row className="g-2 align-items-center">
            <Col>
              { status === EPageStatus.OK && (
                <div className="page-pretitle">{pretitle}</div>
              )}
              <h2 className="page-title">{title}</h2>
            </Col>
            { status === EPageStatus.OK && (
              <Col xs="12" md="auto" className="ms-auto">
                {options}
              </Col>
            )}
          </Row>
        </div>
      </Container>
      <div className="page-body">
        <Container fluid="xl">
          {status !== EPageStatus.OK && (
            <div className='empty'>
              <div className='empty-img'>
                { status === EPageStatus.FORBIDDEN && (
                  <i className="fas fa-low-vision fa-10x" />
                )}
                {
                  status === EPageStatus.LOADING && (
                    <Spinner
                      animation='border'
                      style={{
                        width: '10em',
                        height: '10em'
                      }}
                    />
                  )
                }
              </div>
              <p className='empty-title'>
                { status === EPageStatus.FORBIDDEN && (
                  t('errors:forbidden')
                )}
                {
                  status === EPageStatus.LOADING && (
                    'Loading...'
                  )
                }
              </p>
              <p className='empty-subtitle text-muted'>
                { status === EPageStatus.FORBIDDEN && (
                  t('errors:forbidden_explanation')
                )}
              </p>
            </div>
          )}
          {status === EPageStatus.OK && children}
        </Container>
      </div>
    </div>
  );
};

export default Page;
