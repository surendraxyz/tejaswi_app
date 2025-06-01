import { configureStore } from "@reduxjs/toolkit";
import { loginSlice } from "../features/login/loginSlice";
import { registerSlice } from "../features/register/registerSlice";
import { stickerGeneratorDroplistSlice } from "../features/utils/stickerGeneratorDroplistSlice";
import { stickerGeneratorSlice } from "../features/sticker-generator/stickerGeneratorSlice";

const store = configureStore({
    reducer: {
        login: loginSlice.reducer,
        register: registerSlice.reducer,
        stickerGeneratorDrop: stickerGeneratorDroplistSlice.reducer,
        stickerGenerator: stickerGeneratorSlice.reducer,

    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),

});

export default store;