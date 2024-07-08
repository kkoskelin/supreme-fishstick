import { DataTableBase, TableColumn } from '../components/Datatable';
import { DownloadFile } from '../components/DownloadFile';
import { SwimmerFilter } from '../components/SwimmerFilter';
import { secondsToTime } from '../presenter/derivedState';
import { useAppState } from '../presenter/presenter';
import { SwimRecord } from '../types/SwimRecord';
import { EVENT_MAP } from '../data/events';
import React from 'react';

interface DataRow {
  age: number;
  convertedTime: number;
  date: string;
  displayName: string;
  event: number;
  place: number;
  team: string;
  weekNumber: number;
}
const rankColumnConfig = [
  {
    format: (row: DataRow) => secondsToTime(row.convertedTime),
    id: 'convertedTime',
    name: 'Finals Time',
    right: true,
    selector: (row: DataRow) => row.convertedTime,
    sortable: true,
    width: '125px',
  },
  {
    id: 'date',
    name: 'Date',
    selector: (row: DataRow) => row.date,
    format: (row: DataRow) => {
      const date = new Date(`${row['date']}T12:00`);
      return date.toLocaleDateString('en-US', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit'
      }) + ` (Wk ${row.weekNumber})`;
    },
    right: true,
    sortable: true,
    width: '140px',
  },
  // {
  //   id: 'weekNumber',
  //   name: 'Week',
  //   right: true,
  //   selector: (row: DataRow) => row.weekNumber,
  //   sortable: true,
  //   width: '90px',
  // },
  // {
  //   id: 'place',
  //   name: 'Place',
  //   right: true,
  //   selector: (row: DataRow) => row.place,
  //   format: (row: DataRow) => (row.place === 0 ? 'EXH' : row.place),
  //   sortable: true,
  //   width: '90px',
  // },
  {
    format: (row: DataRow) => {
      const event = EVENT_MAP[row.event];
      return `${event.gender} ${event.ageClass} ${event.distance} ${event.stroke}`;
    },
    grow: 2,
    id: 'event',
    maxWidth: '180px',
    name: 'Event',
    selector: (row: DataRow) => row.event,
    sortable: true,
  },
  {
    id: 'displayName',
    name: 'Name',
    format: (row: DataRow) => row.displayName + ` (${row.age})`,
    selector: (row: DataRow) => row.displayName,
    sortable: true,
  },
  // {
  //   id: 'age',
  //   name: 'Age',
  //   right: true,
  //   selector: (row: DataRow) => row.age,
  //   sortable: true,
  //   width: '80px',
  // },
  {
    id: 'team',
    name: 'Team',
    selector: (row: DataRow) => row.team,
    sortable: true,
  },

];

export const SwimmerSearch = () => {
  const { filteredRankings, hasSearchParameters, swimData } = useAppState();
  return (
    <div className="downloadIt">
      <SwimmerFilter />
      {hasSearchParameters && (
        <>
          <hr className="my-4 h-1 bg-gray-400" />
          <p>
            Filtered {filteredRankings.length.toLocaleString()} of {swimData.length.toLocaleString()} records
          </p>
          {/* {filteredRankings.length > 0 &&
            <DownloadFile data={filteredRankings} columns={rankColumnConfig} filename={'swimData.csv'} title="Download search results" />
          } */}
          <DataTableBase
            columns={rankColumnConfig as TableColumn<DataRow>[]}
            paginationPerPage={50}
            data={filteredRankings as DataRow[]}
          />
        </>
      )}
    </div>
  );
};
