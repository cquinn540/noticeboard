import * as React from "react";
import { Box, Card, CardContent } from "@mui/material";
import {
  NORTH_STATION_COMMUTER_ID,
  ONE_MINUTE,
  RouteTypes,
} from "../constants/constants";
import { getCurrentTime } from "../utils/dates-and-times";
import useInterval from "../hooks/useInterval";
import NoticeBoard from "../components/NoticeBoard";

const Container = () => {
  const [date, setDate] = React.useState<Date>(getCurrentTime());

  useInterval(() => {
    setDate(getCurrentTime());
  }, ONE_MINUTE);

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Box m="auto" mt={5}>
        <Card>
          <CardContent>
            <NoticeBoard
              limit={10}
              date={date}
              routeType={RouteTypes.Commuter}
              stationId={NORTH_STATION_COMMUTER_ID}
            />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Container;
