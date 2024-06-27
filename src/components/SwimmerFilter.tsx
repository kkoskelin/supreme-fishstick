import { Team, TeamNames } from '../types/Team';
import { useActions, useAppState } from '../presenter/presenter';
import React from 'react';

export const SwimmerFilter = () => {
  const {
    form: { recordFilter },
    swimData,
  } = useAppState();
  const { addRecords, clearSearch, submitSearch, updateFilter } = useActions();
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        void submitSearch();
      }}
      className="ml-0.5"
    >
      <h1 className="mb-4">Search By Swimmer ({swimData.length} records)</h1>

      <label className="mr-4">
        Team:
        <select
          name="team"
          value={recordFilter.team || ''}
          className="ml-1 h-8 text-xs rounded"
          required={true}
          onChange={e => {
            void updateFilter({
              ...recordFilter,
              team: (e.target.value as Team) || undefined,
            });
          }}
        >
          <option value="">(any)</option>
          {TeamNames.map(team => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
        </select>
      </label>
      <label className="mt-4">
        Swimmer name:{' '}
        <input
          type="text"
          name="name"
          minLength={3}
          required={true}
          value={recordFilter.swimmerName || ''}
          onChange={e => {
            void updateFilter({
              ...recordFilter,
              swimmerName: e.target.value,
            });
          }}
          className="rounded h-8 text-xs w-40"
        />
      </label>
      <div className="my-4">
        <button
          type="button"
          onClick={() => {
            void clearSearch();
          }}
          className="w-24 rounded border-2 border-gray-400"
        >
          reset
        </button>
        <button
          type="submit"
          className="rounded ml-6 w-36 border-2 border-gray-400 bg-gray-200 active:bg-gray-100"
        >
          search rankings
        </button>
        {/* <button
          className="rounded ml-6 w-36 border-2 border-gray-400 bg-gray-200 active:bg-gray-100"
          onClick={() => void addRecords()}
        >
          Add a Record
        </button> */}
      </div>
    </form>
  );
};
