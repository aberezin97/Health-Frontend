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
import { useAppDispatch } from 'store';
import { signOut } from 'store/slices/userSlice';
import ChangeLanguage from 'components/change-language';
import './index.css';
import InputSearchUser from 'components/input-search-user';
import UserPreview from 'components/user-preview';
import cn from 'classnames';
import { IUserShort } from 'pages/root';

interface ILink {
  url: string;
  title: string;
  icon?: string;
}

export interface INavbarProps {
  links?: ILink[];
  dropdownLinks?: ILink[];
  currentUser: IUserShort;
  myUserData: IUserShort;
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
  },
  {
    url: ROUTES.EXERCISES,
    title: 'exercises',
    icon: 'dumbbell'
  }
];

const defaultDropdownLinks = [
  {
    url: ROUTES.PRODUCTS,
    title: 'my_products'
  },
  {
    url: ROUTES.PROFILE,
    title: 'profile'
  },
  {
    url: ROUTES.SETTINGS,
    title: 'settings'
  }
];

const Navbar = ({
  links = defaultLinks,
  dropdownLinks = defaultDropdownLinks,
  currentUser,
  myUserData
}: INavbarProps) => {
  const [t] = useTranslation('navbar');
  const [ariaExpanded, setAriaExpanded] = useState(false);
  const location = useLocation();
  const dispatch = useAppDispatch();
  return (
    <div className='sticky-top'>
      <BootstrapNavbar expand="md" sticky="top" as="header">
        <Container fluid="xl">
          <BootstrapNavbar.Toggle
            onClick={() => setAriaExpanded(!ariaExpanded)}
            aria-expanded={ariaExpanded}
          />
          <BootstrapNavbar.Brand className="pe-0 pe-md-3" as="h1">
            <Link to="/">
              <i className="fas fa-h-square fa-2x text-success" />
            </Link>
          </BootstrapNavbar.Brand>
          <Nav className="flex-row order-md-last">
            <Dropdown className="nav-item">
              <Dropdown.Toggle
                as="a"
                href="#"
                className="nav-link d-flex lh-1 text-reset"
                bsPrefix="p-0"
              >
                <UserPreview
                  firstName={myUserData.firstName}
                  lastName={myUserData.lastName}
                  imageUrl={myUserData.image}
                  username={myUserData.username}
                />
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
            justify-content-between
          `}
            >
              <div className='d-flex align-items-center order-md-last'>
                <InputSearchUser />
                <ChangeLanguage
                  variant="normal"
                  className="nav-item order-md-first me-md-2"
                />
              </div>
              <Nav as="ul">
                {links.map((link, index) => (
                  <Nav.Item
                    as="li"
                    key={index}
                    className={cn({
                      active:
                        location.pathname === `/${currentUser.id}${link.url}`
                    })}
                  >
                    <Link
                      to={`/${currentUser.id}${link.url}`}
                      className="nav-link"
                    >
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
      { currentUser.id !== myUserData.id && (
        <BootstrapNavbar
          expand="md"
          as="header"
          // className='mt-2'
          style={{
            background: 'transparent',
            boxShadow: 'none',
            padding: 0
          }}
        >
          <Container
            fluid="xl"
            style={{
              boxShadow: 'rgb(30 41 59 / 4%) 0 2px 4px 0',
              border: '1px solid rgba(98,105,118,.16)',
              borderTop: 'none',
              borderRadius: '0 0 4px 4px',
              background: '#ffffff'
            }}
          >
            {/* <BootstrapNavbar.Toggle
            onClick={() => setAriaExpanded(!ariaExpanded)}
            aria-expanded={ariaExpanded}
          /> */}
            <Nav className="flex-row">
              <span
                className="nav-link d-flex lh-1 text-reset"
                style={{
                  paddingLeft: 0
                }}
              >
                <UserPreview
                  imageUrl={currentUser.image}
                  firstName={currentUser.firstName}
                  lastName={currentUser.lastName}
                  username={currentUser.username}
                  hideDetailsOnSmallScreen={false}
                />
              </span>
            </Nav>
            <Nav className="flex-row order-md-last">
              <Link
                className="nav-link d-flex lh-1 text-reset p-0"
                to={`${myUserData.id}${ROUTES.STATS}`}
              >
                <span
                  className="avatar avatar-sm"
                  // style={{ backgroundImage: `url(${imageUrl})` }}
                >
                  <i className="fas fa-arrow-left"></i>
                </span>
                <div className="ps-2 d-none d-xl-block">
                  <div className='home-page-block'>Back to my page</div>
                </div>
              </Link>
            </Nav>
          </Container>
        </BootstrapNavbar>
      )}
    </div>
  );
};

export default Navbar;
