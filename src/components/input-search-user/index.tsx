import React, { useState } from 'react';
import { AsyncTypeahead, Hint } from 'react-bootstrap-typeahead';
import { Form } from 'react-bootstrap';
import { IUserShort } from 'pages/root';
import axios from 'axios';
import { useAppSelector } from 'store';
import UserPreview from 'components/user-preview';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

interface IInputSearchUserProps {
  className?: string;
  onChange?: (userData: IUserShort) => void;
}

const InputSearchUser = ({ className, onChange }: IInputSearchUserProps) => {
  const [t] = useTranslation();
  const { token } = useAppSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  return (
    <AsyncTypeahead
      id="username"
      isLoading={isLoading}
      options={users}
      labelKey="username"
      onSearch={(query) => {
        setIsLoading(true);
        axios.get('/api/user/', {
          headers: {
            Authorization: `Token ${token}`
          }
        }).then(({ data }) => {
          setUsers(data);
        }).finally(() => {
          setIsLoading(false);
        });
      }}
      filterBy={() => true}
      placeholder={t('user:search_user')}
      className={className}
      renderInput={({ inputRef, referenceElementRef, ...inputProps }) => (

        <div className={cn('input-icon', className)}>
          <Hint>
            <span className='input-icon-addon'>
              <i className="fas fa-search" />
            </span>
            <Form.Control
              {...inputProps}
              ref={(node) => {
                inputRef(node);
                referenceElementRef(node);
              }}
            />
          </Hint>
        </div>
      )}
      renderMenuItemChildren={(option: IUserShort) => (
        <UserPreview
          firstName={option.firstName}
          lastName={option.lastName}
          username={option.username}
          imageUrl={option.image}
          hideDetailsOnSmallScreen={false}
        />
      )}
      onChange={(selected) => {
        const [selection] = selected;
        if (selection !== undefined && onChange) {
          onChange(selection as IUserShort);
        }
      }}
    />

  );
};

export default InputSearchUser;
