import axios from "axios";
import {
  Prediction,
  Route,
  StationSchedule,
} from '../types'
import { ApiStationSchedule } from "./types";
import { getApiTime } from "../utils/dates-and-times";

const makeMap = <T extends { id: string, type: string }>(items: T[], type: string): Record<string, T> => {
  const filtered = items.filter(item => type === item.type);
  const map: Record<string, T> = {};

  for (const item of filtered) {
    map[item.id] = item
  }

  return map;
}

const api = axios.create({
  baseURL: "https://api-v3.mbta.com/",
});

export const getSchedule = async (
  stationId: string,
  minTime: Date,
  maxTime: Date,
  routeType?: number,
): Promise<StationSchedule> => {
  const response = await api.get<ApiStationSchedule>("schedules", {
    params: {
      include: "prediction,route",
      "filter[stop]": stationId,
      "filter[route_type]": routeType?.toString(),
      // "filter[min_time]": getApiTime(minTime),
      // "filter[max_time]": getApiTime(maxTime),
    },
  });

  const { data } = response;

  return {
    schedule: data.data,
    routes: makeMap<Route>(data.included as Route[], 'route'),
    predictions: makeMap<Prediction>(data.included as Prediction[], 'prediction'),
  }
};
