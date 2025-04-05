import { MessageAlert } from "@/components/app/Alert";
import { Container } from "@/components/app/Container";
import { Header } from "@/components/app/Header";
import { Box } from "@/components/ui/box";
import { Fab, FabIcon, FabLabel } from "@/components/ui/fab";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Popover, PopoverBody, PopoverContent } from "@/components/ui/popover";
import { Text } from "@/components/ui/text";
import { usePlacesMutations } from "@/services/places/mutations";
import { useAppState } from "@/state/store";
import _ from "lodash";
import { Locate, Search } from "lucide-react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { Linking, useWindowDimensions, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useLocation } from "@/utils/permissions";
import { PlaceT } from "@/types/data";
import { MapMarker } from "@/components/app/MapMarker";

export default function Home() {
  const dimensions = useWindowDimensions();
  const {
    location,
    shouldAskPermissionViaDeviceSettings
  } = useLocation();
  const { onGetPlaces } = usePlacesMutations();
  const { getPlaces } = useAppState();
  const [showResults, setShowResults] = useState(false);
  const [mapRegion, setMapRegion] = useState({
    latitude: location?.coords.latitude || 0,
    longitude: location?.coords.longitude || 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const mapRef = useRef<MapView>(null);
  const [searchText, setSearchText] = useState("");
  const [selectedPlace, setSelectedPlace] = useState<PlaceT | null>(null);

  useEffect(() => {
    if (!_.isEmpty(searchText)) {
      onGetPlaces.mutateAsync(searchText);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [searchText]);

  useEffect(() => {
    if (location) {
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  }, [location]);

  // Point to current location
  const onPressMyLocation = useCallback(() => {
    mapRef.current?.animateToRegion(mapRegion);
  }, [mapRegion]);

  // Point to map to place of selected search result
  const onSearchResultPress = useCallback((item: PlaceT) => {
    setShowResults(false);
    mapRef.current?.animateToRegion({
      latitude: item.geometry.location.lat,
      longitude: item.geometry.location.lng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
    setSelectedPlace(item);
  }, []);

  const onPressSearch = useCallback(() => {
    onGetPlaces.mutateAsync(searchText);
    setShowResults(true);
  }, []);

  return (
    <Container>
      <Header title="Location" />
      <View className="flex-1 flex-col">
        <MessageAlert
          isOpen={shouldAskPermissionViaDeviceSettings}
          title="Location Permission"
          message="We need your permission to access your location. Please allow access in the settings."
          btnPositiveTxt="Go to Settings"
          btnPositiveAction={() => {
            Linking.openSettings();
          }}
        />
        <View className="z-10 position-absolute top-0 left-0 right-0">
          <Popover
            isOpen={showResults}
            placement="bottom left"
            size="md"
            trigger={(triggerProps) => {
              return (
                <Input
                  variant="rounded"
                  isDisabled={false}
                  isInvalid={false}
                  isReadOnly={false}
                  className="h-14 mx-3 mt-2 bg-white"
                  {...triggerProps}
                >
                  <InputField
                    clearTextOnFocus
                    className="text-sm"
                    placeholder="Search Places"
                    onChangeText={_.debounce((text) => {
                      setSearchText(text.length >= 2 ? text : "");
                    }, 250)}
                  />
                  <InputSlot className="pr-3" onPress={onPressSearch}>
                    <InputIcon as={Search} />
                  </InputSlot>
                </Input>
              );
            }}
          >
            <PopoverContent
              className=" bg-gray-50"
              style={{
                width: dimensions.width - 40,
                marginLeft: 20,
                marginRight: 20,
              }}
            >
              <PopoverBody className="bg-gray-50">
                <Box>
                  {getPlaces(searchText)?.map((item, index) => {
                    return (
                      <Text
                        className="text-sm mb-2"
                        key={index}
                        onPress={() => onSearchResultPress(item)}
                      >
                        {item.name}
                      </Text>
                    );
                  })}
                </Box>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </View>

        <MapView
          style={{
            width: "100%",
            flex: 1,
            zIndex: 0,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          initialRegion={{
            latitude: location?.coords.latitude || 0,
            longitude: location?.coords.longitude || 0,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          provider={PROVIDER_GOOGLE}
          toolbarEnabled={false}
          zoomControlEnabled
          zoomTapEnabled
          showsCompass={false}
          showsMyLocationButton={false}
          showsUserLocation={true}
          ref={mapRef}
        >
          {selectedPlace && <MapMarker place={selectedPlace} />}
        </MapView>
      </View>
      <Fab
        size="lg"
        placement="bottom left"
        isHovered={false}
        isDisabled={false}
        isPressed={false}
        onPress={onPressMyLocation}
      >
        <FabIcon as={Locate} />
        <FabLabel>My Location</FabLabel>
      </Fab>
    </Container>
  );
}
