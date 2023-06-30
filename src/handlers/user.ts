import { comparePasswords, createJWT, hashPassword } from "../modules/auth";
import prisma from "../db";

export const createNewUser = async (req, res) => {
    const hash = await hashPassword(req.body.password);

    const newUser = await prisma.user.create({
        data: {
            username: req.body.username,
            password: hash
        }
    });
    const token = createJWT(newUser);
    res.status(201).json({ token });
};

export const loginUser = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username
        }
    });

    const isValid = await comparePasswords(req.body.password, user.password);

    if (!isValid) {
        return res.status(401).json({ message: "Not authorized" }).end();
    }

    const token = createJWT(user);
    res.status(200).json({ token });
};
