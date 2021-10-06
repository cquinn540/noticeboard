// generated with app.quicktype.io

import { Item, Relationship } from './common'

export interface Prediction extends Item {
  attributes: PredictionAttributes;
  id: string;
  relationships: PredictionRelationships;
  type: "prediction";
}

export interface PredictionAttributes {
  arrival_time: Date | null;
  departure_time: Date | null;
  direction_id: number;
  schedule_relationship: null;
  status: string;
  stop_sequence: number;
}

export interface PredictionRelationships {
  route: Relationship;
  stop: Relationship;
  trip: Relationship;
  vehicle: Relationship;
}