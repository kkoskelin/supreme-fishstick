import { Team, TeamNames } from '../types/Team';
import { Stroke, StrokeList } from '../types/Stroke';
import { Distance, DistanceList } from '../types/Distance';
import { useActions, useAppState } from '../presenter/presenter';
import { Gender, GenderList } from '../types/Gender';
import { AgeClass, AgeClassList } from '../types/Age';
import React from 'react';

export const SwimmerFilter = () => {
  const {
    form: { recordFilter },
    latestSwimRecordDate,
    swimData,
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
      <h1 className="">Search By Swimmer ({swimData.length.toLocaleString()} records) as of {latestSwimRecordDate}</h1>
      <div className="my-4">
        <label className="mr-2">
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
                swimmerName: e.target.value,
              });
            }}
            className="rounded h-8 text-xs w-48"
          />
          <datalist id="swimmerNames">
            {swimmerNames
              .map((name, i) => (
                <option key={name} value={name}></option>
              ))}
          </datalist>
        </label>
      </div>
      <div className="my-4">
        <label className="mr-2">
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
        <label className="m-2">
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
      </div>
      <div className="my-4">
        <label className="mr-2">
          Gender:
          <select
            name="gender" className="ml-1 h-8 text-xs rounded"
            value={recordFilter.gender || ''}
            onChange={e => {
              void updateFilter({
                ...recordFilter,
                gender: e.target.value as Gender,
              })
            }}>
            <option>(all)</option>
            {GenderList.map(gender =>
              <option key={gender}>{gender}</option>
            )}
          </select>
        </label>
        <label className="m-2">
          Age Group:
          <select
            name="age" className="ml-1 h-8 text-xs rounded"
            value={recordFilter.ageClass || ''}
            onChange={e => {
              void updateFilter({
                ...recordFilter,
                ageClass: e.target.value as AgeClass,
              })
            }}>
            <option>(all)</option>
            {AgeClassList.map(age =>
              <option key={age}>{age}</option>
            )}
          </select>
        </label>
      </div>
      <div className="my-4">
        <label className="mr-2">
          Season:
          <select
            name="season" className="ml-1 h-8 text-xs rounded"
            value={recordFilter.beginYear || '2024'}
            onChange={e => {
              const value = e.target.value !== '' ? e.target.value : undefined;
              void updateFilter({
                ...recordFilter,
                endYear: value,
                beginYear: value,
              })
            }}>
            <option value="">(all)</option>
            <option>2024</option>
            <option>2023</option>
            <option>2022</option>
            <option>2021</option>
            <option>2019</option>
          </select>
        </label>
        <label className="m-2">
          Team:
          <select
            name="team"
            defaultValue={recordFilter.team || ''}
            title={recordFilter.team}
            className="ml-1 h-8 text-xs rounded"
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
      </div>
      <div>
        <label className="mt-4 text-xs block">
          <input
            type="checkbox"
            name="bestTimesOnly"
            checked={Boolean(recordFilter.bestTimesOnly)}
            onChange={e => {
              void updateFilter({
                ...recordFilter,
                bestTimesOnly: e.target.checked,
              });
            }}
            className="rounded mr-1.5"
          />
          Show only best times per event
        </label>
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
