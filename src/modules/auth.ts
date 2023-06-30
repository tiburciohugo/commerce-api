import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

export const createJWT = (user) => {
    const token = jwt.sign(
        {
            id: user.id,
            username: user.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h"
        }
    );
    return token;
};

export const validateJWT = (req, res, next) => {
    const bearer = req.headers.authorization;

    if (!bearer) {
        return res.status(401).send("Not authorized").end();
    }

    const [, token] = bearer.split(" ");
    if (!token) {
        console.log("Here!");
        return res.status(401).send("Not authorized").end();
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.payload = payload;
        next();
        return;
    } catch (error) {
        console.error(error);
        return res.status(401).send("Not authorized").end();
    }
};

export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(5);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

export const comparePasswords = async (password, hash) => {
    return await bcrypt.compare(password, hash);
}


