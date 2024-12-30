import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import userReducer from "@/redux-setup/slice/userSlice";
import { cartService } from "./service/api/orderService";
import { userService } from "./service/api/userService";
import { authService } from "./service/api/authService";
import { productService } from "./service/api/productService";


const persistConfigUser = {
    key: "user",
    storage,
}

const persistUserReducer = persistReducer(persistConfigUser, userReducer);

export const store = configureStore({
    reducer: {
        [cartService.reducerPath]: cartService.reducer,
        [userService.reducerPath]: userService.reducer,
        [authService.reducerPath]: authService.reducer,
        [productService.reducerPath]: productService.reducer,
        users: persistUserReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
            .concat(
                cartService.middleware,
                userService.middleware,
                authService.middleware,
                productService.middleware,
            )
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;