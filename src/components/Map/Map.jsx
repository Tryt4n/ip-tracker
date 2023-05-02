import { Icon } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const customMarkerIcon = new Icon({
  iconUrl: "/images/icon-location.svg",
  iconSize: [46, 56],
});

export default function Map({ latitude, longitude, isValidIp }) {
  return (
    <>
      {(latitude || longitude) && isValidIp ? (
        <LocationMap
          latitude={latitude}
          longitude={longitude}
        />
      ) : (
        <DefaultMap />
      )}
    </>
  );
}

export function DefaultMap() {
  return (
    <MapContainer
      center={{ lat: 30, lng: 0 }}
      zoom={3}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}

function LocationMap({ latitude, longitude }) {
  const position = [latitude, longitude];

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={position}
        icon={customMarkerIcon}
      >
        <Popup>You are here</Popup>
      </Marker>
    </MapContainer>
  );
}
