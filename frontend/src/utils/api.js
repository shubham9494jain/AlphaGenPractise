import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'https://d2e091e1a291.ngrok-free.app/api';

console.log('API Base URL:', baseURL);

const api = axios.create({
    baseURL,
});

// Request interceptor to add the token
api.interceptors.request.use(req => {
    const authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null;
    if (authTokens) {
        req.headers.Authorization = `Bearer ${authTokens.access}`;
    }
    return req;
});

// Response interceptor for handling 401s
api.interceptors.response.use(
    response => response, // Simply return response if it's successful
    async (error) => {
        const originalRequest = error.config;

        // Check if it's a 401 and we haven't already tried to refresh
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Mark that we've tried to refresh

            const authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null;

            if (authTokens?.refresh) {
                try {
                    const response = await axios.post(`${baseURL}/token/refresh/`, {
                        refresh: authTokens.refresh
                    });

                    localStorage.setItem('authTokens', JSON.stringify(response.data));

                    // Update the header of the original request and retry
                    originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;
                    return axios(originalRequest);

                } catch (refreshError) {
                    console.error('Token refresh failed', refreshError);
                    // If refresh fails, logout user
                    localStorage.removeItem('authTokens');
                    localStorage.removeItem('user');
                    localStorage.removeItem('access_token'); // cleanup legacy
                    localStorage.removeItem('refresh_token'); // cleanup legacy
                    window.location.href = '/';
                    return Promise.reject(refreshError);
                }
            } else {
                 // No refresh token available, logout user
                 localStorage.removeItem('authTokens');
                 localStorage.removeItem('user');
                 localStorage.removeItem('access_token'); // cleanup legacy
                 localStorage.removeItem('refresh_token'); // cleanup legacy
                 window.location.href = '/';
            }
        }

        // For other errors, just reject
        return Promise.reject(error);
    }
);

export default api;
