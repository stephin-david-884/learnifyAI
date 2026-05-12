import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import adminSlice from "./features/admin/adminSlice";
import subscriptionSlice from "./features/subscription/subscriptionSlice";
import userManagementSlice from "./features/admin/userManagementSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        admin: adminSlice,
        userManagement: userManagementSlice,
        subscription: subscriptionSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;