// @redux
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session";
import storage from "redux-persist/lib/storage";

// reducers
import authReducer from "../features/authentication/authSlice";
import userReducer from "../features/user/userSlice";

// ----------------------------------------------------------------------

const rootPersistConfig = {
   key: "root",
   storage: storage,
   blacklist: ["auth", "user"],
};

const authPersistConfig = {
   key: "auth",
   storage: sessionStorage,
};

const userPersistConfig = {
   key: "user",
   storage: sessionStorage,
};

// ----------------------------------------------------------------------

const rootReducer = combineReducers({
   auth: persistReducer(authPersistConfig, authReducer),
   user: persistReducer(userPersistConfig, userReducer),
   //other: otherReducer,   // sin persistencia
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
   reducer: persistedReducer,
   middleware: [],
});

export const persistor = persistStore(store);