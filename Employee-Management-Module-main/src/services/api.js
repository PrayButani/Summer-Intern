import axios from 'axios';

const BASE_URL = 'http://localhost:5001/api';

// Create axios instances
const authInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

const employeeInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

// Add request interceptor to add auth token
employeeInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add response interceptor to handle 401 errors
employeeInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth API methods
export const login = async (credentials) => {
    try {
        const response = await authInstance.post('/auth/login', credentials);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    } catch (error) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error('Login failed. Please try again.');
    }
};

export const register = async (userData) => {
    try {
        const response = await authInstance.post('/auth/register', userData);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    } catch (error) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error('Registration failed. Please try again.');
    }
};

// Employee API methods
export const getEmployees = async () => {
    try {
        const response = await employeeInstance.get('/employees');
        return response.data;
    } catch (error) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error('Failed to fetch employees.');
    }
};

export const getEmployeeById = async (id) => {
    try {
        const response = await employeeInstance.get(`/employees/${id}`);
        return response.data;
    } catch (error) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error('Failed to fetch employee details.');
    }
};

export const createEmployee = async (employeeData) => {
    try {
        const response = await employeeInstance.post('/employees', employeeData);
        return response.data;
    } catch (error) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error('Failed to create employee.');
    }
};

export const updateEmployee = async (id, employeeData) => {
    try {
        const response = await employeeInstance.put(`/employees/${id}`, employeeData);
        return response.data;
    } catch (error) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error('Failed to update employee.');
    }
};

export const deleteEmployee = async (id) => {
    try {
        const response = await employeeInstance.delete(`/employees/${id}`);
        return response.data;
    } catch (error) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error('Failed to delete employee.');
    }
};

// Export the instances for direct use if needed
export const authAPI = authInstance;
export const employeeAPI = employeeInstance; 