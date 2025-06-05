import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { refreshToken } from "../../utils/refreshToken";


export const createDispatchData = createAsyncThunk(
    "dispatch/createDispatchData",
    async (data, thunkAPI) => {
        let token = Cookies.get("access");

        const makeRequest = async (token) => {
            return await axios.post(
                `${process.env.REACT_APP_API_KEY}/auth/dispatch-manager/`,
                data, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
            );
        };
        try {
            const response = await makeRequest(token);
            console.log(response);

            if (response.status === 200) {
                return response;
            }

        } catch (error) {
            if (error.response && error.response.status === 403) {
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


export const getDispatchData = createAsyncThunk(
    "dispatch/getDispatchData",
    async (_, thunkAPI) => {
        let token = Cookies.get("access");

        const makeRequest = async (token) => {
            return await axios.get(
                `${process.env.REACT_APP_API_KEY}/auth/scanned-products/`,
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
            if (error.response && error.response.status === 403) {
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

export const getDispatchQrData = createAsyncThunk(
    "dispatch/getDispatchQrData",
    async (product_Id, thunkAPI) => {
        let token = Cookies.get("access");

        const makeRequest = async (token) => {
            return await axios.get(
                `${process.env.REACT_APP_API_KEY}/auth/scan-qr-code/?product_number=${product_Id}`,
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
            if (error.response && error.response.status === 403) {
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

export const dispatchSlice = createSlice({
    name: "dispatch",
    initialState: {
        status: "idle",
        data: null,
        error: null,
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(getDispatchData.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getDispatchData.fulfilled, (state, action) => {
                state.status = "success";
                state.data = action.payload.data
                state.error = null;
            })
            .addCase(getDispatchData.rejected, (state, action) => {
                state.status = "error";
                state.error = action.payload.message;
            });
    },
});

export default dispatchSlice.reducer;