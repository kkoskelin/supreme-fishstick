import { SwimmerFilter } from '../components/SwimmerFilter';
import { secondsToTime } from '../presenter/derivedState';
import { useAppState } from '../presenter/presenter';
import { EVENT_MAP } from '../data/events';
import React from 'react';

export const SearchResultsResponsive = () => {
  const { filteredRankings, hasSearchParameters, swimData } = useAppState();
  return (
    <div className="downloadIt">
      <SwimmerFilter />
      {hasSearchParameters && (
        <>
          <hr className="my-4 h-0.5 bg-gray-200" />
          <p>
            Filtered {filteredRankings.length.toLocaleString()} of {swimData.length.toLocaleString()} records
          </p>
          <hr className="md:hidden my-4 h-0.5 bg-gray-200" />
          <div className="block md:table w-full text-sm md:border-collapse">
            <div className="hidden md:table-header-group md:bg-gray-100">
              <div className="md:table-row">
                <div className="md:table-cell md:text-right md:px-4 md:py-1">Finals Time</div>
                <div className="md:table-cell md:text-right md:px-4">Date</div>
                <div className="md:table-cell md:text-left md:px-4">Event</div>
                <div className="md:table-cell md:text-left md:px-4">Name</div>
                <div className="md:table-cell md:text-left md:px-4">Team</div>
              </div>
            </div>
            <div role="list" className="md:table-row-group divide-y divide-gray-200">
              {filteredRankings.map(record => (
                <div role="listitem" className="mx-0.5 grid auto-cols-auto grid-cols-12 gap-1 md:table-row py-2 md:py-1" key={`${record.date}${record.event}${record.displayName}`}>
                  <div className="md:hidden block order-1 font-semibold col-span-2">Time</div>
                  <div className="md:hidden block order-2 font-semibold text-center col-span-4">Date</div>
                  <div className="md:hidden block order-3 font-semibold text-center col-span-6">Event</div>
                  <div className="md:table-cell md:py-1 md:text-right md:px-4 block col-span-2 order-4">{record.formattedTime}</div>
                  <div className="md:table-cell md:py-1 text-right md:text-right col-span-4 md:px-4 block order-5">{record.formattedDate}</div>
                  <div className="md:table-cell md:py-1 md:px-4 block md:col-span-1 md:text-left text-right col-span-6 order-6">{record.formattedEvent}</div>
                  <div className="md:table-cell md:py-1 md:px-4 text-right col-span-8 md:text-left block order-7">{record.displayName} ({record.age})</div>
                  <div className="md:table-cell md:py-1 md:px-4 col-span-4 block order-8 text-right md:text-left md:col-span-1">{record.team}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
