import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

interface IUser {
    _id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    address: string;
    accessToken: string;
}

interface IUserStore {
    user: IUser | null;
}

const initialState: IUserStore = {
    user: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser(state, action: PayloadAction<{ user: IUser }>) {
            if (state.user?._id !== action.payload.user._id) {
                state.user = action.payload.user;
            }
        },
        clearUser(state) {
            state.user = null;
            Cookies.remove('refreshToken');
        },
        updateUser(state, action: PayloadAction<{ fullName: string, phoneNumber: string, address: string, email: string }>) {
            if (state.user) {
                const { fullName, phoneNumber, address, email } = action.payload;
                if (fullName) state.user.fullName = fullName;
                if (phoneNumber) state.user.phoneNumber = phoneNumber;
                if (address) state.user.address = address;
                if (email) state.user.email = email;
            }
        },

        updateAccessToken(state, action: PayloadAction<{ accessToken: string }>) {
            if (state.user) {
                state.user.accessToken = action.payload.accessToken;
            }
        }
    }
});

export const { addUser, clearUser, updateUser, updateAccessToken } = userSlice.actions;
export default userSlice.reducer;