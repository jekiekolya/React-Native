import MapView, { Marker } from "react-native-maps";

// Styles
import styles from "./MapScreen.Styled";

export default function MapScreen({ route }) {
  const { location, locationData } = route.params;
  return (
    <MapView
      style={styles.mapContainer}
      initialRegion={{
        ...locationData,
        latitudeDelta: 0.00522,
        longitudeDelta: 0.00521,
      }}
    >
      <Marker coordinate={{ ...locationData }} title={location} />
    </MapView>
  );
}
