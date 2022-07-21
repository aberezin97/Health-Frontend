import React from 'react';
import ChangeLanguage from 'components/change-language';
import './index.css';

export interface IPageCenterProps {
  children?: React.ReactNode;
}

const PageCenter = ({ children }: IPageCenterProps) => (
  <div className="d-flex flex-column theme-light">
    <div className="page page-center">
      <div className="container-tight py-4">
        <div className="text-center mb-4">
          <i className="fas fa-h-square fa-10x text-success"></i>
        </div>
        {children}
        <div className="text-center mt-2">
          <ChangeLanguage variant="center" />
        </div>
      </div>
    </div>
  </div>
);

export default PageCenter;
