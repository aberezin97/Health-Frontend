import React from 'react';
import { Link } from 'react-router-dom';
import PageCenter from 'components/page-center';
import './index.css';

const NotFoundPage = () => (
  <PageCenter>
    <div className="text-center">
      <h1>404</h1>
      <p className="h4 text-muted mb-5">Not Found</p>
      <Link className="btn btn-success" to="/">
        Go Back
      </Link>
    </div>
  </PageCenter>
);

export default NotFoundPage;
