import { AgeClass, AgeClassList } from '../types/Age';
import { Distance, DistanceList } from '../types/Distance';
import { Gender, GenderList } from '../types/Gender';
import { Stroke, StrokeList } from '../types/Stroke';
import { TeamNames } from '../types/Team';
import { useActions, useAppState } from '../presenter/presenter';
import React from 'react';

export const SwimmerFilter = () => {
  const {
    form: { recordFilter },
    latestSwimRecordDate,
    rawSwimData,
    swimSeasonYears,
    swimmerNames,
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
      <h1 className="text-md">Search By Swimmer</h1>
      <p className="italic">
        {rawSwimData.length.toLocaleString()} records as of{' '}
        {latestSwimRecordDate}
      </p>
      <div className="my-2 text-sm">
        <label className="block my-2 sm:inline-block md:mr-2">
          Swimmer name:{' '}
          <input
            type="text"
            name="name"
            minLength={3}
            list="swimmerNames"
            placeholder="Last Name, First Name"
            value={recordFilter.swimmerName ?? ''}
            onChange={e => {
              void updateFilter({
                ...recordFilter,
                swimmerName: e.target.value !== '' ? e.target.value : undefined,
              });
            }}
            className="rounded h-8 text-xs w-48"
          />
          <datalist id="swimmerNames">
            {swimmerNames.map(name => (
              <option key={name} value={name}></option>
            ))}
          </datalist>
        </label>
        <div>
          <label className="block my-2 sm:inline-block">
            Distance:
            <select
              name="distance"
              value={recordFilter.distance || ''}
              className="ml-1 h-8 text-xs rounded"
              onChange={e => {
                void updateFilter({
                  ...recordFilter,
                  distance:
                    e.target.value !== ''
                      ? (e.target.value as Distance)
                      : undefined,
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
          <label className="block my-2 sm:inline-block sm:ml-2">
            Stroke:
            <select
              name="stroke"
              value={recordFilter.stroke || ''}
              className="ml-1 h-8 text-xs rounded"
              onChange={e => {
                void updateFilter({
                  ...recordFilter,
                  stroke:
                    e.target.value !== ''
                      ? (e.target.value as Stroke)
                      : undefined,
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
        </div>
        <div>
          <label className="block my-2 sm:inline-block">
            Gender:
            <select
              name="gender"
              className="ml-1 h-8 text-xs rounded"
              value={recordFilter.gender || ''}
              onChange={e => {
                void updateFilter({
                  ...recordFilter,
                  gender:
                    e.target.value !== ''
                      ? (e.target.value as Gender)
                      : undefined,
                });
              }}
            >
              <option value="">(all)</option>
              {GenderList.map(gender => (
                <option key={gender}>{gender}</option>
              ))}
            </select>
          </label>
          <label className="block my-2 sm:inline-block sm:ml-2">
            Age Group:
            <select
              name="age"
              className="ml-1 h-8 text-xs rounded"
              value={recordFilter.ageClass ?? ''}
              onChange={e => {
                void updateFilter({
                  ...recordFilter,
                  ageClass:
                    e.target.value !== ''
                      ? (e.target.value as AgeClass)
                      : undefined,
                });
              }}
            >
              <option value="">(all)</option>
              {AgeClassList.map(age => (
                <option key={age}>{age}</option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label className="block my-2 sm:inline-block">
            Season:
            <select
              name="season"
              className="ml-1 h-8 text-xs rounded"
              value={recordFilter.year ?? ''}
              onChange={e => {
                const value =
                  e.target.value !== '' ? e.target.value : undefined;
                void updateFilter({
                  ...recordFilter,
                  year: value,
                });
              }}
            >
              <option value="">(all)</option>
              {swimSeasonYears.map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>
          <label className="block my-2 sm:inline-block sm:ml-2">
            Team:
            <select
              name="team"
              defaultValue={recordFilter.team ?? ''}
              title={recordFilter.team}
              className="ml-1 h-8 text-xs rounded"
              onChange={e => {
                void updateFilter({
                  ...recordFilter,
                  team: e.target.value !== '' ? e.target.value : undefined,
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
        </div>
        <fieldset className="border-inset border border-slate-300 p-2 w-80">
          <legend className="text-sm">
            Choose no more than one (optional):
          </legend>

          <label className="text-xs block my-1">
            <input
              type="checkbox"
              name="bestEventTimes"
              checked={Boolean(recordFilter.bestTimesPerEvent)}
              onChange={e => {
                void updateFilter({
                  ...recordFilter,
                  bestTimesPerEvent: e.target.checked,
                  bestTimesPerSwimmer: e.target.checked
                    ? false
                    : recordFilter.bestTimesPerSwimmer,
                });
              }}
              className="rounded mr-1.5"
            />
            Show each swimmer’s best event times only
          </label>
          <label className="text-xs block my-1">
            <input
              type="checkbox"
              name="bestSwimmerTimes"
              checked={Boolean(recordFilter.bestTimesPerSwimmer)}
              onChange={e => {
                void updateFilter({
                  ...recordFilter,
                  bestTimesPerEvent: e.target.checked
                    ? false
                    : recordFilter.bestTimesPerEvent,
                  bestTimesPerSwimmer: e.target.checked,
                });
              }}
              className="rounded mr-1.5"
            />
            Show only best time for each event
          </label>
        </fieldset>
      </div>
      <div className="button-container my-4">
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
