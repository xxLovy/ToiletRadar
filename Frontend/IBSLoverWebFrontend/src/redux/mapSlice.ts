import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Map as LeafletMap } from 'leaflet';

interface MapState {
    mapRef: LeafletMap | null;
}

const initialState: MapState = {
    mapRef: null,
};

const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setMapRef(state, action: PayloadAction<LeafletMap | null>) {
            state.mapRef = action.payload;
        },
    },
});

export const { setMapRef } = mapSlice.actions;

export default mapSlice.reducer;
