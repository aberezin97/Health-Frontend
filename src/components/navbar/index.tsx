import React, { useState } from 'react';
import {
  Navbar as BootstrapNavbar,
  Nav,
  Container,
  Dropdown
} from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useTranslation } from 'react-i18next';
import { ROUTES } from 'routes';
import { useAppDispatch, useAppSelector } from 'store';
import { signOut } from 'store/slices/userSlice';
import ChangeLanguage from 'components/change-language';
import './index.css';

export interface INavbarProps {
  links?: Array<{
    url: string;
    title: string;
    icon?: string;
  }>;
  dropdownLinks?: Array<{
    url: string;
    title: string;
  }>;
}

const defaultLinks = [
  {
    url: ROUTES.STATS,
    title: 'stats',
    icon: 'chart-bar'
  },
  {
    url: ROUTES.WEIGHT,
    title: 'weight',
    icon: 'weight'
  },
  {
    url: ROUTES.NUTRITION,
    title: 'nutrition',
    icon: 'utensils'
  }
];

const defaultDropdownLinks = [
  {
    url: ROUTES.PRODUCTS,
    title: 'my_products'
  },
  {
    url: ROUTES.SETTINGS,
    title: 'settings'
  }
];

const Navbar = ({
  links = defaultLinks,
  dropdownLinks = defaultDropdownLinks
}: INavbarProps) => {
  const [t] = useTranslation('navbar');
  const [ariaExpanded, setAriaExpanded] = useState(false);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.user.data);
  const {
    username, firstName, lastName, image
  } =
    userData !== null
      ? userData
      : {
        username: 'user',
        firstName: 'Firstname',
        lastName: 'Lastname',
        image: null
      };
  return (
    <BootstrapNavbar expand="md" sticky="top" as="header">
      <Container fluid="xl">
        <BootstrapNavbar.Toggle
          onClick={() => setAriaExpanded(!ariaExpanded)}
          aria-expanded={ariaExpanded}
        />
        <BootstrapNavbar.Brand className="pe-0 pe-md-3" as="h1">
          <Link to="/">
            <i className="fas fa-h-square fa-2x text-success"></i>
          </Link>
        </BootstrapNavbar.Brand>
        <Nav className="flex-row order-md-last">
          <ChangeLanguage variant="normal" className="nav-item me-2" />
          <Dropdown className="nav-item">
            <Dropdown.Toggle
              as="a"
              href="#"
              className="nav-link d-flex lh-1 text-reset"
              bsPrefix="p-0"
            >
              <span
                className="avatar avatar-sm"
                style={{ backgroundImage: `url(${image})` }}
              ></span>
              <div className="d-none d-xl-block ps-2">
                <div>{`${firstName} ${lastName}`}</div>
                <div className="mt-1 small text-muted">{`@${username}`}</div>
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-menu-end dropdown-menu-arrow">
              {dropdownLinks.map((link, index) => (
                <LinkContainer to={link.url} key={index}>
                  <Dropdown.Item
                    className={
                      location.pathname === link.url ? 'active' : undefined
                    }
                  >
                    {t(link.title)}
                  </Dropdown.Item>
                </LinkContainer>
              ))}
              <Dropdown.Divider />
              <Dropdown.Item
                onClick={() => {
                  dispatch(signOut());
                }}
              >
                {t('sign_out')}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
        <BootstrapNavbar.Collapse>
          <div
            className={`
            d-flex
            flex-column
            flex-md-row
            flex-fill
            align-items-stretch
            align-items-md-center
          `}
          >
            <Nav as="ul">
              {links.map((link, index) => (
                <Nav.Item
                  as="li"
                  key={index}
                  className={
                    location.pathname === link.url ? 'active' : undefined
                  }
                >
                  <Link to={link.url} className="nav-link">
                    {link.icon !== undefined ? (
                      <span
                        className={`
                        nav-link-icon 
                        d-md-none 
                        d-lg-inline-block`}
                      >
                        <i className={`fas fa-${link.icon}`}></i>
                      </span>
                    ) : null}
                    <span className="nav-link-title">{t(link.title)}</span>
                  </Link>
                </Nav.Item>
              ))}
            </Nav>
          </div>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
