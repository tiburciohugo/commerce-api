import express from "express";
import router from "./routes/router";
import morgan from "morgan";
import { validateJWT } from "./modules/auth";
import { createNewUser, loginUser } from "./handlers/user";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello World!" });
});

app.use("/api", validateJWT, router);

app.post("/user", createNewUser);
app.post("/login", loginUser);

export default app;
