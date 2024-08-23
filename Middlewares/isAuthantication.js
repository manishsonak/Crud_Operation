const jwt = require('jsonwebtoken');

module.exports.isAuthanticate = async (req, res, next) => {
    try {
        
        const token = req.cookies.token;      
        
        if (!token) {
            return res.status(401).json({ message: 'No token provided, authorization denied' });
        }

        const decoded = jwt.verify(token, process.env.SCREATE_KEY); 
        
        req.user = decoded.id; 

        next(); 
    } catch (err) {
        console.error('Authentication error:', err.message);
        return res.status(401).json({ message: 'Token is not valid or has expired' });
    }
};
