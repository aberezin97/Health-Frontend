import React, { useEffect, useMemo, useState } from 'react';
import {
  ButtonGroup,
  Card, Col, Form, FormControl, ListGroup, Row
} from 'react-bootstrap';
import PrivacyModal, { IPrivacyModalState } from 'components/privacy-modal';
import { useAppDispatch, useAppSelector } from 'store';
import { getUserPermissions, modifyUserPermission } from 'controllers/user';
import { EPermissionType, IPermission } from 'store/slices/userSlice';
import cn from 'classnames';
import Button from 'components/button';
import { useTranslation } from 'react-i18next';

const PrivacySubPage = () => {
  const [t] = useTranslation();
  const { permissions } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [modalState, setModalState] = useState<IPrivacyModalState>({
    show: false,
    permissionId: null,
    data: null
  });

  const sortedPermissions = useMemo(() => {
    const result: Record<string, IPermission[]> = {};
    permissions
      .filter((permission) => {
        const lowerSearch = search.toLowerCase();
        return (
          permission.receiver.firstName.toLowerCase().includes(lowerSearch) ||
          permission.receiver.lastName.toLowerCase().includes(lowerSearch) ||
          permission.receiver.username.toLowerCase().includes(lowerSearch)
        );
      })
      .forEach((permission) => {
        const letter = permission.receiver.lastName ? (
          permission.receiver.lastName.charAt(0)
        ) : (
          '#'
        );

        if (result[letter] === undefined) {
          result[letter] = [permission];
        } else {
          result[letter].push(permission);
        }
      });
    return result;
  }, [permissions, search]);

  useEffect(() => {
    dispatch(getUserPermissions());
  }, []);
  return (
    <>
      <Card.Body>
        <h2 className='mb-4'>{t('privacy:privacy')}</h2>
        <Form.Check
          type='switch'
          label={
            isPublic
              ? t('privacy:your_profile_publicly_available')
              : t('privacy:your_profile_not_publicly_available')
          }
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
        />
        <Card>
          <Card.Header className='align-items-center justify-content-between'>
            <h4 className='mb-0'>{t('user:share_profile')}</h4>
            {/* <InputSearchUser
              onChange={(userData) => {
                setModalState({
                  show: true,
                  modify: false,
                  data: userData
                });
              }}
            /> */}
            <div className='input-icon'>
              <span className='input-icon-addon'>
                <i className="fas fa-search" />
              </span>
              <FormControl
                placeholder='Поиск...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </Card.Header>
          <Card.Body className='p-0'>
            <ListGroup
              variant='flush'
              style={{
                overflowX: 'hidden',
                overflowY: 'auto',
                maxHeight: '35rem'
              }}
            >
              {
                Object.keys(sortedPermissions).sort().map((letter) => (
                  <React.Fragment key={letter}>
                    <div className='list-group-header sticky-top'>{letter}</div>
                    {sortedPermissions[letter].map((permission) => (
                      <ListGroup.Item
                        key={permission.id}
                        role="button"
                        onClick={() => {
                          setModalState({
                            show: true,
                            permissionId: permission.id,
                            data: {
                              receiver: permission.receiver,
                              stats: permission.stats,
                              exercises: permission.exercises,
                              nutrition: permission.nutrition,
                              weight: permission.weight
                            }
                          });
                        }}
                      >
                        <Row className='align-items-center'>
                          <Col xs="auto">
                            <span
                              className="avatar"
                              style={{
                                // eslint-disable-next-line max-len
                                backgroundImage: `url(http://127.0.0.1:8000${permission.receiver.image})`
                              }}
                            />
                          </Col>
                          <Col className='text-truncate'>
                            <span className='text-body d-block'>
                              {
                                // eslint-disable-next-line max-len
                                `${permission.receiver.firstName} ${permission.receiver.lastName}`
                              }
                            </span>
                            <div
                              className='d-block text-muted text-truncate mt-n1'
                            >
                              @{permission.receiver.username}
                            </div>
                          </Col>
                          <Col xs="auto">
                            <div className='d-flex align-items-center'>
                              <ButtonGroup>
                                <span
                                  className={cn('btn btn-icon', {
                                    'bg-danger':
                                      permission.stats === EPermissionType.NONE,
                                    'bg-success':
                                      permission.stats === EPermissionType.READ
                                  })}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    dispatch(modifyUserPermission({
                                      ...permission,
                                      // eslint-disable-next-line max-len
                                      stats: permission.stats + 1 > EPermissionType.READ
                                        ? EPermissionType.NONE
                                        : permission.stats + 1
                                    }));
                                  }}
                                >
                                  <i
                                    className='fas fa-chart-bar'
                                  />
                                </span>
                                <span
                                  className={cn('btn btn-icon', {
                                    'bg-danger':
                                    permission.weight === EPermissionType.NONE,
                                    'bg-success':
                                    permission.weight === EPermissionType.READ
                                  })}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    dispatch(modifyUserPermission({
                                      ...permission,
                                      // eslint-disable-next-line max-len
                                      weight: permission.weight + 1 > EPermissionType.READ
                                        ? EPermissionType.NONE
                                        : permission.weight + 1
                                    }));
                                  }}
                                >
                                  <i
                                    className='fas fa-weight'
                                  />
                                </span>
                                <span
                                  className={cn('btn btn-icon', {
                                    'bg-danger':
                                    // eslint-disable-next-line max-len
                                    permission.nutrition === EPermissionType.NONE,
                                    'bg-warning':
                                    // eslint-disable-next-line max-len
                                    permission.nutrition === EPermissionType.READ,
                                    'bg-success':
                                    // eslint-disable-next-line max-len
                                    permission.nutrition === EPermissionType.READWRITE
                                  })}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    dispatch(modifyUserPermission({
                                      ...permission,
                                      // eslint-disable-next-line max-len
                                      nutrition: permission.nutrition + 1 > EPermissionType.READWRITE
                                        ? EPermissionType.NONE
                                        : permission.nutrition + 1
                                    }));
                                  }}
                                >
                                  <i
                                    className='fas fa-utensils'
                                  />
                                </span>
                                <span
                                  className={cn('btn btn-icon', {
                                    'bg-danger':
                                    // eslint-disable-next-line max-len
                                    permission.exercises === EPermissionType.NONE,
                                    'bg-warning':
                                    // eslint-disable-next-line max-len
                                    permission.exercises === EPermissionType.READ,
                                    'bg-success':
                                    // eslint-disable-next-line max-len
                                    permission.exercises === EPermissionType.READWRITE
                                  })}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    dispatch(modifyUserPermission({
                                      ...permission,
                                      // eslint-disable-next-line max-len
                                      exercises: permission.exercises + 1 > EPermissionType.READWRITE
                                        ? EPermissionType.NONE
                                        : permission.exercises + 1
                                    }));
                                  }}
                                >
                                  <i
                                    className='fas fa-dumbbell'
                                  />
                                </span>
                              </ButtonGroup>
                            </div>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </React.Fragment>
                ))
              }
            </ListGroup>
          </Card.Body>
          <Card.Footer className="d-flex justify-content-center">
            <Button
              isLoading={false}
              variant="success"
              onClick={() => {
                setModalState({
                  data: null,
                  permissionId: null,
                  show: true
                });
              }}
            >
              {t('general:add_entry')}
            </Button>
            <PrivacyModal
              state={modalState}
              onHide={() => {
                setModalState((prev) => ({
                  ...prev,
                  show: false
                }));
              }}
            />
          </Card.Footer>
        </Card>
      </Card.Body>
      {/* <Card.Footer className='bg-transparent d-flex justify-content-end'>
      </Card.Footer> */}
    </>
  );
};

export default PrivacySubPage;
