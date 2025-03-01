"use client"

import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectToilet, setSelectedToilet } from '@/redux/selectedToilet';
import { selectListState, setListStateTrue } from '@/redux/listView';
import { useRouter } from 'next/navigation';
import { setMapRef } from '@/redux/mapSlice';

// Create custom icons using SVG
const createIcon = (color: string) => {
    return L.divIcon({
        html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" class="w-8 h-8">
            <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
        </svg>`,
        className: 'marker-icon',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });
};

const toiletIcon = createIcon('#ef4444'); // Red color for toilets
const selectedToiletIcon = createIcon('#22c55e'); // Green color for selected toilet
const userLocationIcon = createIcon('#3b82f6'); // Blue color for user location

interface MapViewProps {
    userToilets: Toilet[];
    googleToilets: Toilet[];
    center: [number, number];
    userLocation: [number, number] | null;
}

// Component to handle map center updates
function MapController({ center }: { center: [number, number] }) {
    const map = useMap();

    useEffect(() => {
        map.flyTo(center, 17, {
            duration: 1.5,
            easeLinearity: 0.25
        });
    }, [center, map]);

    return null;
}

// Add this component before MapView component
function MapEvents() {
    const dispatch = useAppDispatch();
    const map = useMap();

    useEffect(() => {
        dispatch(setMapRef(map));
        return () => {
            dispatch(setMapRef(null));
        };
    }, [dispatch, map]);

    return null;
}

const MapView: React.FC<MapViewProps> = ({ userToilets, googleToilets, center, userLocation }) => {
    const dispatch = useAppDispatch();
    const selectedToilet = useAppSelector(selectToilet);
    const showListView = useAppSelector(selectListState);

    const handleMarkerClick = (toilet: Toilet) => {
        dispatch(setSelectedToilet(toilet));
        dispatch(setListStateTrue());
    };

    const getToiletIcon = (toilet: Toilet) => {
        return selectedToilet && selectedToilet._id === toilet._id ? selectedToiletIcon : toiletIcon;
    };

    return (
        <div className='w-full h-full'>
            <MapContainer
                center={center}
                zoom={15}
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapController center={center} />
                <MapEvents />

                {/* User's location marker */}
                {userLocation && (
                    <Marker
                        position={userLocation}
                        icon={userLocationIcon}
                    >
                        <Popup>You are here</Popup>
                    </Marker>
                )}

                {/* Toilet markers */}
                {[...userToilets, ...googleToilets].map((toilet) => (
                    <Marker
                        key={toilet._id}
                        position={[toilet.location.coordinates[1], toilet.location.coordinates[0]]}
                        icon={getToiletIcon(toilet)}
                        eventHandlers={{
                            click: () => handleMarkerClick(toilet),
                        }}
                    >
                        <Popup>
                            <div className="text-sm">
                                <h3 className="font-semibold">{toilet.name}</h3>
                                <p>{toilet.description || 'No description available'}</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MapView; 