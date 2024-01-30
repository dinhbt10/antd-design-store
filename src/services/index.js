import instance from '../utils/axios-customize';

export const postRegister = (data) => {
    return instance.post('api/v1/user/register', data);
};

export const postLogin = (data) => {
    return instance.post('api/v1/auth/login', data);
};

export const callFetchAccount = () => {
    return instance.get('api/v1/auth/account');
};

export const doLogout = () => {
    return instance.post('api/v1/auth/logout');
};

export const getAllUsers = (query) => {
    return instance.get(`api/v1/user?${query}`);
};

export const removeUser = (id) => {
    return instance.delete(`api/v1/user/${id}`);
};

export const postUser = (data) => {
    return instance.post('api/v1/user', { ...data });
};
