import React, { useState, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import Navbar from 'components/navbar';
import { useAppSelector } from 'store';
import axios from 'axios';

export interface IUserShort {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  image: string | null;
}

const RootPage = () => {
  const { token, data: myUserData } = useAppSelector((state) => state.user);
  const { userId } = useParams();
  const [currentUser, setCurrentUser] = useState<IUserShort | null>(myUserData);

  useEffect(() => {
    if (userId !== undefined && Number(userId) !== myUserData?.id) {
      axios.get(`/api/user/${userId}/`, {
        headers: {
          Authorization: `Token ${token}`
        }
      }).then(({ data }) => {
        setCurrentUser(data);
      });
    } else {
      setCurrentUser(myUserData);
    }
  }, [userId, token, myUserData]);

  return (
    <div className="page">
      { myUserData && currentUser && (
        <Navbar
          currentUser={currentUser}
          myUserData={myUserData}
        />
      )}
      <Outlet />
    </div>
  );
};

export default RootPage;
