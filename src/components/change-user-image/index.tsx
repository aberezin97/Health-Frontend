import React, { useState } from 'react';
import { Card, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'store';
import { changeUserImage } from 'controllers/user';
import { EUserTypeError, clearUserError } from 'store/slices/userSlice';
import Button from 'components/button';
import Input from 'components/input';
import './index.css';

export interface IChangeUserImage {
  initialValues: {
    image: string | null;
  } | null;
}

const ChangeUserImage = ({ initialValues }: IChangeUserImage) => {
  const [t] = useTranslation('user');
  const { error, loading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [imageUrl, setImageUrl] = useState<
    null | string | ArrayBuffer | undefined
  >(initialValues !== null ? initialValues.image : null);
  const [image, setImage] = useState<null | FormData>(null);
  const changeUserImageButtonHandler = () => {
    if (image !== null) {
      dispatch(changeUserImage(image));
    }
  };
  return (
    <Card>
      <Card.Header as="h4">{t('change_user_image')}</Card.Header>
      <Card.Body>
        {error !== null && error.type === EUserTypeError.CHANGE_IMAGE ? (
          <Alert
            variant="danger"
            onClose={() => dispatch(clearUserError())}
            dismissible
          >
            {error.explanation}
          </Alert>
        ) : null}
        <div className="text-center">
          <span
            className="avatar avatar-xl mb-3"
            style={{ backgroundImage: `url(${imageUrl})` }}
          ></span>
        </div>
        <Input
          type="file"
          name="image"
          onChange={(changeEvent) => {
            if (changeEvent.target.files !== null) {
              const formData = new FormData();
              formData.append('image', changeEvent.target.files[0]);
              setImage(formData);
              const fReader = new FileReader();
              fReader.readAsDataURL(changeEvent.target.files[0]);
              fReader.onloadend = (progressEvent) => {
                if (progressEvent.target !== null) {
                  setImageUrl(progressEvent.target.result);
                }
              };
            }
          }}
        >
          {t('pick_image')}
        </Input>
      </Card.Body>
      <Card.Footer>
        <Button
          className="w-100"
          variant="success"
          isLoading={loading}
          onClick={changeUserImageButtonHandler}
        >
          {t('change_user_image')}
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default ChangeUserImage;
