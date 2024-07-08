import { DataTableBase, TableColumn } from '../components/Datatable';
import { DownloadFile } from '../components/DownloadFile';
import { EventFilter } from '../components/EventFilter';
import { SwimRecord } from '../types/SwimRecord';
import { secondsToTime } from '../presenter/derivedState';
import { useAppState } from '../presenter/presenter';
import React from 'react';

interface DataRow {
  convertedTime: number;
  displayName: string;
  age: number;
  team: string;
  date: string;
}
const rankColumnConfig: TableColumn<DataRow>[] = [
  // {
  //   format: (row: SwimRecord) => {
  //     const event = EVENT_MAP[row.event];
  //     return `${event.gender} ${event.ageRange} ${event.distance} ${event.stroke}`;
  //   },
  //   grow: 2,
  //   name: 'Event',
  //   selector: (row: SwimRecord) => row['event'],
  //   sortable: true,
  // },
  {
    format: (row: DataRow) => secondsToTime(row['convertedTime']),
    id: 'convertedTime',
    name: 'Finals Time',
    right: true,
    selector: (row: DataRow) => row['convertedTime'],
    sortable: true,
    width: '125px',
  },
  {
    id: 'displayName',
    minWidth: '160px',
    name: 'Name',
    selector: (row: DataRow) => row['displayName'],
    sortable: true,
  },
  {
    id: 'age',
    name: 'Age',
    right: true,
    selector: (row: DataRow) => row.age,
    sortable: true,
    width: '80px',
  },
  {
    id: 'team',
    name: 'Team',
    selector: (row: DataRow) => row.team,
    sortable: true,
  },
  {
    id: 'date',
    name: 'Date',
    selector: (row: DataRow) => {
      const date = new Date(`${row['date']}T12:00`);
      return date.toLocaleDateString('en-US');
    },
    sortable: true,
  },
];

export const Rankings = () => {
  const { filteredRankings, hasSearchParameters, swimData } = useAppState();
  console.log({ filteredRankings });
  return (
    <div className="downloadIt">
      <DownloadFile data={swimData} filename={'swimData.json'} />
      <EventFilter />
      {hasSearchParameters && (
        <>
          <hr className="my-4 h-1 bg-gray-400" />
          <p>
            Filtered {filteredRankings.length} of {swimData.length}
          </p>
          <DataTableBase
            columns={rankColumnConfig}
            paginationPerPage={10}
            data={filteredRankings as DataRow[]}
          />
        </>
      )}
    </div>
  );
};
