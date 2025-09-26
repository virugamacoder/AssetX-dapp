import { combineReducers, configureStore } from "@reduxjs/toolkit";
import listSTOReducer from "./securityTokens/listSTO";


const rootReducer = combineReducers({
    listSTO: listSTOReducer
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    // devTools: true
});

export default store;