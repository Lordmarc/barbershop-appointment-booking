import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"

const position = [14.546129, 121.085877]

const MapLocation = () => {
  return (
    <MapContainer
      center={position}
      zoom={16}
      className="w-full h-64 rounded-lg z-0">
      <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
      <Marker position={position}>
        <Popup>Negro Barbershop</Popup>
      </Marker>
    </MapContainer>
  );
} 

export default MapLocation;