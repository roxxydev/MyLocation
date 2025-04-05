import { PlaceT } from '@/types/data'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { zustandStorage } from '@/storage/storage'
import _ from 'lodash'
import { filterResults } from '@/utils/data'

interface AppStore {
  places: PlaceT[]
  addPlaces: (newState: PlaceT[]) => void
  getPlaces: (queryText?: string) => PlaceT[] | undefined
}

export const useAppState = create<AppStore>()(
  persist(
    (set, get) => ({
      places: [],
      addPlaces: (newState: PlaceT[]) => {
        set((state: AppStore) => {
          return { places: _.unionBy(state.places, newState, 'name')}
        })
      },
      getPlaces: (queryText?: string) => {
        return filterResults(queryText, get().places);
      },
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
)

export const getAppState = () => {
  return useAppState.getState();
}
