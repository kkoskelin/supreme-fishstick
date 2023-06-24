import { Distance, DistanceList } from '../types/Distance';
import { Gender, GenderList } from '../types/Gender';
import { Stroke, StrokeList } from '../types/Stroke';
import { useActions, useAppState } from '../presenter/presenter';
import React from 'react';

export const EventFilter = () => {
  const {
    form: { recordFilter },
  } = useAppState();
  const { submitSearch, updateFilter } = useActions();
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        void submitSearch();
      }}
    >
      <fieldset className="mb-2">
        <legend className="inline">Gender:</legend>
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
      </fieldset>
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
          className="rounded h-8 text-xs w-60"
        />
      </label>
      <div className="my-4">
        <button
          type="button"
          onClick={() => {
            void updateFilter({});
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
