import React from 'react';
import { Card } from 'react-bootstrap';
import BootstrapTable, {
  RowEventHandlerProps,
  ColumnDescription
} from 'react-bootstrap-table-next';
import Button from 'components/button';
import './index.css';

export interface ITableProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  columns: ColumnDescription[];
  rowEvents?: RowEventHandlerProps | undefined;
  addEntryButtonText: string;
  onClickAddEntryButton: React.MouseEventHandler<HTMLElement>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
}

const Table = ({
  data,
  columns,
  rowEvents,
  addEntryButtonText,
  onClickAddEntryButton,
  ...otherProps
}: ITableProps) => (
  <Card>
    <div className="table-responsive">
      <BootstrapTable
        bootstrap4
        classes="card-table table-vcenter text-nowrap datatable"
        hover
        bordered={false}
        keyField="id"
        data={data}
        columns={columns}
        rowEvents={rowEvents}
        {...otherProps}
      />
    </div>
    <Card.Footer className="text-center">
      <Button
        variant="success"
        onClick={onClickAddEntryButton}
        isLoading={false}
      >
        {addEntryButtonText}
      </Button>
    </Card.Footer>
  </Card>
);

export default Table;
