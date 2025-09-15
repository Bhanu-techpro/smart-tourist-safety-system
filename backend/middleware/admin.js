// Middleware to check for admin role
module.exports = function (req, res, next) {
    // Assumes the user object from the 'auth' middleware is available
    if (req.user && (req.user.role === 'admin' || req.user.role === 'operator')) {
        next();
    } else {
        res.status(403).json({ msg: 'Access denied. Admin or Operator role required.' });
    }
};
