import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    IconButton,
    Chip,
    CircularProgress,
    Alert,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { getEmployees, deleteEmployee } from '../../services/api';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            console.log('Fetching employees...');
            const token = localStorage.getItem('token');
            console.log('Current token:', token);
            
            const data = await getEmployees();
            console.log('Employees data:', data);
            setEmployees(data);
            setError(null);
        } catch (err) {
            console.error('Error fetching employees:', err);
            setError(err.message || 'Failed to fetch employees');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                await deleteEmployee(id);
                setEmployees(employees.filter(emp => emp._id !== id));
            } catch (err) {
                console.error('Error deleting employee:', err);
                setError(err.message || 'Failed to delete employee');
            }
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error" sx={{ mt: 2 }}>
                {error}
            </Alert>
        );
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4" component="h1">
                    Employees
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/employees/new')}
                >
                    Add Employee
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Position</TableCell>
                            <TableCell>Department</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    No employees found
                                </TableCell>
                            </TableRow>
                        ) : (
                            employees.map((employee) => (
                                <TableRow key={employee._id}>
                                    <TableCell>{`${employee.firstName} ${employee.lastName}`}</TableCell>
                                    <TableCell>{employee.email}</TableCell>
                                    <TableCell>{employee.position}</TableCell>
                                    <TableCell>{employee.department}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={employee.status}
                                            color={employee.status === 'Active' ? 'success' : 'error'}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            color="primary"
                                            onClick={() => navigate(`/employees/${employee._id}`)}
                                        >
                                            <VisibilityIcon />
                                        </IconButton>
                                        <IconButton
                                            color="primary"
                                            onClick={() => navigate(`/employees/${employee._id}/edit`)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            color="error"
                                            onClick={() => handleDelete(employee._id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default EmployeeList; 