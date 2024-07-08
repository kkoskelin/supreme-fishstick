import React, { useEffect } from 'react';
import { SwimRecord } from '../types/SwimRecord';

interface ColumnInterface {
  name: string;
  format?: (row: unknown) => string;
  selector: (row: unknown) => string;
};

type DownloadProps = {
  columns: ColumnInterface[];
  filename: string;
  data: SwimRecord[];
  title?: string;
};

export const DownloadFile = (props: DownloadProps) => {

  // declare a blob that contains text/csv data
  const blob = new Blob(
    [
      [
        props.columns.map(column => '"' + column.name + '"').join(','),
        ...props.data.map(row =>
          props.columns.map(column =>
            column.format ? '"' + column.format(row) + '"' : '"' + column.selector(row) + '"',
          ).join(','),
        ),
      ].join('\n'),
    ],
    { type: 'text/csv' },
  );
  const blobUrl = URL.createObjectURL(blob);
  useEffect(() => {
    return () => URL.revokeObjectURL(blobUrl);
  });

  return (
    <a
      href={blobUrl}
      title={props.title ?? `Download ${props.filename}`}
      download={props.filename}
    >
      {props.title ?? `Download ${props.filename}`}
    </a>
  );
};
