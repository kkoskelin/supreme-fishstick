import { DataTableBase, TableColumn } from '../components/Datatable';
import { DownloadJSONFile } from '../components/DownloadJSONFile';
import { SwimmerFilter } from '../components/SwimmerFilter';
import { secondsToTime } from '../presenter/derivedState';
import { useAppState } from '../presenter/presenter';
import { SwimRecord } from '../types/SwimRecord';
import { EVENT_MAP } from '../data/events';
import React from 'react';

interface DataRow {
  convertedTime: number;
  displayName: string;
  age: number;
  team: string;
  event: number;
  date: string;
  weekNumber: number;
}
const rankColumnConfig: TableColumn<DataRow>[] = [
  {
    id: 'date',
    name: 'Date',
    selector: (row: DataRow) => {
      const date = new Date(`${row['date']}T12:00`);
      return date.toLocaleDateString('en-US');
    },
    sortable: true,
  },
  // {
  //   id: 'weekNumber',
  //   name: 'Week',
  //   selector: (row: DataRow) => row.weekNumber,
  //   sortable: true,
  //   width: '80px',
  // },
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
    format: (row: DataRow) => {
      const event = EVENT_MAP[row.event];
      return `${event.gender} ${event.ageRange} ${event.distance} ${event.stroke}`;
    },
    grow: 2,
    id: 'event',
    name: 'Event',
    selector: (row: DataRow) => row.event,
    sortable: true,
  },
  {
    id: 'displayName',
    minWidth: '160px',
    name: 'Name',
    selector: (row: DataRow) => row.displayName,
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
            Filtered {filteredRankings.length} of {swimData.length}
          </p>
          {filteredRankings.length > 0 &&
            <DownloadJSONFile data={filteredRankings} filename={'swimData.json'} title="Download search results" />
          }
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
