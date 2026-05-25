import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    try {
        const header = req.headers.authorization;

        if (!header || !header.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'No has proporcionado un token'
            });
        }

        const token = header.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded; // contiene uid y role
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Token inválido o caducado'
        });
    }
};
