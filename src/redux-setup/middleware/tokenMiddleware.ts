import { Middleware } from '@reduxjs/toolkit';
import { updateAccessToken } from '../slice/userSlice';
import { instance } from '../service/baseQuery';


const tokenMiddleware: Middleware = store => next => (action: any) => {
    if (action.type === updateAccessToken.type) {
        const token = action.payload.accessToken;
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    return next(action);
};

export default tokenMiddleware;