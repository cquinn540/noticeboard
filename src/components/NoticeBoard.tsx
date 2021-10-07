import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { getSchedule } from "../api/schedule";
import { StationSchedule } from "../types/schedule";
import {
  getWeekDay,
  formatDate,
  formatTime,
  parseIsoString,
} from "../utils/dates-and-times";

type NoticeBoardProps = {
  date: Date;
  stationId: string;
  routeType: number;
  limit: number;
};

const NoticeBoard = ({
  date,
  limit,
  stationId,
  routeType,
}: NoticeBoardProps) => {
  const [stationSchedule, setStationSchedule] =
    React.useState<StationSchedule | null>(null);

  React.useEffect(() => {
    getSchedule(stationId, routeType, limit)
      .then((newSchedule) => {
        setStationSchedule(newSchedule);
      })
      .catch((error) => alert(error));
  }, [stationId, routeType, limit]);

  if (!stationSchedule) {
    return <div>Loading...</div>;
  }

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h4">{getWeekDay(date)}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5" color="text.secondary">
                  North Station Information
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h4">Current Time</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography variant="h5" color="secondary">
                  {formatDate(date)}
                </Typography>
              </TableCell>
              <TableCell />
              <TableCell>
                <Typography variant="h5" color="secondary">
                  {formatTime(date)}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h5" color="text.secondary">
                  Time
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5" color="text.secondary">
                  Destination
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5" color="text.secondary">
                  Status
                </Typography>
              </TableCell>
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
                    <TableCell>
                      <Typography variant="h6">
                        {formatTime(parseIsoString(attributes.departure_time!))}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">
                        {
                          route?.attributes.direction_destinations[
                            attributes.direction_id
                          ]
                        }
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">
                        {prediction ? prediction.attributes.status : "On Time"}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            <TableCell colSpan={3} align="center">
              <Typography variant="h5" color="secondary">
                Arrivals
              </Typography>
            </TableCell>
            {stationSchedule.schedule
              .filter(({ attributes }) => attributes.arrival_time)
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
                    <TableCell>
                      <Typography variant="h6">
                        {formatTime(parseIsoString(attributes.arrival_time!))}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">
                        {
                          route?.attributes.direction_destinations[
                            attributes.direction_id
                          ]
                        }
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">
                        {prediction ? prediction.attributes.status : "On Time"}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default NoticeBoard;
