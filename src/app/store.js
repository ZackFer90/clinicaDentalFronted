// @redux
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session";
import storage from "redux-persist/lib/storage";

// reducers
import authReducer from "../features/authentication/authSlice";
import userReducer from "../features/user/userSlice";
import appointmentReducer from "../features/citas/appointmentSlice";

// ----------------------------------------------------------------------

const rootPersistConfig = {
   key: "root",
   storage: storage,
   blacklist: ["auth", "user", "appointment"],
};

const authPersistConfig = {
   key: "auth",
   storage: sessionStorage,
};

const userPersistConfig = {
   key: "user",
   storage: sessionStorage,
};

const appointmentPersistConfig = {
   key: "appointment",
   storage: sessionStorage,
};

// ----------------------------------------------------------------------

const rootReducer = combineReducers({
   auth: persistReducer(authPersistConfig, authReducer),
   user: persistReducer(userPersistConfig, userReducer),
   appointment: persistReducer(appointmentPersistConfig, appointmentReducer),
   //other: otherReducer,   // sin persistencia
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
   reducer: persistedReducer,
   middleware: [],
});

export const persistor = persistStore(store);