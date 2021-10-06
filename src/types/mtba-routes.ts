import { Item, Relationship } from './common'

export interface Route extends Item {
  attributes: RouteAttributes;
  id: string;
  links: {
    self: string;
  };
  relationships: RouteRelationships;
  type: "route";
}

export interface RouteAttributes {
  color: string;
  description: string;
  direction_destinations: string[];
  direction_names: string[];
  fare_class: string;
  long_name: string;
  short_name: string;
  sort_order: number;
  text_color: string;
  type: number;
}

interface RouteRelationships {
  line: Relationship;
}