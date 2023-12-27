const isAutho = (allowedRoles) => {
    return (req, res, next) => {
    if (req.student && allowedRoles.includes(req.student.UserType)) {
    next();
    } else {
    res.status(403).json({ msg: "Access forbidden - Insufficient privileges"
    });
    }
    };
    };
    module.exports = isAutho;