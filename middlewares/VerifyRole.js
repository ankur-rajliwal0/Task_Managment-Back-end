// Middleware to verify admin email
const verifyAdmin = (req, res, next) => {
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    if (email === 'admin@gmail.com') {
        next(); 
    } else {
        return res.status(403).json({ message: 'Access denied. Not an admin' });
    }
};

module.exports = verifyAdmin;