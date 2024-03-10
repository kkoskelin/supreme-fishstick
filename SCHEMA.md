# Search for a Swimmer, filter on attributes

First, we want to search for a particular swimmer by their NAME (a substring) and TEAM affiliation.
Additionally, we would like the ability to optionally restrict the year of the records.
Other filters would be by stroke or by event (each of which has a specific gender, stroke, and distance).

Second, we would like to be able to search for swimmer rankings for a particular event.

- Choose an EVENT (only required criteria); this implicitly requires choice of gender, stroke, and distance.

```typescript
const swimmer: Swimmer = {
  id: 'MALONE_KENNY', // imagined; the PK? "swimmer|MALONE_KENNY"
  displayName: 'Kenny Malone',
  firstName: 'Kenny',
  lastName: 'Malone',
  team: 'Planet Money',
}

const event: Event = {
  eventNumber: 14, // PK: these are already determined for each and every specific combination of gender, stroke, and distance. "event|14"
  eventFullName: 'BOYS 50M FREESTYLE'
  stroke: 'FREESTYLE',
  distance: '50M',
  gender: 'BOYS',
}

type Stroke = 'FREESTYLE' | 'BACKSTROKE' | 'BUTTERFLY' | 'BREAST';
type Distance = '25M' | '50M' | '100M' | '200M';
type Gender = 'BOYS' | 'GIRLS';

type EventRecord = {
  id, // PK, a uuid. "record|uuid"
  swimmerId, // FK
  eventId, // FK
  age: 11,
  convertedTime: 200,
  eventDate: '2023-06-02',
  exhibition: false,
  place: undefined,
  time: 200,
  weekNumber: 2,
}

const mockSwimRecord: SwimRecord = {
  age: 11,
  convertedTime: 200,
  date: '2023-06-02',
  displayName: 'Kenny Malone',
  event: 13,
  exhibition: false,
  firstName: 'Kenny',
  lastName: 'Malone',
  league: 'NPR',
  place: undefined,
  team: 'Planet Money',
  time: 200,
  weekNumber: 2,
};
```
