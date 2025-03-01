import { configureStore } from '@reduxjs/toolkit'
import { pinReducer } from './pin/slice'
import mapReducer from './mapSlice';
import { listViewReducer } from './listView';
import { filterReducer } from './filter';
import { toiletReducer } from './toilet/slice';
import { userReducer } from './user/slice';
import selectedToiletReducer from './selectedToilet';
// import { googlePlacesReducer } from './googleMapsPlaces/slice'
// import { stateManageReducer } from './stateManage/slice'
// import { userPlacesReducer } from './userCreatedPlaces/slice'
// import { filterReducer } from './filter/slice'
// import { userReducer } from './auth/slice'

export const store = configureStore({
    reducer: {
        pin: pinReducer,
        map: mapReducer,
        listView: listViewReducer,
        filter: filterReducer,
        toilet: toiletReducer,
        selectedToilet: selectedToiletReducer,
        // googlePlaces: googlePlacesReducer,
        // stateManage: stateManageReducer,
        // userPlaces: userPlacesReducer,
        // filter: filterReducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),

})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;


