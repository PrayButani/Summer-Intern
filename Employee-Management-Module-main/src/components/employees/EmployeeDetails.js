import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Divider,
  CircularProgress,
  Alert,
  Chip,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import { getEmployeeById } from '../../services/api';

const EmployeeDetails = () => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchEmployeeDetails = useCallback(async () => {
    try {
      const data = await getEmployeeById(id);
      setEmployee(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch employee details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchEmployeeDetails();
  }, [fetchEmployeeDetails]);

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

  if (!employee) {
    return (
      <Alert severity="warning" sx={{ mt: 2 }}>
        Employee not found
      </Alert>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
        >
          Back to List
        </Button>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={() => navigate(`/employees/${id}/edit`)}
        >
          Edit Employee
        </Button>
      </Box>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Employee Details
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" color="text.secondary">
              Name
            </Typography>
            <Typography variant="body1">
              {`${employee.firstName} ${employee.lastName}`}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" color="text.secondary">
              Email
            </Typography>
            <Typography variant="body1">{employee.email}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" color="text.secondary">
              Position
            </Typography>
            <Typography variant="body1">{employee.position}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" color="text.secondary">
              Department
            </Typography>
            <Typography variant="body1">{employee.department}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" color="text.secondary">
              Status
            </Typography>
            <Chip
              label={employee.status}
              color={employee.status === 'active' ? 'success' : 'error'}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" color="text.secondary">
              Join Date
            </Typography>
            <Typography variant="body1">
              {new Date(employee.joinDate).toLocaleDateString()}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default EmployeeDetails; 