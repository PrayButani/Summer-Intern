const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const Employee = require('../models/Employee');

// Get all employees
router.get('/', auth, async (req, res) => {
    try {
        const employees = await Employee.find().sort({ createdAt: -1 });
        res.json(employees);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get single employee
router.get('/:id', auth, async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(employee);
    } catch (error) {
        console.error('Error fetching employee:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create employee
router.post('/', auth, async (req, res) => {
    try {
        console.log('Creating employee with data:', req.body);
        const employee = new Employee(req.body);
        const savedEmployee = await employee.save();
        console.log('Employee created successfully:', savedEmployee);
        res.status(201).json(savedEmployee);
    } catch (error) {
        console.error('Error creating employee:', error);
        res.status(500).json({ 
            message: 'Error creating employee',
            error: error.message 
        });
    }
});

// Update employee
router.put('/:id', auth, async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(employee);
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete employee
router.delete('/:id', auth, async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; 