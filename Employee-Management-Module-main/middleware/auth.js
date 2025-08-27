const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            console.log('No token provided');
            return res.status(401).json({ message: 'Authentication required' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key_here');
        const user = await User.findById(decoded.id);

        if (!user) {
            console.log('User not found for token');
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(401).json({ message: 'Please authenticate', error: error.message });
    }
};

const adminAuth = async (req, res, next) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: 'Admin access required' });
        }
        next();
    } catch (error) {
        console.error('Admin auth middleware error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { auth, adminAuth }; 