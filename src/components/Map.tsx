import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";

const Map: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  const icon = L.icon({ iconUrl: "/images/marker-icon.png" });
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <MapContainer
      className="z-10"
      center={[30.062521291532576, 31.337142607419214]}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[30.062521291532576, 31.337142607419214]} icon={icon}>
        <Popup>
          <p className="p-2 text-white md:text-[20px]">
            <span className="text-[#47BC8A] font-bold">Digi</span>{" "}
            <span className=" font-bold">Fly</span> Company welcomes you
          </p>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
