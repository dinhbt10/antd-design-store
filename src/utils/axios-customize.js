import axios from 'axios';

const baseURL = import.meta.env.VITE_BACKEND_URL;

const instance = axios.create({
    baseURL: baseURL,
    withCredentials: true
});

instance.defaults.headers.common = {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
};

const NO_RETRY_HEADER = 'x-no-retry';

const handleRefreshToken = async () => {
    const res = await instance.get('/api/v1/auth/refresh');
    if (res && res.data) return res.data.access_token;
    else null;
};

instance.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// Xoá tất cả cookie trên trình duyệt
export function deleteAllCookies() {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
}

instance.interceptors.response.use(
    function (response) {
        return response && response ? response.data : response;
    },
    async function (error) {
        if (
            error.config &&
            error.response &&
            +error.response.status === 401 &&
            !error.config.headers[NO_RETRY_HEADER] // Ngăn việc loop vô hạn khi lỗi 401
        ) {
            const access_token = await handleRefreshToken();
            error.config.headers[NO_RETRY_HEADER] = 'true';
            if (access_token) {
                error.config.headers['Authorization'] = `Bearer ${access_token}`;
                localStorage.setItem('access_token', access_token);
                return instance.request(error.config);
            }
        }
        if (error.config && error.response && error.config.url === '/api/v1/auth/refresh' && error.response.status === 400) {
            deleteAllCookies();
            window.location.href = '/login';
        }
        return error.response?.data ?? Promise.reject(error);
    }
);

export default instance;
