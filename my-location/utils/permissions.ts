import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

export const useLocation = () => {
  const [shouldAskPermissionViaDeviceSettings, setShouldAskViaDeviceSettings] = useState(false);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [status, setStatus] = useState<Location.PermissionStatus | null>(null);
  const [canAskAgain, setCanAskAgain] = useState<boolean | null>(null);

  const requestPermission = async () => {
    const response = await Location.requestForegroundPermissionsAsync();
    setStatus(response.status);
    setCanAskAgain(response.canAskAgain);
  }

  const getCurrentLocation = async () => {
    const location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  }

  useEffect(() => {
    (async () => {
      await requestPermission();
    })();
  }, []);

  useEffect(() => {
    if (status === Location.PermissionStatus.UNDETERMINED && canAskAgain) {
      // Get the last known position while checking for permission
      // const lastKnownPos = await Location.getLastKnownPositionAsync();
      // setLocation(lastKnownPos);
      requestPermission();
    } else if (status === Location.PermissionStatus.DENIED || !canAskAgain) {
      setShouldAskViaDeviceSettings(true);
    } else if (status === Location.PermissionStatus.GRANTED) {
      setShouldAskViaDeviceSettings(false);
      getCurrentLocation();
    }
  }, [status, canAskAgain]);

  return {
    location,
    shouldAskPermissionViaDeviceSettings
  }
}
