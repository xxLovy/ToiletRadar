// components/MapView.js
"use client"

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectListState } from '@/redux/listView';
import { selectToiletFromUser, selectToiletFromGoogle } from '@/redux/toilet/slice';
import { selectToilet } from '@/redux/selectedToilet';
import dynamic from 'next/dynamic';

// Dynamically import the map component to avoid SSR issues
const Map = dynamic(() => import('@/components/MapView'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
    ),
});

interface MapViewProps {
    initialToilets?: Toilet[];
    singleToilet?: Toilet;
}

const MapView: React.FC<MapViewProps> = ({ initialToilets = [], singleToilet }) => {
    const listState = useAppSelector(selectListState);
    const userToilets = useAppSelector(selectToiletFromUser);
    const googleToilets = useAppSelector(selectToiletFromGoogle);
    const selectedToilet = useAppSelector(selectToilet);
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

    useEffect(() => {
        // Request user's location when component mounts
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation([position.coords.latitude, position.coords.longitude]);
            },
            (error) => {
                console.error("Error getting location:", error);
            }
        );
    }, []);

    // Calculate center based on priority:
    // 1. Single toilet (for edit page)
    // 2. Selected toilet (from list view)
    // 3. User location
    // 4. Default location (Tokyo)
    const center = singleToilet?.location?.coordinates ?
        [singleToilet.location.coordinates[1], singleToilet.location.coordinates[0]] as [number, number] :
        selectedToilet?.location ?
            [selectedToilet.location.coordinates[1], selectedToilet.location.coordinates[0]] as [number, number] :
            userLocation || [35.6762, 139.6503] as [number, number];

    // Use initialToilets if provided, otherwise use toilets from Redux
    const displayToilets = initialToilets.length > 0 ?
        initialToilets :
        [...userToilets, ...googleToilets];

    return (
        <div className='w-full h-full'>
            <Map
                userToilets={displayToilets}
                googleToilets={[]}
                center={center}
                userLocation={userLocation}
            />
        </div>
    );
};

export default MapView;