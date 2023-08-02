import { ArrowDownIcon } from '@heroicons/react/24/outline';
import DataTable, { TableProps } from 'react-data-table-component';
import React from 'react';
const sortIcon = <ArrowDownIcon />;
const selectProps = {
  indeterminate: (isIndeterminate: boolean) => isIndeterminate,
};
export type { TableColumn } from 'react-data-table-component';

export function DataTableBase<T>(props: TableProps<T>): JSX.Element {
  return (
    <DataTable
      pagination
      selectableRowsComponentProps={selectProps}
      sortIcon={sortIcon}
      dense
      {...props}
    />
  );
}
