import React from 'react';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './index.css';

export interface IInputProps {
  children: string | JSX.Element | JSX.Element[];
  type: string;
  name: string;
  value?: string | number | string[] | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
  isInvalid?: boolean | undefined;
  isValid?: boolean | undefined;
  showErrorMessage?: boolean;
  errorMessage?: string | undefined;
  max?: number;
  step?: number;
  min?: number;
  disabled?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
}

const Input = ({
  children,
  type,
  name,
  value,
  step,
  max,
  min,
  onChange,
  onBlur,
  isInvalid,
  isValid,
  errorMessage,
  showErrorMessage = false,
  disabled = false,
  ...otherProps
}: IInputProps) => {
  const [t] = useTranslation('validators'); return (
    <Form.Group {...otherProps}>
      <Form.Label>{children}</Form.Label>
      <Form.Control
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        isInvalid={isInvalid}
        isValid={isValid}
        step={step}
        max={max}
        min={min}
        disabled={disabled}
      />
      {showErrorMessage && isInvalid && errorMessage ? (
        <Form.Control.Feedback type="invalid">
          {t(errorMessage)}
        </Form.Control.Feedback>
      ) : null}
    </Form.Group>
  );
};

export default Input;
