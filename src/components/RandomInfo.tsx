import { useAppState } from '../presenter/presenter';
import React from 'react';

export const RandomInfo = () => {
  const {
    randomInfo: { eye_color, gender, height, mass, name, skin_color },
  } = useAppState();
  return (
    <div>
      <h1>Random Star Wars Character: {name}</h1>
      <ul>
        <li>height: {height}</li>
        <li>mass: {mass}</li>
        <li>skin_color: {skin_color}</li>
        <li>eye_color: {eye_color}</li>
        <li>gender: {gender}</li>
      </ul>
    </div>
  );
};
