import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from 'store';
import { ELanguage, changeLanguage } from 'store/slices/userSlice';
import './index.css';

export interface IChangeLanguageProps {
  variant: 'normal' | 'center';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
}

type CustomToggleProps = {
  children?: React.ReactNode;
  onClick: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => Record<string, unknown>;
};

const CustomToggle = React.forwardRef(
  (
    { children, onClick }: CustomToggleProps,
    ref: React.LegacyRef<HTMLAnchorElement> | undefined
  ) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <span className={`flag flag-sm flag-country-${children}`}></span>
    </a>
  )
);
CustomToggle.displayName = 'CustomToggle';

const ChangeLanguage = ({ variant, ...otherProps }: IChangeLanguageProps) => {
  const dispatch = useAppDispatch();
  const { language } = useAppSelector((state) => state.user);
  return (
    <Dropdown {...otherProps}>
      <Dropdown.Toggle as={CustomToggle}>
        {language === ELanguage.EN ? 'gb' : language}
      </Dropdown.Toggle>
      <Dropdown.Menu
        className={
          variant === 'normal'
            ? 'dropdown-menu-end dropdown-menu-arrow'
            : 'dropdown-menu-language-center'
        }
      >
        <Dropdown.Item
          as="h4"
          className={language === ELanguage.RU ? 'active' : undefined}
          onClick={() => {
            dispatch(changeLanguage(ELanguage.RU));
          }}
        >
          <span className={'flag flag-xs flag-country-ru me-2'}></span>
          Русский
        </Dropdown.Item>
        <Dropdown.Item
          as="h4"
          className={language === ELanguage.EN ? 'active' : undefined}
          onClick={() => {
            dispatch(changeLanguage(ELanguage.EN));
          }}
        >
          <span className={'flag flag-xs flag-country-gb me-2'}></span>
          English
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ChangeLanguage;
