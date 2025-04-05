import { PlaceT } from "@/types/data";
import { Marker } from "react-native-maps";

export const MapMarker = ({ place }: { place: PlaceT }) => {
  console.log(`geometry: ${JSON.stringify(place.geometry)}`);
  return (
    <Marker
      coordinate={{
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng,
      }}
    />
  );
};
