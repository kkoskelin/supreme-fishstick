import { DataTableBase } from '../components/Datatable';
import { EventFilter } from '../components/EventFilter';
import { SwimRecord } from '../types/SwimRecord';
import { secondsToTime } from '../presenter/derivedState';
import { useAppState } from '../presenter/presenter';
import React from 'react';

const rankColumnConfig = [
  {
    format: (row: SwimRecord) => secondsToTime(row['time']),
    name: 'Time',
    right: true,
    selector: (row: SwimRecord) => row['time'],
    sortable: true,
  },
  {
    format: (row: SwimRecord) => secondsToTime(row['convertedTime']),
    name: 'Converted Time',
    right: true,
    selector: (row: SwimRecord) => row['convertedTime'],
    sortable: true,
  },
  {
    name: 'Name',
    selector: (row: SwimRecord) => row['displayName'],
    sortable: true,
  },
  {
    name: 'Age',
    right: true,
    selector: (row: SwimRecord) => row.age,
    sortable: true,
  },
  { name: 'Team', selector: (row: SwimRecord) => row.team, sortable: true },
  {
    name: 'Date',
    selector: (row: SwimRecord) => {
      const date = new Date(`${row['date']}T12:00`);
      return date.toLocaleDateString('en-US');
    },
    sortable: true,
  },
];

export const Rankings = () => {
  const { filteredRankings } = useAppState();
  return (
    <div>
      <EventFilter />
      <hr className="my-4 h-1 bg-gray-400" />
      <DataTableBase
        columns={rankColumnConfig}
        paginationPerPage={25}
        data={filteredRankings}
      />
    </div>
  );
};
