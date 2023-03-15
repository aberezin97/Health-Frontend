import React, { useState } from 'react';
import { Card, FormControl } from 'react-bootstrap';
import BootstrapTable, {
  RowEventHandlerProps,
  ColumnDescription
} from 'react-bootstrap-table-next';
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
  PaginationTotalStandalone,
  SizePerPageDropdownStandalone
} from 'react-bootstrap-table2-paginator';
import Button from 'components/button';
import './index.css';
import CardHeader from 'react-bootstrap/esm/CardHeader';

export interface ITableProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  columns: ColumnDescription[];
  rowEvents?: RowEventHandlerProps | undefined;
  addEntryButtonText?: string;
  onClickAddEntryButton?: React.MouseEventHandler<HTMLElement>;
  isHeaderOn?: boolean;
  searchKey?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
}

const Table = ({
  data,
  columns,
  rowEvents,
  addEntryButtonText,
  searchKey,
  onClickAddEntryButton,
  isHeaderOn = false,
  ...otherProps
}: ITableProps) => {
  const [search, setSeach] = useState<string>('');
  return (
    <PaginationProvider
      pagination={paginationFactory({
        custom: true,
        totalSize: searchKey !== undefined
          ? data.filter(
            (entity) => (entity[searchKey] as string).includes(search)
          ).length
          : data.length
      })}
    >
      {
        ({ paginationProps, paginationTableProps }) => (
          <Card>
            { isHeaderOn && (
              <CardHeader className='justify-content-between'>
                <div className='text-muted'>
                  <PaginationTotalStandalone
                    { ...paginationProps }
                  />
                </div>
                <div className='input-icon'>
                  <span className='input-icon-addon'>
                    <i className="fas fa-search" />
                  </span>
                  <FormControl
                    placeholder='Поиск...'
                    value={search}
                    onChange={(e) => setSeach(e.target.value)}
                  />
                </div>
              </CardHeader>
            )}
            <BootstrapTable
              bootstrap4
              wrapperClasses='table-responsive'
              classes="card-table table-vcenter text-nowrap datatable "
              hover
              bordered={false}
              {...paginationTableProps}
              keyField="id"
              data={
                searchKey !== undefined
                  ? data.filter(
                    (entity) => (entity[searchKey] as string).includes(search)
                  )
                  : data
              }
              columns={columns}
              rowEvents={rowEvents}
              {...otherProps}
            />
            <Card.Footer>
              <div className='d-flex justify-content-between'>
                <SizePerPageDropdownStandalone
                  { ...paginationProps }
                />
                <PaginationListStandalone {...paginationProps} />
              </div>
              <div className='d-flex justify-content-center'>
                { addEntryButtonText && (
                  <Button
                    variant="success"
                    onClick={onClickAddEntryButton}
                    isLoading={false}
                  >
                    {addEntryButtonText}
                  </Button>
                )}
              </div>
            </Card.Footer>
          </Card>
        )
      }
    </PaginationProvider>
  );
};

export default Table;
