import { PlaceT } from "@/types/data";
import _ from "lodash";

export const filterResults = (queryText?: string, results?: PlaceT[]) => {
  if (_.isEmpty(queryText)) {
    return [];
  }

  return results?.filter((result) => {
    return result.name.toLowerCase()
      .includes(queryText ? queryText.toLowerCase() : '');
  });
}
