import { addUser, clearUser, updateAccessToken, updateUser } from "@/redux-setup/slice/userSlice";
import { RootState } from "@/redux-setup/store";
import { useDispatch, useSelector } from "react-redux";


interface IUser {
    _id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    address: string;
    accessToken: string;
}



export const useAuth = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.users.user);

    const login = (userData: IUser) => {
        dispatch(addUser({ user: userData }));
    };
    const updateToken = (accessToken: string) => {
        dispatch(updateAccessToken({ accessToken }));
    };
    const updateUserLocal = ({ fullName, phoneNumber, address, email }: { fullName: string; phoneNumber: string; address: string; email: string }) => {
        dispatch(updateUser({ fullName, phoneNumber, address, email }));
    };

    const logout = () => {
        dispatch(clearUser());
    };

    return { user, login, logout, updateToken, updateUserLocal };
};
