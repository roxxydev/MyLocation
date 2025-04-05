import { Alert } from 'react-native';

import ky from 'ky';

const timeout = 10000;
const retry = {
	limit: 10,
	backoffLimit: 1000,
};


const url = 'https://maps.googleapis.com/maps/api/place'
export const prefixUrl = `${url ? url : ''}/`;

const showAlert = (error: Error) => {
	Alert.alert(
		'Error',
		'Sorry, something went wrong. Please try again.',
	);
};

export const instance = ky.extend({
	prefixUrl,
	headers: {
		Accept: 'application/json',
	},
	retry,
	timeout,
	hooks: {
		beforeError: [
			error => {
				if (error.name === 'TimeoutError') {
					showAlert(error);
				}
				return error;
			},
		],
	},
});
