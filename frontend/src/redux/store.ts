import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import adminSlice from "./features/admin/adminSlice";
import subscriptionSlice from "./features/subscription/subscriptionSlice";
import userManagementSlice from "./features/admin/userManagementSlice";
import documentSlice from "./features/document/documentSlice";
import adminSubscriptionReducer from "./features/adminSubscription/adminSubscriptionSlice";
import chatReducer from "./features/chat/chatSlice";
import quizReducer from "./features/quiz/quizSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        admin: adminSlice,
        userManagement: userManagementSlice,
        subscription: subscriptionSlice,
        adminSubscription: adminSubscriptionReducer,
        document: documentSlice,
        chat: chatReducer,
        quiz: quizReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;