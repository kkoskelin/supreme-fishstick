import axios from 'axios';

const baseUrl = 'https://swapi.dev/api/people';
const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const getRandomUrl = () => {
  const randomDigit = randomNumber(1, 70);
  const randomUrl = `${baseUrl}/${randomDigit}/`;
  return randomUrl;
};

export const getRandomInfo = async (): Promise<Record<string, string>> => {
  const results = await axios.get(getRandomUrl());
  return { ...results.data } as Record<string, string>;
};
