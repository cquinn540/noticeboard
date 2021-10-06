import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { getSchedule } from "../api/schedule";
import { StationSchedule } from "../types/schedule";
import {
  addHours,
  getWeekDay,
  formatDate,
  formatTime,
} from "../utils/dates-and-times";

type NoticeBoardProps = {
  date: Date;
  stationId: string;
  routeType: number;
};

const NoticeBoard = ({ date, stationId, routeType }: NoticeBoardProps) => {
  const [stationSchedule, setStationSchedule] =
    React.useState<StationSchedule | null>(null);

  React.useEffect(() => {
    getSchedule(stationId, date, addHours(date, 3), routeType)
      .then((newSchedule) => {
        setStationSchedule(newSchedule);
      })
      .catch((error) => alert(error));
  }, [date, stationId, routeType]);

  if (!stationSchedule) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{getWeekDay(date)}</TableCell>
              <TableCell>North Station Information</TableCell>
              <TableCell>Current Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{formatDate(date)}</TableCell>
              <TableCell />
              <TableCell>{formatTime(date)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stationSchedule.schedule
              .filter(({ attributes }) => attributes.departure_time)
              .map(({ attributes, relationships }) => {
                const { prediction: predictionRel, route: routeRel } =
                  relationships;
                const prediction = predictionRel.data?.id
                  ? stationSchedule.predictions[predictionRel.data.id]
                  : null;
                const route = routeRel.data?.id
                  ? stationSchedule.routes[routeRel.data.id]
                  : null;

                return (
                  <TableRow>
                    <TableCell>{attributes.departure_time}</TableCell>
                    <TableCell>
                      {
                        route?.attributes.direction_destinations[
                          attributes.direction_id
                        ]
                      }
                    </TableCell>
                    <TableCell>
                      {prediction ? prediction.attributes.status : "On Time"}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default NoticeBoard;
