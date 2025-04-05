import { useIsMutating, useMutation, useQuery } from '@tanstack/react-query';

import { findPlaceFromText, FindPlaceFromTextResponseT } from '@/services/places/request';
import _ from 'lodash';
import { getAppState } from '@/state/store';

const REQUEST_KEY = 'get_places';

export function usePlacesMutations() {
	const { addPlaces } = getAppState();

	const isMutating = useIsMutating({ mutationKey: [REQUEST_KEY] });

	const onGetPlaces = useMutation({
		mutationKey: [REQUEST_KEY],
		mutationFn: (query: string) => findPlaceFromText(query),
		onSuccess: (data: FindPlaceFromTextResponseT) => {
			if (data.status === 'OK') {
				addPlaces(data.candidates);
			} else {
				console.log(`${REQUEST_KEY} status:`, data.status);
			}
		},
		onError: error => {
			console.log(`${REQUEST_KEY} error:`, error);
		},
	});

	return {
		isMutating,
		onGetPlaces,
	};
}
