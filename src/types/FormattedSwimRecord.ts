import { SwimRecord } from './SwimRecord';

export type FormattedSwimRecord = SwimRecord & {
  formattedTime: string;
  formattedDate: string;
  formattedEvent: string;
};
