import { createAsyncThunk } from '@reduxjs/toolkit';

interface Position {
    coords: {
        latitude: number;
        longitude: number;
    };
}

interface PositionError {
    message: string;
}

const getCurrentLocation = (): Promise<Position> => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by your browser'));
        } else {
            navigator.geolocation.getCurrentPosition(
                (position: Position) => resolve(position),
                (error: PositionError) => reject(error),
                {
                    enableHighAccuracy: true,  // 请求高精度位置
                    timeout: 10000,            // 10秒超时
                    maximumAge: 0              // 不使用缓存的位置
                }
            );
        }
    });
};

export const fetchCurrentLocation = createAsyncThunk(
    'pin/fetchCurrentLocation',
    async (_, thunkAPI) => {
        try {
            const position: Position = await getCurrentLocation();
            const { latitude, longitude } = position.coords;
            return { latitude, longitude };
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);