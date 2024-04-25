import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    token: "",
    user: {
        name: "",
        email: "",
        profilePhoto: "",
    }

}
const AuthSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        SET_TOKEN: (state, action) => {
            state.token = action.payload;
        },
        SET_USER: (state, action) => {
            state.user = action.payload;
        }
    }
})

export default AuthSlice.reducer;