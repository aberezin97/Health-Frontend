import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'store';
import { activateUser } from 'controllers/user';
import PageCenter from 'components/page-center';
import './index.css';

const ActivatePage = () => {
  const dispatch = useAppDispatch();
  const { uidb64, token } = useParams();
  useEffect(() => {
    if (uidb64 !== undefined && token !== undefined) {
      dispatch(activateUser({ uidb64, token }));
    }
  }, []);
  return <PageCenter></PageCenter>;
};

export default ActivatePage;
