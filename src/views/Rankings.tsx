import { DataTableBase } from '../components/Datatable';
// import { EVENT_MAP } from '../data/events';
import { EventFilter } from '../components/EventFilter';
import { SwimRecord } from '../types/SwimRecord';
import { secondsToTime } from '../presenter/derivedState';
import { useAppState } from '../presenter/presenter';

import React from 'react';

const rankColumnConfig = [
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
    format: (row: SwimRecord) => secondsToTime(row['convertedTime']),
    name: 'Finals Time',
    right: true,
    selector: (row: SwimRecord) => row['convertedTime'],
    sortable: true,
    width: '125px',
  },
  {
    minWidth: '160px',
    name: 'Name',
    selector: (row: SwimRecord) => row['displayName'],
    sortable: true,
  },
  {
    name: 'Age',
    right: true,
    selector: (row: SwimRecord) => row.age,
    sortable: true,
    width: '80px',
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
  const { filteredRankings, hasSearchParameters, swimData } = useAppState();
  return (
    <div>
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
            data={filteredRankings}
          />
        </>
      )}
    </div>
  );
};
