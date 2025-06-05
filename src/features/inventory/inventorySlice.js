import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { refreshToken } from "../../utils/refreshToken";

export const getInventory = createAsyncThunk(
    "inventory/getInventory",
    async (_, thunkAPI) => {
        let token = Cookies.get("access");

        const makeRequest = async (token) => {
            return await axios.get(
                `${process.env.REACT_APP_API_KEY}/auth/inventory/records`,
                {
                    headers: {
                        'ngrok-skip-browser-warning': 'true',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        };
        try {
            const response = await makeRequest(token);
            if (response.status === 200) {
                return response;
            }

        } catch (error) {
            if (error.response) {
                try {
                    token = await refreshToken();
                    const response = await makeRequest(token);

                    if (response.status === 200) {
                        return response;
                    }
                } catch (refresherror) {
                    return thunkAPI.rejectWithValue(refresherror.response);
                }
            } else {
                return thunkAPI.rejectWithValue(error.response);
            }
        }
    }
);

export const inventorySlice = createSlice({
    name: "inventory",
    initialState: {
        status: "idle",
        data: null,
        error: null,
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(getInventory.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getInventory.fulfilled, (state, action) => {
                state.status = "success";
                state.data = action.payload.data
                state.error = null;
            })
            .addCase(getInventory.rejected, (state, action) => {
                state.status = "error";
                state.error = action.payload.message;
            });
    },
});

export default inventorySlice.reducer;