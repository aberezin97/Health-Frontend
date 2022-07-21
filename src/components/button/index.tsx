import React from 'react';
import { Button as BoostrapButton, Spinner } from 'react-bootstrap';
import './index.css';

interface IButtonProps {
  isLoading: boolean;
  children: JSX.Element | string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [otherProps: string]: any;
}

const Button = ({ isLoading, children, ...otherProps }: IButtonProps) => (
  <BoostrapButton {...otherProps}>
    {isLoading ? (
      <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />
    ) : (
      children
    )}
  </BoostrapButton>
);

export default Button;
