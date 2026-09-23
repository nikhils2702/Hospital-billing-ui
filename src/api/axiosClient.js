import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8085/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Attach Authorization / Tenant headers if JWT or Multi-tenancy is active
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        const tenantId = localStorage.getItem('tenantId');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        if (tenantId) {
            config.headers['X-Tenant-ID'] = tenantId;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosClient;