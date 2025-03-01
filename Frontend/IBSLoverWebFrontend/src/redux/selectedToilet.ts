import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface SelectedToiletState {
    toilet: Toilet | null;
}

const initialState: SelectedToiletState = {
    toilet: null,
};

const selectedToiletSlice = createSlice({
    name: 'selectedToilet',
    initialState,
    reducers: {
        setSelectedToilet: (state, action: PayloadAction<Toilet | null>) => {
            state.toilet = action.payload;
        },
    },
});

export const { setSelectedToilet } = selectedToiletSlice.actions;
export const selectToilet = (state: RootState) => state.selectedToilet.toilet;
export default selectedToiletSlice.reducer; 