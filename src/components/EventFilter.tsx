import { Distance, DistanceList } from '../types/Distance';
import { Gender, GenderList } from '../types/Gender';
import { Stroke, StrokeList } from '../types/Stroke';
import { useActions, useAppState } from '../presenter/presenter';
import React from 'react';

export const EventFilter = () => {
  const {
    form: { recordFilter },
  } = useAppState();
  const { clearSearch, submitSearch, updateFilter } = useActions();
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        void submitSearch();
      }}
      className="ml-0.5"
    >
      <fieldset className="mb-2">
        <legend className="inline">Gender:</legend>
        <label className="mr-4">
          <input
            type="radio"
            name="gender"
            checked={recordFilter.gender === undefined}
            defaultValue={undefined}
            onChange={() => {
              void updateFilter({
                ...recordFilter,
                gender: undefined,
              });
            }}
            className="mr-2 -mt-1"
          />
          All
        </label>
        {GenderList.map(gender => (
          <label key={gender} className="mr-4">
            <input
              type="radio"
              name="gender"
              checked={recordFilter.gender == gender}
              defaultValue={gender}
              onChange={e => {
                void updateFilter({
                  ...recordFilter,
                  gender: e.target.value as Gender,
                });
              }}
              className="mr-2 -mt-1"
            />
            {gender}
          </label>
        ))}
      </fieldset>
      <div className="my-4">
        <label>
          Minimum age{' '}
          <input
            type="text"
            data-pattern="^\d{2}$"
            name="ageMin"
            className="h-8 w-12 text-xs rounded invalid:border-red-700 invalid:bg-red-200"
            value={recordFilter.ageMin || ''}
            onChange={e => {
              void updateFilter({
                ...recordFilter,
                ageMin: e.target.value || undefined,
              });
            }}
          />
        </label>
        <label className="ml-4">
          Maximum age{' '}
          <input
            type="text"
            pattern="^\d{2}$"
            name="ageMax"
            className="h-8 w-12 text-xs rounded invalid:border-red-700 invalid:bg-red-200"
            value={recordFilter.ageMax || ''}
            onChange={e => {
              void updateFilter({
                ...recordFilter,
                ageMax: e.target.value || undefined,
              });
            }}
          />
        </label>
      </div>
      <div className="my-4">
        <label>
          Starting Year{' '}
          <input
            type="number"
            min="1900"
            max="2100"
            name="beginYear"
            className="h-8 w-20 text-xs rounded invalid:border-red-500 invalid:bg-red-200"
            value={recordFilter.beginYear || ''}
            onChange={e => {
              void updateFilter({
                ...recordFilter,
                beginYear: e.target.value || undefined,
              });
            }}
          />
        </label>
        <label className="ml-4">
          Ending Year{' '}
          <input
            type="number"
            min="1900"
            max="2100"
            name="endYear"
            className="h-8 w-20 text-xs rounded invalid:border-red-500 invalid:bg-red-200"
            value={recordFilter.endYear || ''}
            onChange={e => {
              void updateFilter({
                ...recordFilter,
                endYear: e.target.value || undefined,
              });
            }}
          />
        </label>
      </div>
      <label>
        Stroke:
        <select
          name="stroke"
          value={recordFilter.stroke || ''}
          className="ml-1 h-8 text-xs rounded"
          onChange={e => {
            void updateFilter({
              ...recordFilter,
              stroke: (e.target.value as Stroke) || undefined,
            });
          }}
        >
          <option value="">(any)</option>
          {StrokeList.map(stroke => (
            <option key={stroke} value={stroke}>
              {stroke}
            </option>
          ))}
        </select>
      </label>
      <label className="ml-4">
        Distance:
        <select
          name="distance"
          value={recordFilter.distance || ''}
          className="ml-1 h-8 text-xs rounded"
          onChange={e => {
            void updateFilter({
              ...recordFilter,
              distance: (e.target.value as Distance) || undefined,
            });
          }}
        >
          <option value="">(any)</option>
          {DistanceList.map(distance => (
            <option key={distance} value={distance}>
              {distance}
            </option>
          ))}
        </select>
      </label>
      <label className="block mt-4">
        Swimmer name:{' '}
        <input
          type="text"
          name="name"
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
      </div>
    </form>
  );
};
