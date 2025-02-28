"use client";
import React, { useRef, useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { setMapRef } from '@/redux/mapSlice';
import { RootState } from '@/redux/store';
import { selectCurrentLocation, selectSuccess } from '@/redux/pin/slice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import ToiletCard from '../ToiletCard';
import { IFilter, selectFilterState } from '@/redux/filter';
import { fetchToiletFromGoogle, fetchToiletFromUser } from '@/redux/toilet/operations';
import { selectToiletFromGoogle, selectToiletFromUser } from '@/redux/toilet/slice';
import { calculateDistance } from '@/lib/distance';
import { selectListState } from '@/redux/listView';

export function MyComponent() {
    const mapRef = useRef<google.maps.Map | null>(null);
    const dispatch = useAppDispatch();
    const mapReduxRef = useAppSelector((state: RootState) => state.map.mapRef);
    const pin = useAppSelector(selectCurrentLocation)
    const toiletsFromUser = useAppSelector(selectToiletFromUser)
    const toiletsFromGoogle = useAppSelector(selectToiletFromGoogle)
    let toilets = toiletsFromUser.concat(toiletsFromGoogle)
    const toiletsWithDistance: Toilet[] = toilets.map((item) => {
        const newToilet: Toilet = {
            ...item,
            distance: calculateDistance(pin.latitude, pin.longitude, item.location.coordinates[1], item.location.coordinates[0])
        }
        return newToilet
    })
    toiletsWithDistance.sort((a, b) => a.distance! - b.distance!);
    toilets = toiletsWithDistance
    const [selectedToilet, setSelectedToilet] = useState<Toilet | null>(null);
    const toiletFilter = useAppSelector(selectFilterState)
    const [filteredToilets, setFilteredToilets] = useState<Toilet[]>([]);
    const hasUserLocation = useAppSelector(selectSuccess)
    const showListView = useAppSelector(selectListState)

    const center = hasUserLocation ?
        {
            lat: pin.latitude,
            lng: pin.longitude
        }
        : {
            lat: 37.7749,
            lng: -122.4194
        };

    const [containerStyle, setContainerStyle] = useState({
        width: '100%',
        height: '100%'
    });

    const handleResize = () => {
        // Remove the resize handler as we'll use container-based sizing
    };

    useEffect(() => {
        // Remove the resize event listener as it's no longer needed
    }, []);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string
    });

    const [map, setMap] = React.useState<google.maps.Map | null>(null);
    function handleToiletClick(toilet: Toilet): void {
        setSelectedToilet(toilet);
        mapReduxRef?.panTo({ lat: toilet.location.coordinates[1], lng: toilet.location.coordinates[0] })
    }
    function handleCloseToilet(): void {
        setSelectedToilet(null)
    }

    const onLoad = React.useCallback(function callback(map: google.maps.Map) {
        dispatch(fetchToiletFromUser())
        dispatch(fetchToiletFromGoogle({ latitude: pin.latitude, longitude: pin.longitude }))
        mapRef.current = map;
        dispatch(setMapRef(map));
        setMap(map);
    }, [dispatch]);

    const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
        setMap(null);
        dispatch(setMapRef(null));
    }, [dispatch]);

    useEffect(() => {
        if (mapReduxRef) {
            mapReduxRef.setCenter(center);
            mapReduxRef.setZoom(15);
        }
    }, [mapReduxRef]);

    useEffect(() => {
        if (hasUserLocation) {
            mapReduxRef?.panTo({ lat: pin.latitude, lng: pin.longitude })
            dispatch(fetchToiletFromGoogle({ latitude: pin.latitude, longitude: pin.longitude }))
        } else {
            mapReduxRef?.panTo({ lat: pin.latitude, lng: pin.longitude })
        }
    }, [pin])

    useEffect(() => {
        const applyFilters = (toilets: Toilet[], filter: IFilter) => {
            return toilets.filter(toilet => {
                if (toilet.isFromUser && toilet.features) {
                    return (
                        ((filter.women && (toilet.features.women === "yes" || toilet.features.women === "dontknow") || !filter.women)) &&
                        ((filter.men && (toilet.features.men === "yes" || toilet.features.men === "dontknow")) || !filter.men) &&
                        ((filter.accessible && (toilet.features.accessible === "yes" || toilet.features.accessible === "dontknow")) || !filter.accessible) &&
                        ((filter.children && (toilet.features.children === "yes" || toilet.features.children === "dontknow") || !filter.children)) &&
                        ((filter.free && (toilet.features.free === "yes" || toilet.features.free === "dontknow")) || !filter.free) &&
                        ((filter.genderNeutral && (toilet.features.genderNeutral === "yes" || toilet.features.genderNeutral === "dontknow") || !filter.genderNeutral))
                        // && (toilet.votesCount >= filter.voteCount) &&
                        // (filter.keyword.length === 0 || filter.keyword.some(keyword => toilet.keywords.includes(keyword)))
                    );
                } else {
                    return true
                }
            });
        };

        const filtered = applyFilters(toilets, toiletFilter);
        setFilteredToilets(filtered);
    }, [toiletsFromUser, toiletsFromGoogle, toiletFilter])
    const MarkerGoogle = '/MarkerGoogle.svg';
    const MarkerUser = '/MarkerUser.svg'

    return isLoaded ? (
        <div className="w-full h-full">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={{
                    fullscreenControl: false,
                    streetViewControl: false,
                }}
            >
                { /* Child components, such as markers, info windows, etc. */}
                <>
                    <Marker position={{ lat: pin.latitude, lng: pin.longitude }} />
                    {filteredToilets.map((item: Toilet, index) => (
                        <Marker
                            position={{ lat: item.location.coordinates[1], lng: item.location.coordinates[0] }}
                            key={index}
                            onClick={() => handleToiletClick(item)}
                            icon={item.isFromUser ? MarkerUser : MarkerGoogle}
                        />
                    ))}
                    {selectedToilet ? (
                        <ToiletCard toilet={selectedToilet} onClose={handleCloseToilet} />
                    ) : null}
                </>
            </GoogleMap>
        </div>
    ) : <></>
}

export default React.memo(MyComponent);