import React from 'react';
import cn from 'classnames';
import './index.css';

interface IUserPreviewProps {
  imageUrl: string | null;
  firstName: string;
  lastName: string;
  username: string;
  hideDetailsOnSmallScreen?: boolean;
}

const UserPreview = ({
  imageUrl,
  firstName,
  lastName,
  username,
  hideDetailsOnSmallScreen = true
}: IUserPreviewProps) => (
  <>
    <span
      className="avatar avatar-sm"
      style={{ backgroundImage: `url(${imageUrl})` }}
    />
    <div className={cn('ps-2', {
      'd-none d-xl-block': hideDetailsOnSmallScreen,
      'd-block': !hideDetailsOnSmallScreen
    })}>
      <div className='name-block name-text'>{`${firstName} ${lastName}`}</div>
      <div
        className="mt-1 small text-muted name-block name-text"
      >
        {`@${username}`}
      </div>
    </div>
  </>
);

export default UserPreview;
