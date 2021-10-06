import {
  Schedule,
  Route,
  Prediction,
} from '../types';

export interface ApiStationSchedule {
  data: Schedule[];
  included: Array<Route | Prediction | Schedule>;
}

