import React from "react";
import "./App.css";
import {
  NORTH_STATION_COMMUTER_ID,
  ONE_MINUTE,
  RouteTypes,
} from "./constants/constants";
import { getCurrentTime } from "./utils/dates-and-times";
import useInterval from "./hooks/useInterval";
import NoticeBoard from "./components/NoticeBoard";

function App() {
  const [date, setDate] = React.useState<Date>(getCurrentTime());

  useInterval(() => {
    setDate(getCurrentTime());
  }, ONE_MINUTE);

  return (
    <div className="App">
      <NoticeBoard
        date={date}
        routeType={RouteTypes.Commuter}
        stationId={NORTH_STATION_COMMUTER_ID}
      />
    </div>
  );
}

export default App;
