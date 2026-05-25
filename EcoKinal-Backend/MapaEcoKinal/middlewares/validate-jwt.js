import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "JWTsecretoEcoKinalIN6BM!";

export const validateJWT = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];

        if (!authHeader) {
            return res.status(401).json({ error: "Token no proporcionado" });
        }

        const token = authHeader.replace("Bearer ", "");

        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({ error: "Token inválido o expirado" });
    }
};
