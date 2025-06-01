import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAdminConfig = createAsyncThunk(
    "adminConfig/getAdminConfig",
    async (_, thunkAPI) => {
        try {
            const params = {
                config_type: "all",
                action: "list",
                name: ""
            }
            const response = await axios.post(
                `${process.env.REACT_APP_API_KEY}/auth/admin-config/manage/`,
                params, {
                headers: {
                    "Content-Type": "application/json",
                },
            }
            );

            if (response.status === 200) {
                return response;
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response);
        }
    }
);



export const adminConfigSlice = createSlice({
    name: "adminConfig",
    initialState: {
        status: "idle",
        data: null,
        error: null,
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(getAdminConfig.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getAdminConfig.fulfilled, (state, action) => {
                state.status = "success";
                state.data = action.payload.data.data
                state.error = null;
            })
            .addCase(getAdminConfig.rejected, (state, action) => {
                state.status = "error";
                state.error = action.payload.message;
            });
    },
});

export default adminConfigSlice.reducer;