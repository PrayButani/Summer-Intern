import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Container,
    Paper,
    TextField,
    Button,
    Typography,
    Box,
    MenuItem,
    Grid,
    Alert,
} from '@mui/material';
import { getEmployeeById, createEmployee, updateEmployee } from '../../services/api';
import { useAlert } from '../../context/AlertContext';

const EmployeeForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showAlert } = useAlert();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [employee, setEmployee] = useState({
        firstName: '',
        lastName: '',
        email: '',
        position: '',
        department: '',
        status: 'Active'
    });

    useEffect(() => {
        const fetchEmployee = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const data = await getEmployeeById(id);
                setEmployee(data);
                setError(null);
            } catch (error) {
                console.error('Error fetching employee:', error);
                setError(error.message || 'Failed to fetch employee details');
                showAlert(error.message || 'Failed to fetch employee details', 'error');
            } finally {
                setLoading(false);
            }
        };
        fetchEmployee();
    }, [id, showAlert]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (id) {
                await updateEmployee(id, employee);
                showAlert('Employee updated successfully!', 'success');
            } else {
                await createEmployee(employee);
                showAlert('Employee created successfully!', 'success');
            }
            navigate('/');
        } catch (error) {
            console.error('Error saving employee:', error);
            setError(error.message || 'Failed to save employee');
            showAlert(error.message || 'Failed to save employee', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 4, mb: 4 }}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h4" gutterBottom>
                        {id ? 'Edit Employee' : 'Add Employee'}
                    </Typography>
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="First Name"
                                    name="firstName"
                                    value={employee.firstName}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Last Name"
                                    name="lastName"
                                    value={employee.lastName}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={employee.email}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Position"
                                    name="position"
                                    value={employee.position}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Department"
                                    name="department"
                                    value={employee.department}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Status"
                                    name="status"
                                    value={employee.status}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                >
                                    <MenuItem value="Active">Active</MenuItem>
                                    <MenuItem value="Inactive">Inactive</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                                    <Button
                                        variant="outlined"
                                        onClick={() => navigate('/')}
                                        disabled={loading}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        disabled={loading}
                                    >
                                        {loading ? 'Saving...' : (id ? 'Update' : 'Add')} Employee
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Box>
        </Container>
    );
};

export default EmployeeForm; 