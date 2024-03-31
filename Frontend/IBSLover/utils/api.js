// api.js
import axios from 'axios';
import { getDistanceFromLatLonInKm } from '../utils/utils';

const api = 'http://13.238.182.211:80';

export const getInitialLocation = async () => {
    // TODO: get location error
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        console.warn('Location permission denied');
        // TODO: EXIT
        return;
    }

    let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        maximumAge: 10000,
        timeout: 5000,
    });
    if (location) {
        setPin({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        });
        setRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        });
    }
};

export const searchNearbyPlaces = async (pin, setPlaces) => {
    if (!pin || !pin.latitude || !pin.longitude) return;

    try {
        const response = await axios.get(`${api}/search`, {
            params: {
                latitude: pin.latitude,
                longitude: pin.longitude,
            },
        });

        const placesWithDistance = response.data.map(place => {
            const distance = getDistanceFromLatLonInKm(
                pin.latitude,
                pin.longitude,
                place.geometry.location.lat,
                place.geometry.location.lng,
            );
            return { ...place, distance };
        });

        const sortedPlaces = placesWithDistance.sort((a, b) => a.distance - b.distance);
        setPlaces(sortedPlaces);
    } catch (error) {
        console.error(error);
        setPlaces([]);
    }
};

export const searchNearbyPlacesByUser = async (pin, setPlacesByUser) => {
    const searchNearbyPlaces = async () => {
        if (!pin || !pin.latitude || !pin.longitude) return;

        console.log('fetching')
        axios.get(`${api}/search`, {
            params: {
                latitude: pin.latitude,
                longitude: pin.longitude
            }
        }).then((res) => {
            // console.log(`${api}/search?latitude=${pin.latitude}&longitude=${pin.longitude}`)
            const placesWithDistance = res.data.map(place => {
                const distance = getDistanceFromLatLonInKm(
                    pin.latitude,
                    pin.longitude,
                    place.geometry.location.lat,
                    place.geometry.location.lng
                );
                return { ...place, distance };
            });

            // sort according to distance
            const sortedPlaces = placesWithDistance.sort((a, b) => a.distance - b.distance);

            setPlaces(sortedPlaces);
            // console.log(places.slice(3))
            console.log('fetched and sorted by distance');
        }).catch(error => {
            // TODO: error: map key useage exceed customized return
            // TODO: error: IP useage exceed customized return
            // TODO: error: network error
            console.log(error)
            setPlaces([])
        })
    };
};