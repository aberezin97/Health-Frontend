import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Table from 'components/table';
import Page from 'components/page';
import ProductModal from 'components/products-modal';
import { IUserProduct } from 'store/slices/userSlice';
import { useAppSelector, useAppDispatch } from 'store';
import { getUserProducts } from 'controllers/user';
import { numberSortFunc } from 'utils/sorters';
import './index.css';

const ProductsPage = () => {
  const [t] = useTranslation();
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.user);
  const [showProductsModal, setShowProductsModal] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<null | IUserProduct>(null);
  useEffect(() => {
    dispatch(getUserProducts());
  }, [dispatch]);
  return (
    <Page title={t('navbar:my_products')}>
      <Row>
        <Col>
          <Table
            sort={{ dateField: 'time', order: 'desc' }}
            data={products}
            isHeaderOn={true}
            searchKey='name'
            columns={[
              {
                dataField: 'name',
                text: t('nutrition:name'),
                sort: true,
                headerStyle: { width: '100%' },
                style: {
                  textTransform: 'lowercase'
                }
              },
              {
                dataField: 'calories',
                text: t('nutrition:cals'),
                sort: true,
                headerStyle: { width: '80px' },
                style: {
                  textAlign: 'center'
                },
                sortFunc: numberSortFunc
              },
              {
                dataField: 'proteins',
                text: t('nutrition:proteins'),
                sort: true,
                headerStyle: { width: '80px' },
                style: {
                  textAlign: 'center'
                },
                sortFunc: numberSortFunc
              },
              {
                dataField: 'fats',
                text: t('nutrition:fats'),
                sort: true,
                headerStyle: { width: '80px' },
                style: {
                  textAlign: 'center'
                },
                sortFunc: numberSortFunc
              },
              {
                dataField: 'carbohydrates',
                text: t('nutrition:carbs'),
                sort: true,
                headerStyle: { width: '80px' },
                style: {
                  textAlign: 'center'
                },
                sortFunc: numberSortFunc
              }
            ]}
            rowEvents={{
              onClick: (e, row, rowIndex) => {
                setCurrentEntry(row);
                setShowProductsModal(true);
              }
            }}
            onClickAddEntryButton={() => {
              setCurrentEntry(null);
              setShowProductsModal(true);
            }}
            addEntryButtonText={t('user:add_product')}
          />
          <ProductModal
            entry={currentEntry}
            show={showProductsModal}
            onHide={() => setShowProductsModal(false)}
          />
        </Col>
      </Row>
    </Page>
  );
};

export default ProductsPage;
