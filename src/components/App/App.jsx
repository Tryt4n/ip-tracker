import { useState, useEffect } from "react";
import axios from "axios";

import IpInput from "../IpInput/IpInput";
import DataContainer from "../DataContainer/DataContainer";
import Map from "../Map/Map";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  // const [isLoading, setIsLoading] = useState(false);
  const [ip, setIp] = useState("");
  const [location, setLocation] = useState("");
  const [timezone, setTimezone] = useState("");
  const [isp, setIsp] = useState("");
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [isValidIp, setIsValidIp] = useState(true);
  // const [latitude, setLatitude] = useState(30);
  // const [longitude, setLongitude] = useState(1);

  // const API_KEY = import.meta.env.VITE_API_KEY;
  //! npm run dev BUILD URL
  // const API_URL = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${ip}`;
  //! LOCALHOST URL
  // const bypass_cors_url = "https://cors-anywhere.herokuapp.com/";
  // const API_URL = `${bypass_cors_url}https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${ip}`;
  const API_URL = `https://ipapi.co/${ip}/json/`;

  const controller = new AbortController();
  useEffect(() => {
    if (ip && ip !== "") {
      setIsLoading(true);

      // fetch(testing_API)
      //   .then(function (response) {
      //     response.json().then((jsonData) => {
      //       console.log(jsonData);
      //     });
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });

      axios
        // .get(API_URL, { signal: controller.signal })
        .get(API_URL, { signal: controller.signal })
        .then((res) => {
          const data = res.data;
          // setLocation(
          //   `${res.data.location.city}, ${res.data.location.region} ${res.data.location.postalCode}`
          // );
          // setTimezone(`UTC ${res.data.location.timezone}`);
          // setIsp(res.data.isp);
          // setLatitude(res.data.location.lat);
          // setLongitude(res.data.location.lng);
          console.log(res);
          setLocation(`${data.city}, ${data.region} ${data.postal}`);
          setTimezone(`UTC ${data.utc_offset}`);
          setIsp(data.org);
          setLatitude(data.latitude);
          setLongitude(data.longitude);
        })
        .catch((error) => {
          if (axios.isCancel(error)) {
            console.log("Request canceled", error.message);
          } else {
            console.log(error);
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
        />
        {ip && ip !== "" && (
          <DataContainer
            isLoading={isLoading}
            ip={ip}
            location={location}
            timezone={timezone}
            isp={isp}
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
        />
      )}
    </main>
  );
}
