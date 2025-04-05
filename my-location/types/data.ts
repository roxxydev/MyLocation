export type PlaceT = {
  formatted_address: string,
  name: string,
  type: string,
  geometry: {
    location: {
      lat: number,
      lng: number,
    }
  }
}
