import { instance } from '@/services/instance';
import { PlaceT } from '@/types/data';
import qs from 'qs';

// TODO: Put in .env
export const MAPS_API_KEY = 'AIzaSyBmgdIiPyubG-qOS3QJ2c0jugoJpugeLaA'

export type FindPlaceFromTextResponseT = {
	candidates: PlaceT[],
	status: string,
}

export const findPlaceFromText = async (query: string	) => {
	const urlQueryParams = qs.stringify({
		key: MAPS_API_KEY,
		fields: `formatted_address,name,geometry`,
		types: 'establishment,country,street_address',
		inputtype: 'textquery',
		input: query,
	})
	const response: FindPlaceFromTextResponseT = await instance
		.post(`findplacefromtext/json?${urlQueryParams}`)
		.json();
	return response;
};

