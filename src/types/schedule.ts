// generated with app.quicktype.io

import { Item, Relationship } from './common'
import { Route } from './mtba-routes';
import { Prediction } from './predictions';

export interface StationSchedule {
  schedule: Schedule[];
  predictions: Record<string, Prediction>;
  routes: Record<string, Route>;
}

export interface Schedule extends Item {
  attributes: ScheduleAttributes;
  id: string;
  relationships: ScheduleRelationships;
  type: "schedule";
}

export interface ScheduleAttributes {
  arrival_time: Date | null;
  departure_time: Date | null;
  direction_id: number;
  drop_off_type: number;
  pickup_type: number;
  stop_headsign: string | null;
  stop_sequence: number;
  timepoint: boolean;
}

export interface ScheduleRelationships {
  prediction: Relationship;
  route: Relationship;
  stop: Relationship;
  trip: Relationship;
}