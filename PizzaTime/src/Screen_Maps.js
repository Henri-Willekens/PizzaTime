import React, { useState, useRef, useEffect  } from "react";
import MapView, { Marker, Polyline } from 'react-native-maps';
import { StyleSheet, Text, Button, Platform, View, Dimensions, Image, StatusBar, FlatList, SafeAreaView, Pressable  } from 'react-native';
import * as Location from 'expo-location';


export default function ScreenA({ navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {

    //console.log(location.coords.longitude)

    
  }


  const mapRef = useRef(null);
  const pizzaRegion = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
  const [region, setRegion] = useState({
    latitude: 51.5079145,
    longitude: -0.0899163,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const chibaRegion = {
    latitude: 51.922035,
    longitude: 4.490173,
     latitudeDelta: 0.01,
     longitudeDelta: 0.01,
  };
  const pizza = () => {
    //complete this animation in 3 seconds
    mapRef.current.animateToRegion(pizzaRegion, 3 * 1000);
  };
  const onPressHandler = () => {
    navigation.navigate('Screen_B');
}
  return (
    <View style={styles.container}>
      <MapView style={styles.map} 
          ref={mapRef}
          onRegionChangeComplete={(region) => setRegion(region)}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }}
        >
        <Marker
          coordinate={{
            latitude: 51.919464,
            longitude: 4.487576,
          }}
          title={"Very Italian Pizza"}
          description={"Pizza"}
          >
            <Image source={require(".././img/ItalianPizza.jpg")} style={{height: 35, width:35 }} />
        </Marker>
          
        
        <Marker
          coordinate={{
            latitude: 51.922035,
            longitude: 4.490173,
          }}
          title={"O'Pazzo"}
          description={"Pizza"}
          >
            <Image source={require('.././img/Opazzo.jpg')} style={{height: 35, width:35 }} />
        </Marker>

        <Polyline
        coordinates={[pizzaRegion, chibaRegion]} //specify our coordinates
        strokeColor={"#000"}
        strokeWidth={3}
        lineDashPattern={[1]}
      />
        </MapView>
        <Button onPress={() => pizza()} title="Go to Italian Pizza" />
            <Pressable
                onPress={onPressHandler}
            >
                <Text style={styles.text}>
                    Go to Screen B
          </Text>
            </Pressable>
    </View>
    
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    margin: 10,
}
});
