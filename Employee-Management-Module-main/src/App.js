import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { AlertProvider } from './context/AlertContext';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import EmployeeList from './components/employees/EmployeeList';
import EmployeeForm from './components/employees/EmployeeForm';
import EmployeeDetails from './components/employees/EmployeeDetails';
import Alert from './components/layout/Alert';
import NotFound from './components/layout/NotFound';

// Create a theme instance
const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
        background: {
            default: '#f5f5f5',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
});

// Private Route component
const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <AlertProvider>
                    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                        <Navbar />
                        <Alert />
                        <Container component="main" sx={{ mt: 4, mb: 4, flex: 1 }}>
                            <Routes>
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route
                                    path="/"
                                    element={
                                        <PrivateRoute>
                                            <EmployeeList />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path="/employees/new"
                                    element={
                                        <PrivateRoute>
                                            <EmployeeForm />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path="/employees/:id"
                                    element={
                                        <PrivateRoute>
                                            <EmployeeDetails />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path="/employees/:id/edit"
                                    element={
                                        <PrivateRoute>
                                            <EmployeeForm />
                                        </PrivateRoute>
                                    }
                                />
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </Container>
                    </Box>
                </AlertProvider>
            </Router>
        </ThemeProvider>
    );
}

export default App;
