// components/MapView.js
"use client"
import React from 'react';
import { MyComponent } from './GoogleMaps';
import { useAppSelector } from '@/redux/hooks';
import { selectListState } from '@/redux/listView';

const MapView = () => {
    // Google Maps
    const listState = useAppSelector(selectListState)
    return (
        <div className='w-full h-full'>
            <MyComponent />
        </div>
    )
};

export default MapView;