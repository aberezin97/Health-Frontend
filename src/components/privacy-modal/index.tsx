import Button from 'components/button';
import Input from 'components/input';
import InputSearchUser from 'components/input-search-user';
import {
  createUserPermission,
  delUserPermission,
  modifyUserPermission
} from 'controllers/user';
import { useFormik } from 'formik';
import { IUserShort } from 'pages/root';
import React, { useEffect, useState } from 'react';
import {
  Modal, Row, Col, ModalProps, Form
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'store';
import { EPermissionType } from 'store/slices/userSlice';
import './index.css';

export interface IPrivacyData {
  receiver: IUserShort;
  weight: EPermissionType;
  nutrition: EPermissionType;
  exercises: EPermissionType;
  stats: EPermissionType;
}

export interface IPrivacyModalState {
    show: boolean;
    permissionId: number | null;
    data: IPrivacyData | null;
}

interface IPrivacyModalProps extends ModalProps {
  state: IPrivacyModalState
}

const PrivacyModal = ({ state, onHide, ...otherProps }: IPrivacyModalProps) => {
  const [t] = useTranslation();
  const dispatch = useAppDispatch();
  const [data, setData] = useState(state.data);

  useEffect(() => {
    if (state.show) {
      setData(state.data);
    }
  }, [state.data, state.show]);

  const formik = useFormik({
    initialValues: {
      receiver: data?.receiver.id || 0,
      weight: data?.weight || EPermissionType.NONE,
      nutrition: data?.nutrition || EPermissionType.NONE,
      exercises: data?.exercises || EPermissionType.NONE,
      stats: data?.stats || EPermissionType.NONE
    },
    onSubmit: (args) => {
      if (!state.permissionId) {
        dispatch(createUserPermission(args)).unwrap().then(() => {
          if (onHide) {
            onHide();
          }
        });
      } else {
        dispatch(modifyUserPermission({
          id: state.permissionId,
          ...args
        })).unwrap().then(() => {
          if (onHide) {
            onHide();
          }
        });
      }
    },
    enableReinitialize: true
  });
  return (
    <Modal
      show={state.show}
      onHide={onHide}
      size="md"
      centered
      {...otherProps}
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('general:add_entry')}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          { !state.permissionId && (
            <Row className='mb-2'>
              <Col sm="12">
                <InputSearchUser
                  onChange={(userData) => {
                    setData({
                      receiver: userData,
                      stats: EPermissionType.NONE,
                      exercises: EPermissionType.NONE,
                      nutrition: EPermissionType.NONE,
                      weight: EPermissionType.NONE
                    });
                  }}
                />
              </Col>
            </Row>
          )}
          { data !== null && (
            <>
              <Row className='mb-2'>
                <Col sm="auto">
                  <span
                    className="avatar avatar-4"
                    style={{
                      backgroundImage:
                        `url(${data.receiver.image})`
                    }}
                  />
                </Col>
                <Col>
                  <Input
                    disabled={true}
                    value={data.receiver?.username}
                    type="text"
                    name="username"
                  >
                    {t('user:username')}
                  </Input>
                </Col>
              </Row>
              <Row className='mb-2'>
                <Col>
                  <Input
                    disabled={true}
                    value={data.receiver?.firstName}
                    type="text"
                    name="firstName"
                  >
                    {t('user:first_name')}
                  </Input>
                </Col>
                <Col>
                  <Input
                    disabled={true}
                    value={data.receiver?.lastName}
                    type="text"
                    name="lastName"
                  >
                    {t('user:last_name')}
                  </Input>
                </Col>
              </Row>
              <Row className='mb-2'>
                <Col>
                  <Form.Label>
                    {t('navbar:stats')}
                  </Form.Label>
                  <Form.Select
                    value={formik.values.stats}
                    onChange={formik.handleChange}
                    name="stats"
                  >
                    <option value={EPermissionType.NONE}>
                      {t('privacy:restricted')}
                    </option>
                    <option value={EPermissionType.READ}>
                      {t('privacy:allowed_to_see')}
                    </option>
                  </Form.Select>
                </Col>
              </Row>
              <Row className='mb-2'>
                <Col>
                  <Form.Label>{t('navbar:nutrition')}</Form.Label>
                  <Form.Select
                    value={formik.values.nutrition}
                    onChange={formik.handleChange}
                    name="nutrition"
                  >
                    <option value={EPermissionType.NONE}>
                      {t('privacy:restricted')}
                    </option>
                    <option value={EPermissionType.READ}>
                      {t('privacy:allowed_to_see')}
                    </option>
                    <option value={EPermissionType.READWRITE}>
                      {t('privacy:allowed_to_see_and_modify')}
                    </option>
                  </Form.Select>
                </Col>
              </Row>
              <Row className='mb-2'>
                <Col>
                  <Form.Label>{t('navbar:weight')}</Form.Label>
                  <Form.Select
                    value={formik.values.weight}
                    onChange={formik.handleChange}
                    name="weight"
                  >
                    <option value={EPermissionType.NONE}>
                      {t('privacy:restricted')}
                    </option>
                    <option value={EPermissionType.READ}>
                      {t('privacy:allowed_to_see')}
                    </option>
                  </Form.Select>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>{t('navbar:exercises')}</Form.Label>
                  <Form.Select
                    value={formik.values.exercises}
                    onChange={formik.handleChange}
                    name="exercises"
                  >
                    <option value={EPermissionType.NONE}>
                      {t('privacy:restricted')}
                    </option>
                    <option value={EPermissionType.READ}>
                      {t('privacy:allowed_to_see')}
                    </option>
                    <option value={EPermissionType.READWRITE}>
                      {t('privacy:allowed_to_see_and_modify')}
                    </option>
                  </Form.Select>
                </Col>
              </Row>
            </>
          )}
        </Modal.Body>
        { data !== null && (
          <Modal.Footer>
            {state.permissionId === null ? (
              <Button
                isLoading={false}
                variant="success"
                type="submit"
              >
                {t('general:add_entry')}
              </Button>
            ) : (
              <>
                <Button
                  isLoading={false}
                  variant="danger"
                  onClick={() => {
                    dispatch(delUserPermission(state.permissionId!))
                      .unwrap()
                      .then(() => {
                        if (onHide) {
                          onHide();
                        }
                      });
                  }}
                >
                  {t('general:del_entry')}
                </Button>
                <Button
                  isLoading={false}
                  variant="warning"
                  type="submit"
                >
                  {t('general:modify_entry')}
                </Button>
              </>
            )}
          </Modal.Footer>
        )}
      </Form>
    </Modal>
  );
};

export default PrivacyModal;
