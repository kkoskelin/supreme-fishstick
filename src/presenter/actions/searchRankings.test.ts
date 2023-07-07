import { overmindApp } from '../presenter';

const { actions, effects, state } = overmindApp;
const mockData = [
  {
    age: 8,
    convertedTime: 18.72,
    date: '2023-06-17',
    displayName: 'Spankowski, Rudy',
    event: 59,
    exhibition: false,
    firstName: 'Ruby',
    lastName: 'Spankowski',
    league: 'Tri-County',
    place: 1,
    team: 'Baraboo',
    time: 17.02,
    weekNumber: 2,
  },
];
describe('searchRankings', () => {
  it('sets swim data', async () => {
    effects.rankingsGateway.searchRankings = jest
      .fn()
      .mockResolvedValue(mockData);
    await actions.searchRankings();
    expect(state.swimData).toEqual(mockData);
  });
});
