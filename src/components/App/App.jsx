import { useState, useEffect } from "react";
import axios from "axios";

import IpInput from "../IpInput/IpInput";
import DataContainer from "../DataContainer/DataContainer";
import Map from "../Map/Map";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [ip, setIp] = useState("");
  const [location, setLocation] = useState("");
  const [timezone, setTimezone] = useState("");
  const [isp, setIsp] = useState("");
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [isValidIp, setIsValidIp] = useState(true);

  const API_URL = `https://ipapi.co/${ip}/json/`;

  const controller = new AbortController();
  useEffect(() => {
    if (ip && ip !== "") {
      setIsLoading(true);
      axios
        .get(API_URL, { signal: controller.signal })
        .then((res) => {
          const data = res.data;
          const timezoneOffset = data.utc_offset;
          const sign = timezoneOffset.slice(0, 1);
          const hours = timezoneOffset.slice(1, 3);
          const minutes = timezoneOffset.slice(3, 5);
          const formattedTimezone = `UTC${sign}${hours}:${minutes}`;
          setLocation(`${data.city}, ${data.region} ${data.postal}`);
          setTimezone(formattedTimezone);
          setIsp(data.org);
          setLatitude(data.latitude);
          setLongitude(data.longitude);
        })
        .catch((error) => {
          if (axios.isCancel(error)) {
            console.log("Request canceled", error.message);
          } else {
            console.error("IP address format is incorrect");
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
      return () => controller.abort();
    }
  }, [ip]);

  return (
    <main className="container">
      <div className="main-content">
        <h1 className="main-content__header">IP Address Tracker</h1>
        <IpInput
          setIp={setIp}
          isValidIp={isValidIp}
          setIsValidIp={setIsValidIp}
        />
        {ip && ip !== "" && (
          <DataContainer
            isLoading={isLoading}
            ip={ip}
            location={location}
            timezone={timezone}
            isp={isp}
            isValidIp={isValidIp}
          />
        )}
      </div>

      {isLoading && latitude && longitude ? (
        <div className="loading-container">
          <span className="loader"></span>
        </div>
      ) : (
        <Map
          latitude={latitude}
          longitude={longitude}
          isValidIp={isValidIp}
        />
      )}
    </main>
  );
}
